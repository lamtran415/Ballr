from app.models import db, Album, environment, SCHEMA

def seed_albums():
    album1 = Album(
        name='Favorite Athletes', user_id=1, description="I love these players!")
    album2 = Album(
        name="Marnie's Favorites", user_id=2, description="These are the best players ever!")
    album3 = Album(
        name='Bobbie Team', user_id=3, description="My favorite sport athletes")

    album4 = Album(
        name='Top Performers', user_id=1, description="The best in the game!")
    album5 = Album(
        name="Sports Legends", user_id=2, description="Icons of the sports world!")
    album6 = Album(
        name='Inspiring Moments', user_id=3, description="Defining moments in sports")

    all_albums = [album1, album2, album3, album4, album5, album6]
    add_albums = [db.session.add(album) for album in all_albums]
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
