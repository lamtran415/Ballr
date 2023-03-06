from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class AlbumForm(FlaskForm):
    user_id  = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("Title", validators=[DataRequired(), Length(min=1, max=25, message='Title must be 1 - 25 characters long')])
    description = StringField("Description")
