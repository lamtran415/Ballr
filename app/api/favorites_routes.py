from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, db
from .auth_routes import validation_errors_to_error_messages

favorites_routes = Blueprint('favorites_routes', __name__)

# Delete Favorite
# As a logged-in, I want to delete a photo from favorites
# DELETE /api/favorites/:favoriteId
