from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Album, AlbumPhoto, Tag, TagPhoto, Favorite, FavoritePhoto, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from app.forms.album_form import AlbumForm
from app.forms.tag_form import TagForm
from app.s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename
from .auth_routes import validation_errors_to_error_messages

# Create a Flask Blueprint named 'photos_routes'
photos_routes = Blueprint('photos_routes', __name__)

# GET All Photos ROUTE --- /photos
@photos_routes.route('/')
def photos_feed():
    # Query the database to fetch all photos
    photos = Photo.query.all()
    # Return a JSON response containing a list of photos converted to dictionaries
    return {"photos": [photo.to_dict() for photo in photos]}, 200

# GET Individual Photo ROUTE --- /photos/:photoId
@photos_routes.route('/<int:photoId>')
def photo_details(photoId):
    # Retrieve the photo with the specified 'photoId' from the database
    photo = Photo.query.get(photoId)

    # Check if the photo exists; if not, return an error response with status code 404
    if photo is None:
        return {"error": "Photo not found"}, 404

    # Return a JSON response containing the details of the specific photo
    return photo.to_dict(), 200

# AWS Upload Route to store the image
@photos_routes.route("/upload", methods=["POST"])
@login_required
def upload_image():
    # Check if an 'image' file is included in the request
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    # Retrieve the image file from the request
    image = request.files["image"]

    # Ensure that the file type is allowed (e.g., image file formats)
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    # Generate a unique filename for the image to avoid conflicts
    image.filename = get_unique_filename(image.filename)

    # Upload the image to an AWS S3 bucket using a helper function
    upload = upload_file_to_s3(image)

    # Check if the upload was successful and obtain the URL of the uploaded image
    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    # Return the URL of the uploaded image in a JSON response
    return {"url": url}

# POST Photo Route --- /photos
@photos_routes.route('/', methods = ['POST'])
@login_required
def create_photo():
    # Create an instance of the PhotoForm to validate the request data
    form = PhotoForm()
    # Set the CSRF token in the form data from the request cookie
    form['csrf_token'].data = request.cookies['csrf_token']
    # Parse the JSON data from the request body
    data = request.get_json()

    # Check if the form data is valid
    if form.validate_on_submit():
        # Create a new Photo object and populate its attributes
        photo = Photo(
            user_id = current_user.id,
            title = data['title'],
            description = data['description'],
            url = data["url"]
        )

        # Add the photo to the database session and commit the changes
        db.session.add(photo)
        db.session.commit()

        # Return a JSON response containing the details of the created photo
        return photo.to_dict(), 200

    # If the form data is not valid, return an error response with validation messages
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# PUT Individual Photo Route --- /photos/:photoId
@photos_routes.route('/<int:photoId>', methods=['PUT'])
@login_required
def edit_photo(photoId):
    # Create an instance of the PhotoForm to validate the request data
    form = PhotoForm()
    # Set the CSRF token in the form data from the request cookie
    form['csrf_token'].data = request.cookies['csrf_token']
    # Parse the JSON data from the request body
    data = request.get_json()

    # Check if the form data is valid
    if form.validate_on_submit():
        # Retrieve the photo with the specified 'photoId' from the database
        photo = Photo.query.get(photoId)

        # Update the attributes of the photo with the provided data
        photo.title = data['title']
        photo.description = data['description']
        photo.url = data['url']

        # Commit the changes to the database
        db.session.commit()

        # Return a JSON response containing the updated photo details
        return photo.to_dict(), 200

    # If the form data is not valid, return an error response with validation messages
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE Individual Photo Route --- /photos/:photoId
@photos_routes.route('/<int:photoId>', methods=['DELETE'])
@login_required
def delete_photo(photoId):
    # Retrieve the photo with the specified 'photoId' from the database
    photo = Photo.query.get(photoId)

    # Check if the photo exists in any albums
    album_photos = AlbumPhoto.query.filter_by(photo_id=photoId).all()
    for album_photo in album_photos:
        db.session.delete(album_photo)

        # Check if the album is empty after deleting the photo
        album = Album.query.get(album_photo.album_id)
        if len(album.photos) == 0:
            db.session.delete(album)

    # Delete the photo from the database and commit the changes
    db.session.delete(photo)
    db.session.commit()

    # Return a success message with a 200 status code
    return 'Photo deleted successfully', 200

