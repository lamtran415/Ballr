from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(user_id=3, photo_id=1, comment='Kobe Bryant is the GOAT!!')
    comment2 = Comment(user_id=2, photo_id=2, comment='Deebo break tackles for days.')
    comment3 = Comment(user_id=1, photo_id=3, comment='AI is the truth')
    comment4 = Comment(user_id=3, photo_id=4, comment='How can you stop this guy?')
    comment5 = Comment(user_id=2, photo_id=5, comment='Fastest person on earth!')
    comment6 = Comment(user_id=1, photo_id=6, comment="She's a baller forsure!")
    comment7 = Comment(user_id=3, photo_id=7, comment="Messi is too good!")
    comment8 = Comment(user_id=2, photo_id=8, comment="My daughter looks up to this superstar." )
    comment9 = Comment(user_id=1, photo_id=9, comment='This is a tough one, Barry Bonds will always be the King.')
    comment10 = Comment(user_id=3, photo_id=10, comment="At the end of the day, you've gotta feel some way. So why not feel unbeatable? Why not feel untouchable?")
    comment11 = Comment(user_id=3, photo_id=11, comment="What a clutch shot!")
    comment12 = Comment(user_id=2, photo_id=12, comment="She's one of the best to ever do it!")
    comment13 = Comment(user_id=3, photo_id=13, comment="The energy in this stadium is electric!")
    comment14 = Comment(user_id=1, photo_id=14, comment="Simone Biles is a legend, definitely the prize.")
    comment15 = Comment(user_id=1, photo_id=15, comment="The form on this athlete is incredible.")
    comment16 = Comment(user_id=3, photo_id=16, comment="This match was a nail-biter until the very end.")
    comment17 = Comment(user_id=1, photo_id=17, comment="What an amazing athlete!")
    comment18 = Comment(user_id=1, photo_id=18, comment="How is that possible?!")
    comment19 = Comment(user_id=2, photo_id=19, comment="Nick Bosa's defensive skills are unmatched!")
    comment20 = Comment(user_id=3, photo_id=20, comment="Lamar Jackson's speed on the field is electrifying.")
    comment21 = Comment(user_id=1, photo_id=21, comment="She's pretty unstoppable with the rock")
    comment22 = Comment(user_id=2, photo_id=22, comment="What a power couple!")
    comment23 = Comment(user_id=3, photo_id=23, comment="They really hoop dawg!")
    comment24 = Comment(user_id=1, photo_id=24, comment="GO 49ers !!!!! Our team is too stacked.")
    comment25 = Comment(user_id=2, photo_id=25, comment="Paul George's 'Podcast P' is a must-listen!")
    comment26 = Comment(user_id=1, photo_id=26, comment="Sabrina Ionescu's court vision is unparalleled.")
    comment27 = Comment(user_id=3, photo_id=27, comment="AR15 x DLo: A dynamic duo on the court!")
    comment28 = Comment(user_id=1, photo_id=28, comment="Shohei Ohtani's move to the Dodgers is a game-changer.")
    comment29 = Comment(user_id=2, photo_id=29, comment="Kobe Bryant's legacy lives on through his unforgettable plays.")
    comment30 = Comment(user_id=3, photo_id=30, comment="Mbappe's speed and technical prowess are truly outstanding.")
    comment31 = Comment(user_id=2, photo_id=31, comment="This kid is going to be great in the league.")
    comment32 = Comment(user_id=3, photo_id=32, comment="Caitlyn Clark's skills are a game-changer for Iowa Hawkeyes.")

    comment33 = Comment(user_id=2, photo_id=1, comment="Such finesse in that reverse layup! Kobe's skills are unmatched.")
    comment34 = Comment(user_id=3, photo_id=2, comment="Deebo's agility is on another level. What a play!")
    comment35 = Comment(user_id=2, photo_id=3, comment="I miss AI in the league. Exciting to watch!")
    comment36 = Comment(user_id=2, photo_id=4, comment="Connor McDavid's speed is mind-blowing. Can't keep up!")
    comment37 = Comment(user_id=3, photo_id=5, comment="Usain Bolt, the legend, never disappoints! Olympic greatness.")
    comment38 = Comment(user_id=2, photo_id=6, comment="Naomi Osaka's potential is limitless. A rising tennis star!")
    comment39 = Comment(user_id=2, photo_id=7, comment="Messi's last-minute goals are a heart-stopper. Incredible!")
    comment40 = Comment(user_id=3, photo_id=8, comment="Suni Lee's gymnastic skills are poetry in motion. Mesmerizing!")
    comment41 = Comment(user_id=2, photo_id=9, comment="Aaron Judge or Barry Bonds? The debate continues!")
    comment42 = Comment(user_id=2, photo_id=10, comment="Connor McGregor's knockout power is unparalleled. Spectacular!")
    comment43 = Comment(user_id=1, photo_id=11, comment="Brady and Gronk - a legendary duo in football history.")
    comment44 = Comment(user_id=1, photo_id=12, comment="Serena Williams' championship point - pure dominance!")
    comment45 = Comment(user_id=2, photo_id=13, comment="LeBron James' dunks are a highlight reel on their own.")
    comment46 = Comment(user_id=3, photo_id=14, comment="Simone Biles' perfect 10 routine is a masterpiece.")
    comment47 = Comment(user_id=1, photo_id=15, comment="Shaq and Kobe - one of the greatest duos in basketball.")
    comment48 = Comment(user_id=2, photo_id=16, comment="Megan Rapinoe's goal celebration is pure joy. Amazing!")
    comment49 = Comment(user_id=3, photo_id=17, comment="Patrick Mahomes - Superbowl MVP. A true talent.")
    comment50 = Comment(user_id=1, photo_id=18, comment="KD to the Suns - an interesting move. Championship bound?")

    comment51 = Comment(user_id=3, photo_id=19, comment="Nick Bosa's defensive prowess is like a fortress. Offensive nightmares!")
    comment52 = Comment(user_id=1, photo_id=20, comment="Lamar Jackson's speed is like lightning on the field. Blink, and you miss it!")
    comment53 = Comment(user_id=2, photo_id=21, comment="Kelsey Plum's scoring ability is a symphony of skill. Hoops maestro!")
    comment54 = Comment(user_id=3, photo_id=22, comment="Travis Kelce and Taylor Swift - a match made in celebrity heaven! Power couple vibes.")
    comment55 = Comment(user_id=1, photo_id=23, comment="OKC Thunders' young stars - the NBA's fountain of youth! Future is bright.")
    comment56 = Comment(user_id=2, photo_id=24, comment="Super Bowl LVIII: 49ers vs Chiefs - the ultimate gridiron showdown! Can't wait!")
    comment57 = Comment(user_id=3, photo_id=25, comment="Paul George's 'Podcast P' - a auditory slam dunk! Tune in for wisdom.")
    comment58 = Comment(user_id=3, photo_id=26, comment="Pure basketball sorcery! Nobody is guarding here in the WNBA.")
    comment59 = Comment(user_id=2, photo_id=27, comment="AR15 x DLo: Court chemistry at its finest! Dynamic duo domination.")
    comment60 = Comment(user_id=2, photo_id=28, comment="Seismic shift in baseball! League alert.")
    comment61 = Comment(user_id=3, photo_id=29, comment="They don't make them like him anymore.")
    comment62 = Comment(user_id=1, photo_id=30, comment="A football symphony! Mesmerizing performance.")
    comment63 = Comment(user_id=3, photo_id=31, comment="Is Caleb Williams the future face of the NFL? Draft day dreams!")
    comment64 = Comment(user_id=1, photo_id=32, comment="Her skills redefine basketball artistry. Iowa's pride and joy!")

    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10, comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20, comment21, comment22, comment23, comment24, comment25, comment26, comment27, comment28, comment29, comment30, comment31, comment32, comment33, comment34, comment35, comment36, comment37, comment38, comment39, comment40, comment41, comment42, comment43, comment44, comment45, comment46, comment47, comment48, comment49, comment50, comment51, comment52, comment53, comment54, comment55, comment56, comment57, comment58, comment59, comment60, comment61, comment62, comment63, comment64]
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
