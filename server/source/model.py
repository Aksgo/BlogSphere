from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key = True, unique = True, default = get_uuid)
    email = db.Column(db.String(345), unique = True, nullable = False)
    password = db.Column(db.Text, nullable = False)
    blogs = db.relationship("Blog", backref = "user", lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password = password


class Blog(db.Model):
    __tablename__ = "blogs"
    id = db.Column(db.String(32), primary_key = True, unique = True, default = get_uuid)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(5000), nullable = False)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title, description, user_id):
        self.title = title
        self.description = description
        self.user_id = user_id

    def serializeBlog(self):
        return {
            "id":self.id,
            "title":self.title,
            "description":self.description
        }
