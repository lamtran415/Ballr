from app.models import db, Photo, environment, SCHEMA

photo1 = Photo(user_id=1, title='Kobe Bryant Reverse Lay', description="As Kobe Bryant drives towards the basket, he accelerates past his defender with a quick change of direction. With the defender trailing him, Kobe takes off towards the rim, gracefully gliding through the air. As he approaches the basket, he twists his body and lays the ball up in a reverse motion, using the rim to shield the ball from any potential shot blockers. With precision and finesse, Kobe's reverse layup finds the bottom of the net, leaving the crowd in awe of his incredible athleticism and skill.", url='https://library.sportingnews.com/2021-08/bryantkobe-1107-getty-us-ftr_1ahfixdvzqe9h1fvyxycfoqy44.jpg')
photo2 = Photo(user_id=2, title='McCaffrey and Deebo', description="Christian McCaffrey and Deebo Samuel gameplanning on the sideline.", url='https://library.sportingnews.com/2023-02/Christian%20McCaffrey%20Deebo%20Samuel%20120422.jpg')
photo3 = Photo(user_id=3, title='The Answer', description="Iverson was known for his quickness, agility, and scoring ability, and he was one of the most prolific scorers in NBA history. He was named the NBA's Most Valuable Player in 2001 and led the 76ers to the NBA Finals the same year. Off the court, Iverson was known for his controversial persona and unique fashion sense.", url='https://images3.alphacoders.com/770/thumb-1920-770547.jpg')
photo4 = Photo(user_id=1, title='Connor McDavid', description='Connor McDavid dominates the ice with his incredible speed and skill, scoring goal after goal with ease to become the scoring champion of the league.', url='https://s.yimg.com/os/creatr-uploaded-images/2021-02/012d32a0-720e-11eb-9bdf-746162dc1fab')
photo5 = Photo(user_id=2, title='Usain Bolt Olympic Gold', description="Usain Bolt crosses the finish line, his arms raised triumphantly in the air. With his blistering speed and unparalleled athleticism, he has once again dominated the competition and claimed another Olympic gold medal.", url='https://wallpapercave.com/wp/nNehoDO.jpg')
photo6 = Photo(user_id=3, title='Naomi Osaka', description=' With a bright future ahead of her, Naomi is quickly making a name for herself as a rising star in the world of tennis.', url='https://imageresizer.static9.net.au/vhpnLUxNDfovNpz8Jf-K7eJpPD4=/0x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F0834282a-9e20-499c-8841-dc6045268f28')
photo7 = Photo(user_id=1, title='Feeling of victory', description="The stadium erupts as Messi's last-minute goal secures a dramatic victory, a moment that will be remembered for years to come.", url='https://static01.nyt.com/images/2017/04/24/sports/24CLASICO/24CLASICO-superJumbo-v2.jpg')
photo8 = Photo(user_id=2, title='Suni Lee', description='Suni Lee returns to U.S. gymnastics national team camp', url='https://wallpapercave.com/wp/wp9597383.jpg')
photo9 = Photo(user_id=3, title='Homerun Kings', description='Aaron Judge or Barry Bonds?', url='https://library.sportingnews.com/2022-08/Aaron-Judge-Barry-Bonds-080522-Getty-FTR.jpeg')
photo10 = Photo(user_id=1, title='Knockout?', description="Connor McGregor unleashes a lightning-fast punch, catching his opponent off guard and sending them crashing to the mat. The arena erupts in excitement as McGregor celebrates his impressive knockout victory, showcasing the incredible power and precision that have made him one of the most fearsome fighters in the world.", url='https://media.licdn.com/dms/image/C4E12AQHUDth3fzhLQg/article-cover_image-shrink_720_1280/0/1566825780399?e=2147483647&v=beta&t=PmfoUe7Cdtgrf-xb1yE9NUCKUC-n5mtVM_l6P6OUlcM')
photo11 = Photo(user_id=2, title='Brady and Gronk', description="Tom Brady and Rob Gronkowski formed one of the most dynamic duos in football history during their time playing together on the New England Patriots. Brady, widely considered one of the greatest quarterbacks of all time, had a natural connection with Gronkowski, a talented and versatile tight end. Together, they helped lead the Patriots to four Super Bowl victories, with Gronkowski becoming a reliable target for Brady in key moments of those championship games. Their combination of skill, competitiveness, and mutual trust helped cement their status as one of the most successful quarterback-tight end duos in NFL history.", url='https://wallpaperaccess.com/full/325308.jpg')
photo12 = Photo(user_id=3, title='Serena Williams Championship Point', description='Serena Williams serves for the championship, her powerful shot nearly unreturnable. As the ball thunders off her racket and races towards the opposite side of the court, Serena pumps her fist in triumph, having claimed yet another Grand Slam title.', url='https://cdn.wallpapersafari.com/96/15/IkTaEU.jpg')
photo13 = Photo(user_id=1, title='James with the Dunk', description="LeBron James' ability to drive to the basket and finish with a thunderous dunk down the lane is one of the most iconic moves in basketball, and has helped solidify James as one of the greatest players of all time.", url='https://wallpaperaccess.com/full/1523688.jpg')
photo14 = Photo(user_id=2, title='Simone Biles Perfect 10', description='Simone Biles performs a flawless routine, executing each move with precision and grace. As she sticks the landing, the judges award her a perfect 10, cementing her status as one of the greatest gymnasts of all time.', url='https://wallpapercave.com/wp/wp2371591.jpg')
photo15 = Photo(user_id=3, title='One of the greatest duo', description="Shaquille O'Neal and Kobe Bryant were one of the greatest duos in basketball history, playing together on the Los Angeles Lakers from 1996 to 2004. O'Neal, known as 'Shaq,' was a dominant center with an imposing physical presence, while Bryant was a dynamic shooting guard with unmatched scoring ability. Together, they led the Lakers to three consecutive NBA championships from 2000 to 2002 and were a dominant force on the court. Despite some disagreements and conflicts between the two players, their on-court chemistry and success solidified their legacy as one of the most memorable duos in NBA history.", url='https://oldskoolbball.com/wp-content/uploads/2020/03/shaq-moments.jpg')
photo16 = Photo(user_id=1, title='Megan Rapinoe Goal Celebration', description='Megan Rapinoe scores a goal, her celebration a perfect mix of joy and intensity. With her team cheering behind her, she pumps her fists and lets out a shout, savoring the moment.', url='https://wallpapercave.com/wp/wp4244969.jpg')
photo17 = Photo(user_id=2, title='Superbowl MVP Patrick Mahomes', description='Patrick Mahomes has quickly established himself as one of the most talented quarterbacks in the NFL.', url='https://wallpapers.com/images/featured/4tb0j1bx7kkwp6t4.jpg')
photo18 = Photo(user_id=3, title='KD to Suns', description="Kevin Durant being traded to the Suns. Do they have a shot at the championship this year?", url='https://media.nbcwashington.com/2023/02/usa-kevin-durant-suns.jpg?quality=85&strip=all')
# Adds a demo user, you can add other users here if you want
def seed_photos():

    all_photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18 ]
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
