from app.models import db, TagPhoto, environment, SCHEMA

def seed_tag_photos():
    tag_join_photo1 = TagPhoto(photo_id=1, tag_id=1)
    tag_join_photo2 = TagPhoto(photo_id=1, tag_id=2)
    tag_join_photo3= TagPhoto(photo_id=2, tag_id=2)
    tag_join_photo4= TagPhoto(photo_id=2, tag_id=3)
    tag_join_photo5= TagPhoto(photo_id=3, tag_id=3)
    tag_join_photo6= TagPhoto(photo_id=4, tag_id=2)
    tag_join_photo7= TagPhoto(photo_id=5, tag_id=1)
    tag_join_photo8 = TagPhoto(photo_id=6, tag_id=1)
    tag_join_photo9 = TagPhoto(photo_id=7, tag_id=2)
    tag_join_photo10= TagPhoto(photo_id=8, tag_id=2)
    tag_join_photo11= TagPhoto(photo_id=9, tag_id=3)
    tag_join_photo12= TagPhoto(photo_id=10, tag_id=3)
    tag_join_photo13= TagPhoto(photo_id=11, tag_id=2)
    tag_join_photo14= TagPhoto(photo_id=12, tag_id=1)
    tag_join_photo15 = TagPhoto(photo_id=13, tag_id=1)
    tag_join_photo16 = TagPhoto(photo_id=14, tag_id=2)
    tag_join_photo17= TagPhoto(photo_id=15, tag_id=2)
    tag_join_photo18= TagPhoto(photo_id=16, tag_id=3)
    tag_join_photo19= TagPhoto(photo_id=17, tag_id=3)
    tag_join_photo20= TagPhoto(photo_id=18, tag_id=2)
    tag_join_photo21= TagPhoto(photo_id=18, tag_id=1)

    tag_join_photo22 = TagPhoto(photo_id=19, tag_id=4)
    tag_join_photo23 = TagPhoto(photo_id=19, tag_id=5)
    tag_join_photo24 = TagPhoto(photo_id=20, tag_id=5)
    tag_join_photo25 = TagPhoto(photo_id=20, tag_id=6)
    tag_join_photo26 = TagPhoto(photo_id=21, tag_id=6)
    tag_join_photo27 = TagPhoto(photo_id=22, tag_id=5)
    tag_join_photo28 = TagPhoto(photo_id=23, tag_id=4)
    tag_join_photo29 = TagPhoto(photo_id=23, tag_id=7)
    tag_join_photo30 = TagPhoto(photo_id=24, tag_id=4)
    tag_join_photo31 = TagPhoto(photo_id=25, tag_id=5)
    tag_join_photo32 = TagPhoto(photo_id=25, tag_id=8)
    tag_join_photo33 = TagPhoto(photo_id=26, tag_id=5)
    tag_join_photo34 = TagPhoto(photo_id=27, tag_id=6)
    tag_join_photo35 = TagPhoto(photo_id=28, tag_id=4)
    tag_join_photo36 = TagPhoto(photo_id=28, tag_id=9)
    tag_join_photo37 = TagPhoto(photo_id=29, tag_id=4)
    tag_join_photo38 = TagPhoto(photo_id=30, tag_id=5)
    tag_join_photo39 = TagPhoto(photo_id=30, tag_id=10)
    tag_join_photo40 = TagPhoto(photo_id=31, tag_id=5)
    tag_join_photo41 = TagPhoto(photo_id=32, tag_id=6)
    tag_join_photo42 = TagPhoto(photo_id=32, tag_id=11)

    all_tags = [tag_join_photo1, tag_join_photo2, tag_join_photo3, tag_join_photo4, tag_join_photo5, tag_join_photo6, tag_join_photo7, tag_join_photo8, tag_join_photo9, tag_join_photo10, tag_join_photo11, tag_join_photo12, tag_join_photo13, tag_join_photo14, tag_join_photo15, tag_join_photo16, tag_join_photo17, tag_join_photo18, tag_join_photo19, tag_join_photo20, tag_join_photo21, tag_join_photo22, tag_join_photo23, tag_join_photo24, tag_join_photo25, tag_join_photo26, tag_join_photo27, tag_join_photo28, tag_join_photo29, tag_join_photo30, tag_join_photo31, tag_join_photo32, tag_join_photo33, tag_join_photo34, tag_join_photo35, tag_join_photo36, tag_join_photo37, tag_join_photo38, tag_join_photo39, tag_join_photo40, tag_join_photo41, tag_join_photo42]
    add_tags = [db.session.add(tag) for tag in all_tags]
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tag_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tag_photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tag_photos")

    db.session.commit()
