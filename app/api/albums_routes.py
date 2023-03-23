from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Album, AlbumPhoto, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from app.forms.album_form import AlbumForm
from .auth_routes import validation_errors_to_error_messages

albums_routes = Blueprint('albums_routes', __name__)

# PUT Album Route --- /albums/:albumId
@albums_routes.route('/<int:albumId>', methods=['PUT'])
@login_required
def edit_album(albumId):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        album = Album.query.get(albumId)
        album.name = data['name']
        album.description = data['description']

        db.session.commit()

        AlbumPhoto.query.filter_by(album_id=albumId).delete()

        album.photos.clear()

        for photo_id in data['photo_ids']:
            photo = Photo.query.get(photo_id)

            if photo:
                album_photo_join = AlbumPhoto(album_id=album.id, photo_id=photo_id)
                album.photos.append(photo)
                db.session.add(album_photo_join)

        db.session.commit()

        return album.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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
