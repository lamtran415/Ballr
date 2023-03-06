from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False )
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    user = db.relationship("User", back_populates="album")
    photo = db.relationship("Photo", secondary="album_photos", back_populates="album")

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
        photo = db.relationship('Photo', secondary=f"{SCHEMA}.album_photos", back_populates="album")
    else:
        photo = db.relationship('Photo', secondary='album_photos', back_populates="album")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name" : self.name,
            "description" : self.description,

            "user": {"first_name": self.user.first_name, "last_name": self.user.last_name},
            "photo": [photo.to_dict() for photo in self.photo]
        }