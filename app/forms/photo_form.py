from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class PhotoForm(FlaskForm):
    user_id  = IntegerField("user_id", validators=[DataRequired()])
    title = StringField("Title", validators=[DataRequired(), Length(min=3, max=255, message='Title must be 3 - 255 characters long')])
    description = StringField("Description", validators=[DataRequired()])
    url = StringField("URL", validators=[DataRequired()])
