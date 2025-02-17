""" Initialize the Flask app """

from flask import Flask, render_template
from flask_cors import CORS
from .api.expenses import bp as expenses_bp
from .api.auth import bp as auth_bp
from . import db

def create_app(config="config.py"):
    app = Flask(__name__, static_folder='static', static_url_path='/')
    app.config.from_pyfile(config)
    
    app.secret_key = app.config["SECRET_KEY"]
    
    # Initialize the database
    db.init_app(app)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(expenses_bp)
    
    return app
