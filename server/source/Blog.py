from flask import Blueprint, request, jsonify, session
from model import db, User, Blog
from flask_session import Session
from flask_cors import cross_origin
from utils import validateReq, login_required
from utils import cache

blog_server = Blueprint('blog', __name__)

#config
Error404 = lambda :(jsonify({"error": "We Could not Locate"}), 404)
Error400 = lambda :(jsonify({"error": "Missing data"}), 400)
Success200 = lambda : (jsonify({"Success" : "200"}), 200)
#user routes

@blog_server.route("/user/create", methods = ['POST'])
@cross_origin()
@login_required
def createBlog():
    data = request.get_json()
    validateReq(data)
    title = data.get('title')
    description = data.get('description')
    if not title or not description:
        return Error400()
    user_id = session.get("user_id")
    new_blog = Blog(title=title , description=description, user_id=user_id)
    db.session.add(new_blog)
    db.session.commit()
    cache.delete("all_blogs")
    return jsonify({"BlogID": new_blog.id}), 200


@blog_server.route('/user/list', methods = ['GET'])
@cross_origin()
@login_required
def fetchUserBlogs():
    user_id = session.get("user_id")
    blogsAll = Blog.query.filter_by(user_id = user_id).all()
    if (blogsAll is None):
        return Error404()
    blogsData = [blog.serializeBlog() for blog in blogsAll ]
    return jsonify(blogsData), 200

@blog_server.route('/user/update/<string:id>', methods = ['PUT'])
@cross_origin()
@login_required
def updateBlog(id):
    blog = Blog.query.filter_by(id = id).first()
    if blog is None:
        return Error404()
    if blog.user_id != session.get("user_id"):
        return Error404()
    data = request.get_json()
    if not data:
        return Error400()
    blog.title = data.get("title")
    blog.description = data.get("description")
    db.session.commit()
    cache.delete_memoized(fetchUserBlog, id)
    cache.delete("all_blogs")
    return Success200()

@blog_server.route('/user/delete/<string:id>', methods=['DELETE'])
@cross_origin()
@login_required
def deleteBlog(id):
    blog = Blog.query.filter_by(id = id).first()
    if blog is None:
        return Error404()
    if blog.user_id != session.get("user_id"):
        return Error404()
    db.session.delete(blog)
    db.session.commit()
    cache.delete_memoized(fetchUserBlog, id)
    cache.delete("all_blogs")
    return (jsonify({"Success" : "Deleted"}), 200)


#common routes
@blog_server.route("/list", methods = ['GET'])
@cross_origin()
@cache.cached(timeout = 600, key_prefix="all_blogs")
def listAllBlogs():
    blogsAll = Blog.query.all()
    if (not blogsAll):
        return Error404()
    blogsData = [blog.serializeBlog() for blog in blogsAll ]
    return jsonify(blogsData), 200


@blog_server.route('/blog/<string:id>', methods = ['GET'])
@cross_origin()
@cache.memoize(timeout=600)
def fetchUserBlog(id):
    blog = Blog.query.filter_by(id = id).first()
    if blog is None:
        return Error404()
    return jsonify(blog.serializeBlog()), 200


#helper function 
