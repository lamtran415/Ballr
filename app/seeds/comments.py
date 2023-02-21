from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(user_id=3, photo_id=1, comment='Kobe Bryant is the GOAT!!')
    comment2 = Comment(user_id=2, photo_id=2, comment='Deebo break tackles for days.')
    comment3 = Comment(user_id=1, photo_id=3, comment='These kids have a bright future!')
    comment4 = Comment(user_id=3, photo_id=4, comment='How can you stop this guy?')
    comment5 = Comment(user_id=2, photo_id=5, comment='What a great achievement.. Just a kid from Akron..')
    comment6 = Comment(user_id=1, photo_id=6, comment='Messi is too good!')
    comment7 = Comment(user_id=3, photo_id=7, comment="She's a baller forsure!")
    comment8 = Comment(user_id=2, photo_id=8, comment="My daughter looks up to this superstar." )
    comment9 = Comment(user_id=1, photo_id=9, comment='This is a tough one, Barry Bonds will always be the King.')
    comment10 = Comment(user_id=3, photo_id=10, comment="At the end of the day, you've gotta feel some way. So why not feel unbeatable? Why not feel untouchable?")

    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10]
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
