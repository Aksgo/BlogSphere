from flask import jsonify, session
from functools import wraps

def vaildateReq(data):
    if not data:
        return jsonify({"error": "Something went Wrong "}), 404

        
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"error": "Some Information is Wrong"}), 401
        return f(*args, **kwargs)
    return decorated_function