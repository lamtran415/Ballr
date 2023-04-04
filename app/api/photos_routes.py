from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Album, AlbumPhoto, Tag, TagPhoto, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from app.forms.album_form import AlbumForm
from app.forms.tag_form import TagForm
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

photos_routes = Blueprint('photos_routes', __name__)

# GET All Photos ROUTE --- /photos
@photos_routes.route('/')
def photos_feed():
    photos = Photo.query.all()
    return {"photos": [photo.to_dict() for photo in photos]}, 200

# GET Individual Photo ROUTE --- /photos/:photoId
@photos_routes.route('/<int:photoId>')
def photo_details(photoId):
    photo = Photo.query.get(photoId)
    if photo is None:
        return {"error": "Photo not found"}, 404
    return photo.to_dict(), 200

@photos_routes.route("/upload", methods=["POST"])
@login_required
def upload_image():

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    return {"url": url}

# POST Photo Route --- /photos
@photos_routes.route('/', methods = ['POST'])
@login_required
def create_photo():
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        photo = Photo(
            user_id = current_user.id,
            title = data['title'],
            description = data['description'],
            url = data["url"]
        )

        db.session.add(photo)
        db.session.commit()
        return photo.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# PUT Individual Photo Route --- /photos/:photoId
@photos_routes.route('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        photo = Photo.query.get(photoId)
        photo.title = data['title']
        photo.description = data['description']
        photo.url = data['url']

        db.session.commit()
        return photo.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE Individual Photo Route --- /photos/:photoId
@photos_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    photo = Photo.query.get(photoId)

    # check if photo exists in any album
    album_photos = AlbumPhoto.query.filter_by(photo_id=photoId).all()
    for album_photo in album_photos:
        db.session.delete(album_photo)

        # check if album is empty after deleting the photo
        album = Album.query.get(album_photo.album_id)
        if len(album.photos) == 0:
            db.session.delete(album)

    db.session.delete(photo)
    db.session.commit()
    return 'Photo deleted successfully', 200

# GET All Comments for Photo Route --- /photos/:photoId/comments
@photos_routes.route('/<int:photoId>/comments')
def all_comments(photoId):
    comments = Comment.query.filter(Comment.photo_id == photoId)
    return {"comments": [comment.to_dict() for comment in comments]}, 200

# POST Comment for Photo Route --- /photos/:photoId/comments
@photos_routes.route('/<int:photoId>/comments', methods=['POST'])
@login_required
def create_comment(photoId):
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            photo_id = photoId,
            comment = data['comment']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET User Photos ROUTE --- /photos/users/:userId
@photos_routes.route('/users/<int:userId>')
def users_photo(userId):
    photos = Photo.query.filter_by(user_id = userId).all()
    return {"photos": [photo.to_dict() for photo in photos]}, 200

# GET User Albums Page -- /photos/users/:userId/albums
@photos_routes.route('/users/<int:userId>/albums')
def users_albums(userId):
    albums = Album.query.filter_by(user_id = userId).all()
    return {"albums": [album.to_dict() for album in albums]}, 200

# GET User Albums Photos -- /photos/users/:userId/albums/:albumId
@photos_routes.route('/users/<int:userId>/albums/<int:albumId>')
def albums_photos(userId, albumId):
    album = Album.query.filter_by(user_id=userId, id=albumId).first()
    if album:
        return album.to_dict(), 200
    else:
        return {'message': 'Album not found'}, 404

# POST / CREATE new Album for User -- /photos/users/:userId/albums
@photos_routes.route('/users/<int:userId>/albums', methods=['POST'])
@login_required
def create_album(userId):
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()

    if form.validate_on_submit():
        album = Album(
            user_id =  current_user.id,
            name = data['name'],
            description = data['description']
        )

        db.session.add(album)

        for photo_id in data['photo_ids']:
            photo = Photo.query.get(photo_id)

            if photo:
                album_photo_join = AlbumPhoto(album_id=album.id, photo_id=photo_id)
                album.photos.append(photo)
                db.session.add(album_photo_join)

        db.session.commit()

        return album.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET Tags for Photo -- /photos/:photoId/tags
@photos_routes.route('/<int:photoId>/tags')
def get_tag_photo(photoId):
    photo = Photo.query.get(photoId)
    if photo is None:
        return {"error": "Photo not found"}, 404
    return photo.tag_to_dict(), 200

# POST Tags for Photo -- /photos/:photoId/tags
@photos_routes.route('/<int:photoId>/tags', methods=['POST'])
@login_required
def create_tags(photoId):
    photo = Photo.query.get(photoId)
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    tag_data = request.json.get('tag_name')

    old_tag = Tag.query.filter_by(tag_name=tag_data).first()

    if form.validate_on_submit():
        if old_tag:
            tag_photo = TagPhoto(photo_id=photoId, tag_id=old_tag.id)
            db.session.add(tag_photo)
            photo.tag.append(old_tag)
            db.session.commit()

            return old_tag.to_dict(), 200
        else:
            new_tag = Tag(
                tag_name = data["tag_name"]
            )
            db.session.add(new_tag)
            db.session.commit()

            tag_photo = TagPhoto(photo_id=photoId, tag_id=new_tag.id)
            db.session.add(tag_photo)
            db.session.commit()

            photo.tag.append(new_tag)
            db.session.commit()

            return new_tag.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE Tags for Photo -- /photos/:photoId/tags/:tagId
@photos_routes.route('/<int:photoId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def delete_photo_tag(photoId, tagId):
    find_tag_for_photo = TagPhoto.query.filter_by(tag_id=tagId, photo_id=photoId).first()
    check_tag_photo_exist = TagPhoto.query.filter_by(tag_id=tagId).all()

    db.session.delete(find_tag_for_photo)
    check_tag_entry = Tag.query.get(tagId)

    if check_tag_photo_exist is None:
        db.session.delete(check_tag_entry)

    db.session.commit()
    return 'Tag deleted successfully', 200
