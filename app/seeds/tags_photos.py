from app.models import db, TagPhoto, environment, SCHEMA

def seed_tag_photos():
    tag_join_photo1 = TagPhoto(photo_id=1, tag_id=1)
    tag_join_photo2 = TagPhoto(photo_id=1, tag_id=2)
    tag_join_photo3= TagPhoto(photo_id=2, tag_id=2)
    tag_join_photo4= TagPhoto(photo_id=2, tag_id=3)
    tag_join_photo5= TagPhoto(photo_id=3, tag_id=3)
    tag_join_photo6= TagPhoto(photo_id=4, tag_id=2)
    tag_join_photo7= TagPhoto(photo_id=5, tag_id=1)

    all_tags = [tag_join_photo1, tag_join_photo2, tag_join_photo3, tag_join_photo4, tag_join_photo5, tag_join_photo6, tag_join_photo7]
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