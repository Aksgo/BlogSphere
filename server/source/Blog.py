from flask import Blueprint, request, jsonify, session
from model import db, User, Blog
from flask_session import Session
from flask_cors import cross_origin
from utils import vaildateReq, login_required


blog_server = Blueprint('blog', __name__)


@blog_server.route("/create", methods = ['GET'])
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

@blog_server.route('/blogs/blog/<string:id>', methods = ['GET'])
@cross_origin()
def fetchBlog(id):
    if id is None:
        return jsonify({"error": "Something's wrong"}), 404
    blog = Blog.query.filter_by(id = id).first()
    if blog is None:
        return jsonify({"error": "Something's wrong"}), 404
    blog_data = blog.serializeBlog()
    return jsonify(blog_data), 200
