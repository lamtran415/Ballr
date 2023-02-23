from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required, current_user
from app.models import Photo, Comment, db
from app.forms.photo_form import PhotoForm
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

comments_routes = Blueprint('comments_routes', __name__)

@comments_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    comment = Comment.query.get(+commentId)
    if comment is None:
        return "Error, comment not found", 404

    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data

    if form.validate_on_submit():
        comment.user_id = current_user.id
        comment.photo_id = data['photo_id']
        comment.comment = data['comment']
        db.session.commit()
        return comment.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comments_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.get(+commentId)
    if comment is None:
        return "Error, comment not found", 404

    db.session.delete(comment)
    db.session.commit()
    return "Comment deleted successfully", 200
