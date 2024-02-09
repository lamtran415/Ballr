from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, Favorite, FavoritePhoto, db
from .auth_routes import validation_errors_to_error_messages

favorites_routes = Blueprint('favorites_routes', __name__)

# Delete Favorite
# As a logged-in, I want to delete a photo from favorites
# DELETE /api/favorites/:favoriteId

@favorites_routes.route('/<int:favoriteId>', methods=['DELETE'])
@login_required
def delete_favorite(favoriteId):
    # Retrieve the favorite with the specified 'userId' associated with the given 'userId'
    favorite = Favorite.query.filter_by(user_id=favoriteId, id=favoriteId).first()

    data = request.get_json()
    photoId = data.get('photoId')

    # Now you need to query the FavoritePhoto to get the specific entry to delete
    favorite_photo = FavoritePhoto.query.filter_by(favorite_id=favorite.id, photo_id=photoId).first()

    if favorite_photo:
        # Delete the entry from FavoritePhoto
        db.session.delete(favorite_photo)
        db.session.commit()

    # Manually update the favorite.photos list to remove the corresponding photo
    favorite.photo = [photo for photo in favorite.photos if photo.id != favorite_photo.photo_id]
    return 'Favorite deleted successfully', 200
