from app.models import db, Tag, environment, SCHEMA

def seed_tags():
    tag1 = Tag(tag_name="legend"
        )
    tag2 = Tag(tag_name ="professional"
        )
    tag3 = Tag(tag_name ="elite"
        )
    tag4 = Tag(tag_name="champion")
    tag5 = Tag(tag_name="fan-favorite")
    tag6 = Tag(tag_name="playmaker")
    tag7 = Tag(tag_name="rising-star")
    tag8 = Tag(tag_name="record-holder")
    tag9 = Tag(tag_name="defensive-master")
    tag10 = Tag(tag_name="all-star")
    tag11 = Tag(tag_name="basketball-icon")

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.add(tag4)
    db.session.add(tag5)
    db.session.add(tag6)
    db.session.add(tag7)
    db.session.add(tag8)
    db.session.add(tag9)
    db.session.add(tag10)
    db.session.add(tag11)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")

    db.session.commit()
