from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    photo_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("photos.id")), nullable=False)
    comment = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="comment")
    photo = db.relationship("Photo", back_populates="comment")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "photo_id": self.photo_id,
            "comment": self.comment,

            "user": {"first_name": self.user.first_name, "last_name": self.user.last_name}
        }
