# def seed_albums():
#     album1 = Album(
#         name='Favorite Athletes', photos=[photo1, photo4, photo7, photo10, photo13, photo16], user_id=1)
#     album2 = Album(
#         name="Marnie's Favorites",photos=[photo2, photo5, photo8, photo11, photo14], user_id=2)
#     album3 = Album(
#         name='Bobbie Team', photos=[photo3, photo6, photo9, photo12, photo15], user_id=2)

#     db.session.add(album1)
#     db.session.add(album2)
#     db.session.add(album3)
#     db.session.commit()

from app.models import db, AlbumPhoto, environment, SCHEMA
# from .photos import photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16

def seed_album_photos():
    album_join_photo1 = AlbumPhoto(photo_id=1, album_id=1)
    album_join_photo2 = AlbumPhoto(photo_id=4, album_id=1)
    album_join_photo3 = AlbumPhoto(photo_id=7, album_id=1)
    album_join_photo4 = AlbumPhoto(photo_id=10, album_id=1)
    album_join_photo5 = AlbumPhoto(photo_id=13, album_id=1)
    album_join_photo6 = AlbumPhoto(photo_id=16, album_id=1)
    album_join_photo7 = AlbumPhoto(photo_id=2, album_id=2)
    album_join_photo8 = AlbumPhoto(photo_id=5, album_id=2)
    album_join_photo9 = AlbumPhoto(photo_id=8, album_id=2)
    album_join_photo10 = AlbumPhoto(photo_id=11, album_id=2)
    album_join_photo11 = AlbumPhoto(photo_id=14, album_id=2)
    album_join_photo12 = AlbumPhoto(photo_id=3, album_id=3)
    album_join_photo13 = AlbumPhoto(photo_id=6, album_id=3)
    album_join_photo14 = AlbumPhoto(photo_id=9, album_id=3)
    album_join_photo15 = AlbumPhoto(photo_id=12, album_id=3)
    album_join_photo16 = AlbumPhoto(photo_id=15, album_id=3)
    album_join_photo17 = AlbumPhoto(photo_id=17, album_id=2)
    album_join_photo18 = AlbumPhoto(photo_id=18, album_id=3)

    # New relationships for each of the new albums
    album_join_photo19 = AlbumPhoto(photo_id=19, album_id=4)
    album_join_photo20 = AlbumPhoto(photo_id=20, album_id=5)
    album_join_photo21 = AlbumPhoto(photo_id=21, album_id=6)
    album_join_photo22 = AlbumPhoto(photo_id=22, album_id=4)
    album_join_photo23 = AlbumPhoto(photo_id=23, album_id=5)
    album_join_photo24 = AlbumPhoto(photo_id=24, album_id=6)
    album_join_photo25 = AlbumPhoto(photo_id=25, album_id=4)
    album_join_photo26 = AlbumPhoto(photo_id=26, album_id=5)
    album_join_photo27 = AlbumPhoto(photo_id=27, album_id=6)
    album_join_photo28 = AlbumPhoto(photo_id=28, album_id=6)
    album_join_photo29 = AlbumPhoto(photo_id=29, album_id=4)
    album_join_photo30 = AlbumPhoto(photo_id=30, album_id=5)
    album_join_photo31 = AlbumPhoto(photo_id=31, album_id=4)
    album_join_photo32 = AlbumPhoto(photo_id=32, album_id=5)
    album_join_photo33 = AlbumPhoto(photo_id=1, album_id=4)
    album_join_photo34 = AlbumPhoto(photo_id=2, album_id=5)
    album_join_photo35 = AlbumPhoto(photo_id=3, album_id=6)
    album_join_photo36 = AlbumPhoto(photo_id=4, album_id=4)
    album_join_photo37 = AlbumPhoto(photo_id=5, album_id=5)
    album_join_photo38 = AlbumPhoto(photo_id=6, album_id=6)
    album_join_photo39 = AlbumPhoto(photo_id=7, album_id=4)
    album_join_photo40 = AlbumPhoto(photo_id=8, album_id=5)
    album_join_photo41 = AlbumPhoto(photo_id=9, album_id=6)
    album_join_photo42 = AlbumPhoto(photo_id=10, album_id=4)
    album_join_photo43 = AlbumPhoto(photo_id=11, album_id=5)
    album_join_photo44 = AlbumPhoto(photo_id=32, album_id=2)

    db.session.add(album_join_photo1)
    db.session.add(album_join_photo2)
    db.session.add(album_join_photo3)
    db.session.add(album_join_photo4)
    db.session.add(album_join_photo5)
    db.session.add(album_join_photo6)
    db.session.add(album_join_photo7)
    db.session.add(album_join_photo8)
    db.session.add(album_join_photo9)
    db.session.add(album_join_photo10)
    db.session.add(album_join_photo11)
    db.session.add(album_join_photo12)
    db.session.add(album_join_photo13)
    db.session.add(album_join_photo14)
    db.session.add(album_join_photo15)
    db.session.add(album_join_photo16)
    db.session.add(album_join_photo17)
    db.session.add(album_join_photo18)

    extra_join_album = [album_join_photo19, album_join_photo20, album_join_photo21,
                        album_join_photo22, album_join_photo23, album_join_photo24,
                        album_join_photo25, album_join_photo26, album_join_photo27,
                        album_join_photo28, album_join_photo29, album_join_photo30,
                        album_join_photo31, album_join_photo32, album_join_photo33,
                        album_join_photo34, album_join_photo35, album_join_photo36,
                        album_join_photo37, album_join_photo38, album_join_photo39,
                        album_join_photo40, album_join_photo41, album_join_photo42,
                        album_join_photo43, album_join_photo44]

    add_album_join_photos = [db.session.add(album_join) for album_join in extra_join_album]
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_seed_album_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM album_photos")

    db.session.commit()
