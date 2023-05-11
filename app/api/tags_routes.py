from flask import Blueprint
from app.models import Tag

tags_routes = Blueprint('tags_routes', __name__)

# GET All Tag Photos ROUTE --- /tags/:tagId
@tags_routes.route('/<int:tagId>')
def all_tag_photos(tagId):
    tag = Tag.query.get(tagId)
    if tag is None:
        return {"error": "Tag not found"}, 404
    return tag.to_dict(), 200
