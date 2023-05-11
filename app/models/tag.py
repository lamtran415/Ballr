from .db import db, environment, SCHEMA, add_prefix_for_prod
from .photo import Photo
from .tag_photo import TagPhoto

class Tag(db.Model):
    __tablename__ = "tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String, nullable=False)

    def get_photos(self):
        return db.session.query(Photo).join(TagPhoto).filter(TagPhoto.tag_id == self.id).all()

    def to_dict(self):
        photos = self.get_photos()
        photos_data = [photo.to_dict() for photo in photos]

        return {
            "id": self.id,
            "tag_name": self.tag_name,
            "photos": photos_data
        }
