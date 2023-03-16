from .db import db, environment, SCHEMA, add_prefix_for_prod

class TagPhoto(db.Model):
    __tablename__ = "tag_photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
    tag_id =  db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), nullable=False)
