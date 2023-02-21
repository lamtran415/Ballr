from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required
from app.models import Photo, Comment, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

photos_routes = Blueprint('photos_routes', __name__)

# GET All Photos ROUTE --- /photos
@photos_routes('/')
def photos_feed():
    photos = Photo.query.all()
    return {"photos": [photo.to_dict() for photo in photos]}, 200

# GET Individual Photo ROUTE --- /photos/:photoId
@photos_routes('/<int:photoId>')
def photo_details(photoId):
    photo = Photo.query.get(photoId)
    return photo.to_dict(), 200

# POST Photo Route --- /photos
@photos_routes('/', methods = ['POST'])
@login_required
def create_photo():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        photo = Photo(
            user_id = data['user_id'],
            title = data['title'],
            description = data['description'],
            url = data['url']
        )

        db.session.add(photo)
        db.session.commit()
        return photo.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# PUT Individual Photo Route --- /photos/:photoId
@photos_routes('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        photo = Photo.query.get(photoId)
        photo.title = data['title']
        photo.description = data['description']
        photo.url = data['url']

        db.session.commit()
        return photo.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE Individual Photo Route --- /photos/:photoId
@photos_routes('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    photo = Photo.query.get(photoId)
    db.session.delete(photo)
    db.session.commit()
    return 'Photo deleted successfully', 200
