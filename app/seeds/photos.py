from app.models import db, Photo, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_photos():
    photo1 = Photo(user_id=1, title='Kobe Bryant Reverse Lay', description="As Kobe Bryant drives towards the basket, he accelerates past his defender with a quick change of direction. With the defender trailing him, Kobe takes off towards the rim, gracefully gliding through the air. As he approaches the basket, he twists his body and lays the ball up in a reverse motion, using the rim to shield the ball from any potential shot blockers. With precision and finesse, Kobe's reverse layup finds the bottom of the net, leaving the crowd in awe of his incredible athleticism and skill.", url='https://i.pinimg.com/originals/3d/9a/5c/3d9a5ce99b3fdf8f75141833e842becc.jpg')
    photo2 = Photo(user_id=2, title='Deebo Samuel Break Tackles', description="Deebo Samuel bursts forward and powers through a defender's attempted tackle, continuing his run with determination.", url='https://sactownsports.com/wp-content/uploads/2022/12/GettyImages-1448401270-scaled.jpg')
    photo3 = Photo(user_id=3, title='Hawaii Little League Champs', description='Hawaii wins it all in Little League Baseball', url='https://i.guim.co.uk/img/media/2757c4faa3abcc727bf1f2ceb227b96d275c7759/0_92_2100_1261/master/2100.jpg?width=1200&quality=85&auto=format&fit=max&s=e2f382d036b45d0e22126820cf6985da')
    photo4 = Photo(user_id=1, title='Connor McDavid', description='Connor McDavid dominates the ice with his incredible speed and skill, scoring goal after goal with ease to become the scoring champion of the league.', url='https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Foilonwhyte.com%2Fwp-content%2Fuploads%2Fimagn-images%2F2017%2F07%2F17994007.jpeg')
    photo5 = Photo(user_id=2, title='Fadeaway James', description='LeBron James rises up for a fadeaway jumper, the ball leaving his fingertips with a perfect arc and swishing through the net. With that shot, he becomes the all-time leading scorer, solidifying his place in basketball history as one of the greatest to ever play the game.', url='https://sportshub.cbsistatic.com/i/r/2023/02/08/3f5e5d05-7242-4d06-96aa-02f7cc40aa38/thumbnail/1200x675/5566a37e3828e2aa3c418a22cfc848f2/lebron-fadeaway-getty.jpg')
    photo6 = Photo(user_id=3, title='Feeling of victory', description="The stadium erupts as Messi's last-minute goal secures a dramatic victory, a moment that will be remembered for years to come.", url='https://static01.nyt.com/images/2017/04/24/sports/24CLASICO/24CLASICO-superJumbo-v2.jpg')
    photo7 = Photo(user_id=1, title='Naomi Osaka', description=' With a bright future ahead of her, Naomi is quickly making a name for herself as a rising star in the world of tennis.', url='https://imageio.forbes.com/specials-images/imageserve//62ae57f3e7036f3bd98819cd/0x0.jpg?format=jpg&width=1200')
    photo8 = Photo(user_id=2, title='Suni Lee', description='Suni Lee returns to U.S. gymnastics national team camp', url='https://olympics.nbcsports.com/wp-content/uploads/sites/10/2022/07/GettyImages-1331273324-e1656841199539.jpg?w=594')
    photo9 = Photo(user_id=3, title='Homerun Kings', description='Aaron Judge or Barry Bonds?', url='https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/FPFCKM3S6JHQ3BGMRCJXOEHBQE.jpg&w=1440')
    photo10 = Photo(user_id=1, title='Knockout?', description="Connor McGregor unleashes a lightning-fast punch, catching his opponent off guard and sending them crashing to the mat. The arena erupts in excitement as McGregor celebrates his impressive knockout victory, showcasing the incredible power and precision that have made him one of the most fearsome fighters in the world.", url='https://media.licdn.com/dms/image/C4E12AQHUDth3fzhLQg/article-cover_image-shrink_720_1280/0/1566825780399?e=2147483647&v=beta&t=PmfoUe7Cdtgrf-xb1yE9NUCKUC-n5mtVM_l6P6OUlcM')
    photo11 = Photo(user_id=2, title='Steph Curry Three-Pointer', description='Steph Curry pulls up from beyond the arc, launching a three-point shot with his signature high release. As the ball sails through the air, it seems to hang for a moment before swishing through the net, much to the delight of the crowd.', url='https://pickywallpapers.com/img/2018/6/thumb/steph-curry-4k-wallpaper-249-256-hd-wallpapers-thumb.jpg')
    photo12 = Photo(user_id=3, title='Serena Williams Championship Point', description='Serena Williams serves for the championship, her powerful shot nearly unreturnable. As the ball thunders off her racket and races towards the opposite side of the court, Serena pumps her fist in triumph, having claimed yet another Grand Slam title.', url='https://cdn.wallpapersafari.com/96/15/IkTaEU.jpg')
    photo13 = Photo(user_id=1, title='Usain Bolt Olympic Gold', description="Usain Bolt crosses the finish line, his arms raised triumphantly in the air. With his blistering speed and unparalleled athleticism, he has once again dominated the competition and claimed another Olympic gold medal.", url='https://w0.peakpx.com/wallpaper/874/750/HD-wallpaper-usain-bolt-running.jpg')
    photo14 = Photo(user_id=2, title='Simone Biles Perfect 10', description='Simone Biles performs a flawless routine, executing each move with precision and grace. As she sticks the landing, the judges award her a perfect 10, cementing her status as one of the greatest gymnasts of all time.', url='https://wallpapercave.com/wp/wp2371591.jpg')
    photo15 = Photo(user_id=3, title='Federer Nadal Rivalry', description='Roger Federer and Rafael Nadal face off in an epic match, their rivalry one of the greatest in the history of tennis. With each player pushing themselves to the limit, the match is a thrilling showcase of skill and athleticism.', url='https://www.atptour.com/en/news/www.atptour.com/-/media/images/news/2022/02/03/19/18/federer-nadal-laver-cup-2022-announcement-1.jpg')
    photo16 = Photo(user_id=1, title='Megan Rapinoe Goal Celebration', description='Megan Rapinoe scores a goal, her celebration a perfect mix of joy and intensity. With her team cheering behind her, she pumps her fists and lets out a shout, savoring the moment.', url='https://wallpapercave.com/wp/wp4244969.jpg')

    all_photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, ]
    add_photos = [db.session.add(photo) for photo in all_photos]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
