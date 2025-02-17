import datetime
import functools
import jwt
from flask import Blueprint, request, jsonify, current_app

# Create an auth blueprint with a URL prefix /api/auth
bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Dummy authentication logic - in a real application, you would validate the user's credentials against a database
    if username == 'admin' and password == 'secret':
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        # Sign the JWT using the Flask app's SECRET_KEY
        token = jwt.encode(
            payload, 
            current_app.secret_key, 
            algorithm='HS256'
        )
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

def token_required(f):
    """Decorator that ensures a valid JWT is present in the Authorization header."""
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Look for the token in the Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]

        if not token:
            return jsonify({'error': 'Token is missing!'}), 401

        try:
            # Decode the token using the app's secret key
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            
            # In a real application, you would typically validate the user based on the token data and associate the token with a user in the database
            # For simplicity, we'll consider any token with a valid signature as valid

        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token!'}), 401

        return f(*args, **kwargs)
    return decorated
