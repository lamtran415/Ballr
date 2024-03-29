# About Ballr:
![image](https://user-images.githubusercontent.com/114116854/222051065-d82cc0ed-882d-43c7-85f3-41201564b8f6.png)

Welcome to Ballr, a full-stack Flickr clone, your go-to photos place for all sport lovers. Browse and discover a list of photos from all different types of sports from all over the world. This is where you could find your inspiration and join the Ballr community to share your experience!

Live Site: [Ballr](https://ballr.onrender.com/)

Check out the Wiki links below:
* [API Routes](https://github.com/lamtran415/Ballr/wiki/API-Routes)
* [Database Schema](https://github.com/lamtran415/Ballr/wiki/Database-Schema)
* [Feature List](https://github.com/lamtran415/Ballr/wiki/Feature-List)
* [Redux Store Shape](https://github.com/lamtran415/Ballr/wiki/Redux-Store-Shape)
* [User Stories](https://github.com/lamtran415/Ballr/wiki/Redux-Store-Shape)
* [Wireframe](https://github.com/lamtran415/Ballr/wiki/Wireframe)

### This project is built with:
* Frontend: JavaScript, React/Redux
* Backend: Python, Flask
* Database: PostgreSQL, SQLAlchemy

# Features

## Log in/Demo User:
To test out the website, you must be logged in but you can test out the website by clicking the Demo User button.
![image](https://user-images.githubusercontent.com/114116854/222050870-13ec552b-06d6-4b3f-b144-f7506574d899.png)

## Sign Up
Sign up entering your first name, last name, email, and confirm password.
![image](https://user-images.githubusercontent.com/114116854/222051197-155426ee-4bdf-4cd0-91d6-8e7a710a894c.png)

## Photos Page
Once logged in, you are able to view all the photos avaiable on the website as well as click on each individual photo for more details.
![image](https://user-images.githubusercontent.com/114116854/227386597-f67407ce-e86d-40c4-8e86-fdc8f6abbe37.png)
![image](https://user-images.githubusercontent.com/114116854/227386697-efd879cd-4992-487f-8f04-e148634d36d3.png)

## Create a Photo
By clicking on the upload button on the top right hand corner, you are able to create a new photo utilizing AWS S3
![image](https://github.com/lamtran415/Ballr/assets/114116854/13d4a2cb-1aed-4e45-9041-f918c62fc5a0)


## Edit/Delete a Photo
As an owner of the photo, you are allowed to edit/delete your photo details on the individual photo page.
![image](https://github.com/lamtran415/Ballr/assets/114116854/46f987a7-d300-4184-b424-08c2dae2c1fd)
![image](https://user-images.githubusercontent.com/114116854/222051834-f9f6579f-e2f8-44cf-a0f0-396bcd83d300.png)

## View All Comments/Add a Comment
Each photo has a comment section where you are able to view all the comments as well as add your own comment
![image](https://user-images.githubusercontent.com/114116854/222052181-e5a58220-7c80-44bc-af3b-6b464c8ed688.png)

## Edit/Delete Comment
You are able to edit/delete your own comment by clicking on the edit or delete button in the comment container
![image](https://user-images.githubusercontent.com/114116854/222052386-70e78789-5806-4dd4-be37-1bbef5e165ed.png)
![image](https://user-images.githubusercontent.com/114116854/222052405-94d2f1ea-ad69-4a3b-8aac-21fd653eafe4.png)
This code snippet below is written in JSX and appears to be part of a larger React component that renders a comment section for a photo. It includes conditional rendering of an edit and delete button for each comment if the user viewing the page is the owner of the comment.

The state variable editingCommentId is used to track which comment is currently being edited, and when it is set to a comment's ID, the EditComment component is rendered in place of the actual comment text. This allows the user to edit their comment in place.

When editingCommentId is not equal to the comment's ID, the actual comment text is rendered instead. This allows the user to view the comments in their original state.
![image](https://user-images.githubusercontent.com/114116854/227388176-ad48b37b-d599-4c99-aeea-0f7205b71bd5.png)

## Albums
As a user, you are able to navigate to other user's albums as well as Create/Edit/Delete your own album
![image](https://user-images.githubusercontent.com/114116854/227385860-09865c76-0110-4b11-b6c8-07ec2d887bf2.png)

## Tags
You are able to view all tags on each photos and users are able to Create/Delete tags on their own photos
![image](https://user-images.githubusercontent.com/114116854/227387043-f9a30ac6-8f60-4a93-8d34-90f56c5c5b29.png)

## Search
You are able to search by photo titles using the search bar on the top right
![image](https://github.com/lamtran415/Ballr/assets/114116854/5c5a375b-31e0-403e-a7d5-65ff4b39834c)

## To Do List for Future Features
- Likes

# Getting Started:
1. Download the starter by cloning this repo.
   ```bash
   git clone https://github.com/lamtran415/Ballr
   ```
2. Install dependencies
   ```bash
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   ```bash
   SECRET_KEY=<your secret key>
   DATABASE_URL=sqlite:///dev.db
   SCHEMA=<your schema name>
   ```
4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```
5. Start frontend server in `react-app` directory
   ```bash
   npm install
   npm start
   ```
6. In your browser go to `localhost:3000`


## Contact information
- Email: austin415@ymail.com
- Linkedin: [Click here](https://www.linkedin.com/in/austin-lam-tran-93881a155/)



