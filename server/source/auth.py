from flask import Blueprint, request, jsonify, session
from model import db, User
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import cross_origin
from utils import validateReq, login_required

auth_server = Blueprint('auth', __name__)
bcrypt = Bcrypt()


@auth_server.route("/profile", methods = ['GET'])
@cross_origin()
@login_required
def info():
    user_id = session.get("user_id", None)
    user = User.query.filter_by(id=user_id).first()
    if(user is None):
        return jsonify({"error": "Something went wrong"}), 404
    return jsonify({
        "id":user.id,
        "email": user.email
    }), 200

@auth_server.route("/login", methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    validateReq(data)
    email = data.get('email')
    password = data.get("password")
    if(email is None or password is None):
            return jsonify({"error":"Unexected Error Occured"}),500
    email = str(email)
    password= str(password)
    user = User.query.filter_by(email = email).first()
    if user is None:
        return jsonify({"error" : "unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "unauthorized"}),401
    if(session.get(user.id) is not None):
        return jsonify({"error" : "..."}), 409

    session["user_id"] = user.id
    return jsonify({
        "id":user.id, "email" : user.email
    }), 200



@auth_server.route('/register', methods = ['POST'])
@cross_origin()
def register():
    data = request.get_json()
    validateReq(data)
    email = data.get('email')
    password = data.get('password')
    if(email is None or password is None):
        return jsonify({"error":"Unexected Error Occured"}),500
    email = str(email)
    password= str(password)
    user_exists = User.query.filter_by(email = email).first() is not None
    if user_exists:
        return jsonify({"error" : "user already exist"}), 409
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email =email ,password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return jsonify({
        "id" : new_user.id,
        "email":new_user.email
    }), 200


@auth_server.route('/logout', methods = ['POST'])
@cross_origin()
def logout():
    session.pop("user_id", None)
    return "",200
