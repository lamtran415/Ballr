from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photo(db.Model):
    __tablename__ = "photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String)
    url = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="photo")
    comment = db.relationship("Comment", back_populates="photo", cascade="all, delete")
    # review_image = db.relationship("ReviewImage", back_populates="review", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "url": self.url,

            "user": {"first_name": self.user.first_name, "last_name": self.user.last_name}
        }