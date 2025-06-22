from flask import Blueprint, request, jsonify, session
from model import db, User, Blog
from flask_session import Session
from flask_cors import cross_origin
from utils import vaildateReq, login_required


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
    vaildateReq(data)
    title = data.get('title')
    description = data.get('description')
    user_id = session.get("user_id")
    new_blog = Blog(title=title , description=description, user_id=user_id)
    db.session.add(new_blog)
    db.session.commit()
    return jsonify({"BlogID": new_blog.id}), 200


@blog_server.route('/user/list', methods = ['GET'])
@cross_origin()
@login_required
def fecthUserBlogs():
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
    return (jsonify({"Success" : "Deleted"}), 200)


#common routes
@blog_server.route("/list", methods = ['GET'])
@cross_origin()
def listAllBlogs():
    blogsAll = Blog.query.all()
    if (blogsAll is None):
        return Error404()
    blogsData = [blog.serializeBlog() for blog in blogsAll ]
    return jsonify(blogsData), 200


@blog_server.route('/blog/<string:id>', methods = ['GET'])
@cross_origin()
def fetchUserBlog(id):
    blog = Blog.query.filter_by(id = id).first()
    if blog is None:
        return Error404()
    return jsonify(blog.serializeBlog()), 200