# GET All Comments for Photo Route --- /photos/:photoId/comments
@photos_routes.route('/<int:photoId>/comments')
def all_comments(photoId):
    # Retrieve all comments associated with the specified 'photoId'
    comments = Comment.query.filter(Comment.photo_id == photoId)

    # Return a JSON response containing a list of comments converted to dictionaries
    return {"comments": [comment.to_dict() for comment in comments]}, 200

# POST Comment for Photo Route --- /photos/:photoId/comments
@photos_routes.route('/<int:photoId>/comments', methods=['POST'])
@login_required
def create_comment(photoId):
    # Create an instance of the CommentForm to validate the request data
    form = CommentForm()
    # Set the CSRF token in the form data from the request cookie
    form['csrf_token'].data = request.cookies['csrf_token']
    # Parse the JSON data from the request body
    data = request.get_json()

    # Check if the form data is valid
    if form.validate_on_submit():
        # Create a new Comment object and populate its attributes
        new_comment = Comment(
            user_id = current_user.id,
            photo_id = photoId,
            comment = data['comment']
        )

        # Add the new comment to the database and commit the changes
        db.session.add(new_comment)
        db.session.commit()

        # Return a JSON response containing the details of the created comment
        return new_comment.to_dict()

    # If the form data is not valid, return an error response with validation messages
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET User Photos ROUTE --- /photos/users/:userId
@photos_routes.route('/users/<int:userId>')
def users_photo(userId):
    # Retrieve all photos associated with the specified 'userId'
    photos = Photo.query.filter_by(user_id=userId).all()

    # Return a JSON response containing a list of photos converted to dictionaries
    return {"photos": [photo.to_dict() for photo in photos]}, 200

# GET User Albums Page -- /photos/users/:userId/albums
@photos_routes.route('/users/<int:userId>/albums')
def users_albums(userId):
    # Retrieve all albums associated with the specified 'userId'
    albums = Album.query.filter_by(user_id=userId).all()

    # Return a JSON response containing a list of albums converted to dictionaries
    return {"albums": [album.to_dict() for album in albums]}, 200

# GET User Albums Photos -- /photos/users/:userId/albums/:albumId
@photos_routes.route('/users/<int:userId>/albums/<int:albumId>')
def albums_photos(userId, albumId):
    # Retrieve the album with the specified 'albumId' associated with the given 'userId'
    album = Album.query.filter_by(user_id=userId, id=albumId).first()

    if album:
        # Return a JSON response containing the details of the retrieved album
        return album.to_dict(), 200
    else:
        # Return a 404 error message if the album is not found
        return {'message': 'Album not found'}, 404

# POST / CREATE new Album for User -- /photos/users/:userId/albums
@photos_routes.route('/users/<int:userId>/albums', methods=['POST'])
@login_required
def create_album(userId):
    # Create an instance of the AlbumForm to validate the request data
    form = AlbumForm()
    # Set the CSRF token in the form data from the request cookie
    form['csrf_token'].data = request.cookies['csrf_token']
    # Parse the JSON data from the request body
    data = request.get_json()

    if form.validate_on_submit():
        # Create a new Album object and populate its attributes
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

        # Commit the changes to the database
        db.session.commit()

        # Return a JSON response containing the details of the created album
        return album.to_dict(), 200

    # If the form data is not valid, return an error response with validation messages
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET Tags for Photo -- /photos/:photoId/tags
@photos_routes.route('/<int:photoId>/tags')
def get_tag_photo(photoId):
    # Retrieve the photo associated with the specified 'photoId'
    photo = Photo.query.get(photoId)

    if photo is None:
        # Return a 404 error response if the photo is not found
        return {"error": "Photo not found"}, 404

    # Return a JSON response containing the tags associated with the photo
    return photo.tag_to_dict(), 200

