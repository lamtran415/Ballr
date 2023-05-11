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

    all_tags = [tag_join_photo1, tag_join_photo2, tag_join_photo3, tag_join_photo4, tag_join_photo5, tag_join_photo6, tag_join_photo7, tag_join_photo8, tag_join_photo9, tag_join_photo10, tag_join_photo11, tag_join_photo12, tag_join_photo13, tag_join_photo14, tag_join_photo15, tag_join_photo16, tag_join_photo17, tag_join_photo18, tag_join_photo19, tag_join_photo20, tag_join_photo21]
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
