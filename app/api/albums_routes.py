from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Album, AlbumPhoto, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from app.forms.album_form import AlbumForm
from .auth_routes import validation_errors_to_error_messages

albums_routes = Blueprint('albums_routes', __name__)

# DELETE Album Route --- /albums/:albumId
@albums_routes.route('/<int:albumId>', methods=['DELETE'])
@login_required
def delete_album(albumId):
    album = Album.query.get(albumId)
    album_photos = AlbumPhoto.query.filter_by(album_id=albumId).all()
    for album_photo in album_photos:
        db.session.delete(album_photo)
    db.session.delete(album)
    db.session.commit()
    return 'Album deleted successfully', 200
