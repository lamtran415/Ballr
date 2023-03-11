from app.models import db, Album, environment, SCHEMA
from .photos import photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16

def seed_albums():
    album1 = Album(
        name='Favorite Athletes', user_id=1, description="I love these players!")
    album2 = Album(
        name="Marnie's Favorites", user_id=2, description="These are the best players ever!")
    album3 = Album(
        name='Bobbie Team', user_id=3, description="My favorite sport athletes")

    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM albums")

    db.session.commit()
