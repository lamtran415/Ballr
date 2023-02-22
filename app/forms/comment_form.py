from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    user_id  = IntegerField("user_id", validators=[DataRequired()])
    photo_id = IntegerField("photo_id", validators=[DataRequired()])
    comment = StringField("Comment", validators=[DataRequired()])
