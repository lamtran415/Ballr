from flask.cli import AppGroup
from .users import seed_users, undo_users
from .photos import seed_photos, undo_photos
from .comments import seed_comments, undo_comments
from .albums import seed_albums, undo_albums
from .albums_photos import seed_album_photos, undo_seed_album_photos
from .tags import seed_tags, undo_tags
from .tags_photos import seed_tag_photos, undo_tag_photos
from .favorites import seed_favorites, undo_favorites
from .favorites_photos import seed_favorite_photos, undo_seed_favorite_photos

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_photos()
        undo_comments()
        undo_albums()
        undo_seed_album_photos()
        undo_tags()
        undo_tag_photos()
        undo_favorites()
        undo_seed_favorite_photos()
    # Add other seed functions here
    seed_users()
    seed_photos()
    seed_comments()
    seed_albums()
    seed_album_photos()
    seed_tags()
    seed_tag_photos()
    seed_favorites()
    seed_favorite_photos()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_seed_favorite_photos()
    undo_favorites()
    undo_tag_photos()
    undo_tags()
    undo_seed_album_photos()
    undo_albums()
    undo_comments()
    undo_photos()
    undo_users()
