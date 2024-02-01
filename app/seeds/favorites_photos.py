from app.models import db, FavoritePhoto, environment, SCHEMA
# from .photos import photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16

def seed_album_photos():
    favorite_join_photo1 = FavoritePhoto(photo_id=1, favorite_id=3)
    favorite_join_photo2 = FavoritePhoto(photo_id=4, favorite_id=3)
    favorite_join_photo3 = FavoritePhoto(photo_id=7, favorite_id=3)
    favorite_join_photo4 = FavoritePhoto(photo_id=10, favorite_id=3)
    favorite_join_photo5 = FavoritePhoto(photo_id=13, favorite_id=3)
    favorite_join_photo6 = FavoritePhoto(photo_id=16, favorite_id=3)
    favorite_join_photo7 = FavoritePhoto(photo_id=2, favorite_id=1)
    favorite_join_photo8 = FavoritePhoto(photo_id=5, favorite_id=1)
    favorite_join_photo9 = FavoritePhoto(photo_id=8, favorite_id=1)
    favorite_join_photo10 = FavoritePhoto(photo_id=11, favorite_id=1)
    favorite_join_photo11 = FavoritePhoto(photo_id=14, favorite_id=1)
    favorite_join_photo12 = FavoritePhoto(photo_id=3, favorite_id=2)
    favorite_join_photo13 = FavoritePhoto(photo_id=6, favorite_id=2)
    favorite_join_photo14 = FavoritePhoto(photo_id=9, favorite_id=2)
    favorite_join_photo15 = FavoritePhoto(photo_id=12, favorite_id=2)
    favorite_join_photo16 = FavoritePhoto(photo_id=15, favorite_id=2)
    favorite_join_photo17 = FavoritePhoto(photo_id=17, favorite_id=1)
    favorite_join_photo18 = FavoritePhoto(photo_id=18, favorite_id=2)

    db.session.add(favorite_join_photo1)
    db.session.add(favorite_join_photo2)
    db.session.add(favorite_join_photo3)
    db.session.add(favorite_join_photo4)
    db.session.add(favorite_join_photo5)
    db.session.add(favorite_join_photo6)
    db.session.add(favorite_join_photo7)
    db.session.add(favorite_join_photo8)
    db.session.add(favorite_join_photo9)
    db.session.add(favorite_join_photo10)
    db.session.add(favorite_join_photo11)
    db.session.add(favorite_join_photo12)
    db.session.add(favorite_join_photo13)
    db.session.add(favorite_join_photo14)
    db.session.add(favorite_join_photo15)
    db.session.add(favorite_join_photo16)
    db.session.add(favorite_join_photo17)
    db.session.add(favorite_join_photo18)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_album_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM favorite_photos")

    db.session.commit()
