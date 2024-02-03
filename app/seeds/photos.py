from app.models import db, Photo, environment, SCHEMA

photo1 = Photo(user_id=1, title='Kobe Bryant Reverse Lay', description="As Kobe Bryant drives towards the basket, he accelerates past his defender with a quick change of direction. With the defender trailing him, Kobe takes off towards the rim, gracefully gliding through the air. As he approaches the basket, he twists his body and lays the ball up in a reverse motion, using the rim to shield the ball from any potential shot blockers. With precision and finesse, Kobe's reverse layup finds the bottom of the net, leaving the crowd in awe of his incredible athleticism and skill.", url='https://lakers.newssurge.com/gallery/d/283821-1/Kobe+Bryant+goes+for+the+reverse+layup+vs+the+Raptors.JPG')
photo2 = Photo(user_id=2, title='McCaffrey and Deebo', description="Christian McCaffrey and Deebo Samuel gameplanning on the sideline.", url='https://c8.alamy.com/comp/2RYKPEX/san-francisco-49ers-running-back-christian-mccaffrey-23-celebrates-after-scoring-a-touchdown-with-wide-receiver-deebo-samuel-during-the-first-half-of-an-nfl-football-game-against-the-arizona-cardinals-in-santa-clara-calif-sunday-oct-1-2023-ap-photojosie-lepe-2RYKPEX.jpg')
photo3 = Photo(user_id=3, title='The Answer', description="Iverson was known for his quickness, agility, and scoring ability, and he was one of the most prolific scorers in NBA history. He was named the NBA's Most Valuable Player in 2001 and led the 76ers to the NBA Finals the same year. Off the court, Iverson was known for his controversial persona and unique fashion sense.", url='https://ih1.redbubble.net/image.2093151896.8438/flat,750x,075,f-pad,750x1000,f8f8f8.jpg')
photo4 = Photo(user_id=1, title='Connor McDavid', description='Connor McDavid dominates the ice with his incredible speed and skill, scoring goal after goal with ease to become the scoring champion of the league.', url='https://i.ebayimg.com/images/g/qiIAAOSwQFJaoc2P/s-l1600.jpg')
photo5 = Photo(user_id=2, title='Usain Bolt Olympic Gold', description="Usain Bolt crosses the finish line, his arms raised triumphantly in the air. With his blistering speed and unparalleled athleticism, he has once again dominated the competition and claimed another Olympic gold medal.", url='https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/itgo4fceaazaicrrl7b2')
photo6 = Photo(user_id=3, title='Naomi Osaka', description=' With a bright future ahead of her, Naomi is quickly making a name for herself as a rising star in the world of tennis.', url='https://www.naomiosaka.com/wp-content/uploads/2021/05/naomi-tennis-pro.jpg')
photo7 = Photo(user_id=1, title='Feeling of victory', description="The stadium erupts as Messi's last-minute goal secures a dramatic victory, a moment that will be remembered for years to come.", url='https://cdn.punchng.com/wp-content/uploads/2022/12/19070956/5f5e3cbe-1224-4a46-b8e7-612f5de03c8c.jpg')
photo8 = Photo(user_id=2, title='Suni Lee', description='Suni Lee returns to U.S. gymnastics national team camp', url='https://images.axios.com/A4CDjzXeXy2lOkvuxRsuBbKhYQo=/0x122:4618x2720/1920x1080/2021/07/29/1627562103210.jpg')
photo9 = Photo(user_id=3, title='Homerun Kings', description='Aaron Judge or Barry Bonds?', url='https://library.sportingnews.com/2022-08/Aaron-Judge-Barry-Bonds-080522-Getty-FTR.jpeg')
photo10 = Photo(user_id=1, title='Knockout?', description="Connor McGregor unleashes a lightning-fast punch, catching his opponent off guard and sending them crashing to the mat. The arena erupts in excitement as McGregor celebrates his impressive knockout victory, showcasing the incredible power and precision that have made him one of the most fearsome fighters in the world.", url='https://media.licdn.com/dms/image/C4E12AQHUDth3fzhLQg/article-cover_image-shrink_720_1280/0/1566825780399?e=2147483647&v=beta&t=PmfoUe7Cdtgrf-xb1yE9NUCKUC-n5mtVM_l6P6OUlcM')
photo11 = Photo(user_id=2, title='Brady and Gronk', description="Tom Brady and Rob Gronkowski formed one of the most dynamic duos in football history during their time playing together on the New England Patriots. Brady, widely considered one of the greatest quarterbacks of all time, had a natural connection with Gronkowski, a talented and versatile tight end. Together, they helped lead the Patriots to four Super Bowl victories, with Gronkowski becoming a reliable target for Brady in key moments of those championship games. Their combination of skill, competitiveness, and mutual trust helped cement their status as one of the most successful quarterback-tight end duos in NFL history.", url='https://wallpaperaccess.com/full/325308.jpg')
photo12 = Photo(user_id=3, title='Serena Williams Championship Point', description='Serena Williams serves for the championship, her powerful shot nearly unreturnable. As the ball thunders off her racket and races towards the opposite side of the court, Serena pumps her fist in triumph, having claimed yet another Grand Slam title.', url='https://upload.wikimedia.org/wikipedia/commons/2/27/Serena_Williams_at_the_Australian_Open_2015.jpg')
photo13 = Photo(user_id=1, title='James with the Dunk', description="LeBron James' ability to drive to the basket and finish with a thunderous dunk down the lane is one of the most iconic moves in basketball, and has helped solidify James as one of the greatest players of all time.", url='https://i.pinimg.com/originals/87/d5/0f/87d50f74b04fbdc69fd12994f5c317c9.jpg')
photo14 = Photo(user_id=2, title='Simone Biles Perfect 10', description='Simone Biles performs a flawless routine, executing each move with precision and grace. As she sticks the landing, the judges award her a perfect 10, cementing her status as one of the greatest gymnasts of all time.', url='https://media.gq.com/photos/5da3664049acb20008f24fc5/16:9/w_2560%2Cc_limit/GettyImages-1180618614.jpg')
photo15 = Photo(user_id=3, title='One of the greatest duo', description="Shaquille O'Neal and Kobe Bryant were one of the greatest duos in basketball history, playing together on the Los Angeles Lakers from 1996 to 2004. O'Neal, known as 'Shaq,' was a dominant center with an imposing physical presence, while Bryant was a dynamic shooting guard with unmatched scoring ability. Together, they led the Lakers to three consecutive NBA championships from 2000 to 2002 and were a dominant force on the court. Despite some disagreements and conflicts between the two players, their on-court chemistry and success solidified their legacy as one of the most memorable duos in NBA history.", url='https://oldskoolbball.com/wp-content/uploads/2020/03/shaq-moments.jpg')
photo16 = Photo(user_id=1, title='Megan Rapinoe Goal Celebration', description='Megan Rapinoe scores a goal, her celebration a perfect mix of joy and intensity. With her team cheering behind her, she pumps her fists and lets out a shout, savoring the moment.', url='https://nbcsports.brightspotcdn.com/dims4/default/8cfd4f0/2147483647/strip/false/crop/1920x1080+0+0/resize/1920x1080!/quality/90/?url=https%3A%2F%2Fhdliveextra-a.akamaihd.net%2FHD%2Fimage_sports%2FNBCU_Sports_Group_-_nbcsports%2F892%2F71%2Fnbc_soc_rapinoegoals2019wwc_230705.jpg')
photo17 = Photo(user_id=2, title='Superbowl MVP Patrick Mahomes', description='Patrick Mahomes has quickly established himself as one of the most talented quarterbacks in the NFL.', url='https://cdn.vox-cdn.com/thumbor/gglDJommYFHwehkCCMKVjHbqFoc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23217354/1367718480.jpg')
photo18 = Photo(user_id=3, title='KD to Suns', description="Kevin Durant being traded to the Suns. Do they have a shot at the championship this year?", url='https://i.redd.it/sz84ci7ycrta1.jpg')

