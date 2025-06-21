from flask import Flask, request, jsonify, session
from model import db, User
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin
from auth import auth_server
from Blog import blog_server

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
cors = CORS(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


#adding external routes
app.register_blueprint(auth_server, url_prefix = '/api/account')
app.register_blueprint(blog_server, url_prefix = '/api/blogs')



if __name__=="__main__":
    app.run(debug = True, host = "0.0.0.0")
