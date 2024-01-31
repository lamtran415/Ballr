from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False )

    user = db.relationship("User", back_populates='favorites')
    photo = db.relationship("Photo", secondary='favorite_photos', back_populates='favorite', cascade="all, delete")

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
        photos = db.relationship('Photo', secondary=f"{SCHEMA}.favorite_photos", back_populates="favorite", cascade="all, delete")
    else:
        photos = db.relationship('Photo', secondary='favorite_photos', back_populates="favorite", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,

            "user": {"first_name": self.user.first_name, "last_name": self.user.last_name},
            "photos": [photo.to_dict() for photo in self.photos]
        }
