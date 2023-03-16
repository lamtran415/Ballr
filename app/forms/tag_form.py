from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
    tag_name = StringField("Title", validators=[DataRequired(), Length(min=2, max=25, message='Tag must be 2 - 25 characters long')])