photo19 = Photo(user_id=1, title='Pro Bowler Nick Bosa', description="Nick Bosa, a formidable force on the gridiron, is an accomplished American football defensive end known for his tenacity and skill.", url='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Nick_Bosa_vs_Redskins_2019.jpg/1200px-Nick_Bosa_vs_Redskins_2019.jpg')
photo20 = Photo(user_id=2, title='Lamar Jackson', description="Lamar Jackson, a dynamic quarterback in the NFL, is renowned for his electrifying speed, agility, and playmaking abilities. ", url='https://andscape.com/wp-content/uploads/2022/10/GettyImages-1429688827-e1665413317460.jpg?w=700')
photo21 = Photo(user_id=3, title='Kelsey Plum', description="Kelsey Plum, a standout talent in women's basketball, is celebrated for her scoring prowess and court vision. ", url='https://static01.nyt.com/images/2017/04/14/sports/14WNBA/14WNBA-superJumbo-v3.jpg')
photo22 = Photo(user_id=1, title='Travis Kelce with Taylor Swift', description='Travis Kelce celebrates with his girlfriend, Taylor Swift, as the Chiefs head to the Super Bowl', url='https://media.cnn.com/api/v1/images/stellar/prod/ap24031618526277-20240131204329070-20240131204353511.jpg?c=16x9&q=h_833,w_1480,c_fill')
photo23 = Photo(user_id=2, title='OKC Thunders Young Stars', description="Are these young stars the future of the league?", url='https://ng-sportingnews.com/s3/files/styles/crop_style_16_9_desktop/s3/2024-01/GettyImages-1758386743%20%281%29.jpg?h=920929c4&itok=mVMMs0RN')
photo24 = Photo(user_id=3, title='Super Bowl LVIII', description='San Francisco 49ers vs Kansas City Chiefs', url='https://media.nbcsportsbayarea.com/2024/01/Brock-Purdy-Patrick-Mahomes-USATSI.jpg?quality=85&strip=all')
photo25 = Photo(user_id=1, title='Podcast P', description="NBA Superstar Paul George introduces his podcast named 'Podcast P'.", url='https://pbs.twimg.com/media/FqjhOHQakAAJSok.jpg:large')
photo26 = Photo(user_id=2, title='Sabrina Ionescu', description="Sabrina Ionescu, a phenom in women's basketball, has dazzled fans with her extraordinary skill set and unparalleled court vision.", url='https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F40c13370-5baa-4b9e-8fbf-0e35514a904c_1600x1067.jpeg')
photo27 = Photo(user_id=3, title='AR15 x DLo', description="D'Angelo Russell, a dynamic guard in the NBA, showcases his smooth scoring and playmaking prowess on the court for the Minnesota Timberwolves, while Austin Reaves, a rising talent for the Los Angeles Lakers, brings versatility and tenacity to his role as a promising guard-forward.", url='https://golfdigest.sports.sndimg.com/content/dam/images/golfdigest/fullset/2023/reaves_russell.jpg.rend.hgtvcom.1280.853.suffix/1697638119901.jpeg')
photo28 = Photo(user_id=3, title='Shohei Otani', description="Shohei Ohtani's move to the Dodgers sends shockwaves through the baseball world. ", url='https://people.com/thmb/OdcS27u4U363H-_U1UZ-OmgpLnc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(982x465:984x467)/shohei-ohtani-1-8b69a044d8584b58b4d660fd36689aa4.jpg')
photo29 = Photo(user_id=1, title='Kobe Bryant', description="Kobe Bryant, a basketball virtuoso, captivated fans with his dazzling moves and clutch performances, forever etching his name in the NBA's highlight reel.", url='https://www.basketballnetwork.net/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1280/MTk5NjcyODc5MjY3MTk0NDk2/kobe-bryant-1.jpg')
photo30 = Photo(user_id=2, title='Mbappe', description="Kylian Mbappe is a dynamic and prolific French footballer celebrated for his remarkable speed, technical prowess, and goal-scoring prowess, starring as a forward for Paris Saint-Germain and the French national team.", url='https://www.si.com/.image/t_share/MTk0NTM0NTEyNDY0NTA0NDMw/imago1020526123h.jpg')
photo31 = Photo(user_id=1, title='Caleb Williams', description="Is Caleb Williams going to be the number one overall pick?", url='https://ca-times.brightspotcdn.com/dims4/default/0ade082/2147483647/strip/true/crop/4404x4438+0+301/resize/1200x1209!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb9%2F5e%2F4db17d8e4eddac0f1e02cb67ce14%2F1375374-sp-usc-ucla-107-gmf.jpg')
photo32 = Photo(user_id=2, title='Caitlyn Clark', description="Caitlin Clark, an impressive American basketball player, exhibits exceptional skill, scoring ability, and court vision, contributing significantly to the University of Iowa Hawkeyes women's basketball team.", url='https://c8.alamy.com/comp/2NKM7BE/indianapolis-in-march-06-iowa-hawkeyes-guard-caitlin-clark-22-knocks-down-the-jump-shot-in-the-first-half-of-play-during-the-womens-big-ten-tournament-championship-game-between-the-indiana-hoosiers-and-the-iowa-hawkeyes-on-march-06-2022-at-gainbridge-fieldhouse-in-indianapolis-inphoto-by-jeffrey-brownicon-sportswire-icon-sportswire-via-ap-images-2NKM7BE.jpg')

# Adds a demo user, you can add other users here if you want
def seed_photos():

    all_photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12, photo13, photo14, photo15, photo16, photo17, photo18, photo19, photo20, photo21, photo22, photo23, photo24, photo25, photo26, photo27, photo28, photo29, photo30, photo31, photo32 ]
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
