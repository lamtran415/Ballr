from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Album, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from app.forms.album_form import AlbumForm
from .auth_routes import validation_errors_to_error_messages

albums_routes = Blueprint('albums_routes', __name__)