# POST Tags for Photo -- /photos/:photoId/tags
@photos_routes.route('/<int:photoId>/tags', methods=['POST'])
@login_required
def create_tags(photoId):
    # Retrieve the photo associated with the specified 'photoId'
    photo = Photo.query.get(photoId)

    # Create an instance of the TagForm to validate the request data
    form = TagForm()
    # Set the CSRF token in the form data from the request cookie
    form['csrf_token'].data = request.cookies['csrf_token']
    # Parse the JSON data from the request body
    data = request.get_json()
    # Retrieve the value associated with the key 'tag_name' from the JSON payload
    tag_data = request.json.get('tag_name')

    # Check if a tag with the same name exists
    old_tag = Tag.query.filter_by(tag_name=tag_data).first()

    if form.validate_on_submit():
        if old_tag:
            # If the tag already exists, create a relationship between the photo and the existing tag
            tag_photo = TagPhoto(photo_id=photoId, tag_id=old_tag.id)
            db.session.add(tag_photo)
            photo.tag.append(old_tag)
            db.session.commit()

            # Return the details of the existing tag
            return old_tag.to_dict(), 200
        else:
            # If the tag does not exist, create a new tag
            new_tag = Tag(tag_name=data["tag_name"])
            db.session.add(new_tag)
            db.session.commit()

            # Create a relationship between the photo and the new tag
            tag_photo = TagPhoto(photo_id=photoId, tag_id=new_tag.id)
            db.session.add(tag_photo)
            db.session.commit()

            photo.tag.append(new_tag)
            db.session.commit()

            # Return the details of the newly created tag
            return new_tag.to_dict(), 200
    else:
        # If the form data is not valid, return an error response with validation messages
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE Tags for Photo -- /photos/:photoId/tags/:tagId
@photos_routes.route('/<int:photoId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def delete_photo_tag(photoId, tagId):
    # Find the relationship between the specified tag and photo
    find_tag_for_photo = TagPhoto.query.filter_by(tag_id=tagId, photo_id=photoId).first()
    # Check if the tag has no more associations with photos
    check_tag_photo_exist = TagPhoto.query.filter_by(tag_id=tagId).all()

    # Delete the relationship between the tag and photo
    db.session.delete(find_tag_for_photo)

    # Retrieve the tag entry
    check_tag_entry = Tag.query.get(tagId)

    if check_tag_photo_exist is None:
        # If the tag has no more associations, delete the tag entry as well
        db.session.delete(check_tag_entry)

    # Commit the changes to the database
    db.session.commit()

    # Return a success message upon successful tag deletion
    return 'Tag deleted successfully', 200

# View Favorites
# As a logged-in user, I want to view favorites of a user.
# GET /api/photos/users/:userId/favorites
@photos_routes.route('/users/<int:userId>/favorites')
def favorite_photos(userId):
    # Retrieve the album with the specified 'albumId' associated with the given 'userId'
    # favorites = Favorite.query.filter_by(user_id=userId, id=userId).all()
    favorites = Favorite.query.filter_by(user_id=userId).first()

    if not favorites:
        # If favorite doesn't exist, create a new one for the user
        new_favorite = Favorite(user_id=userId)
        db.session.add(new_favorite)
        db.session.commit()

        # Refresh the favorite instance to get the updated id
        db.session.refresh(new_favorite)
        favorites = new_favorite

    if favorites:
        return favorites.to_dict(), 200
    else:
        # Return a 404 error message if no favorites are found
        return {'message': 'Favorites not found'}, 404


# Add Favorite
# As a logged-in user, I want to add photo to favorites
# POST /api/photos/users/:userId/favorites
@photos_routes.route('/users/<int:userId>/favorites', methods=["POST"])
@login_required
def create_favorite_photos(userId):
    # Retrieve the favorite with the specified 'userId' associated with the given 'userId'
    favorite = Favorite.query.filter_by(user_id=userId, id=userId).first()

    if not favorite:
        # If favorite doesn't exist, create a new one for the user
        new_favorite = Favorite(user_id=userId)
        db.session.add(new_favorite)
        db.session.commit()

        # Refresh the favorite instance to get the updated id
        db.session.refresh(new_favorite)
        favorite = new_favorite

    if favorite:
        data = request.get_json()
        photoId = data.get('photoId')
        # Retrieve the photo with the specified 'photoId'
        photo = Photo.query.get(photoId)

        # Create a new FavoritePhoto relationship, SQLAlchemy auto handles the add in Favorite
        favorite_photo = FavoritePhoto(photo_id=photo.id, favorite_id=favorite.id)
        db.session.add(favorite_photo)
        db.session.commit()

        # Return a JSON response containing the details of the retrieved favorite photo
        return {'favorite': favorite.to_dict(), 'photo': photo.to_dict()}, 200
    else:
        # Return a 404 error message if the favorites is not found
        return {'message': 'Favorite not found'}, 404
