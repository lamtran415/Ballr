from .db import db, environment, SCHEMA, add_prefix_for_prod

class FavoritePhoto(db.Model):
    __tablename__ = "favorite_photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
    favorite_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("favorites.id")), nullable=False)
