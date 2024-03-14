# <img src="https://bruinlist.netlify.app/bruinlistlogo.png" alt="Bruinlist Logo" width="200"/>

## Description
CS 35L Final Project, Winter 2024. Made by Sierra Stevenson, Jiho Shin, Maxwell Xu, and Wren Xu. <br>
Bruinlist is a centralized discussion platform that aims to serve the Bruin community. 
GitHub Repository: https://github.com/xu-maxwell/bruinlist

## Features
### Dynamic Data
When a user makes a post on a forum, the webpage will change in response to the new content. Every user on the platform will then be able to view this post and its content. In addition, when users like and comment on posts, the associated numerical values on the webpage will change in response.

### Back-end
After the user posts content, the content of the post will be uploaded to our database which will be stored securely on the cloud. 

### Searching
Users can utilize our search bar to search through the posts on the website and narrow it down to what the user may wish to see. This data will be retrieved and queried from our database. Searching properties may include keywords and associated tags within the post content. 

### User Authentication
To use the platform, users must create an account, verify their email, and log in to the platform. Each post is publicly associated with a user.

### Liking and Disliking Posts
Users can like and comment on posts based on their reactions to the content.

### User Profiles
Users can visit a list of all user profiles and query through them. Users can also elect to "upvote" profiles as many times as they wish.

## Running the Application
The project has been hosted online using Netlify. The simple way of running and testing the project is going to https://bruinlist.netlify.app. 

To run the project locally, clone the project to your local machine. Inside the ```js``` directory of the project folder, add a file ```firebase.js```. In the file, copy in the contents of the JavaScript object provided. It should look like this:
```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

Course Grader: replace the key values with the information we provided. Afterward, open the ```html``` directory in the project folder and drag and drop the ```index.html``` file to Google Chrome.
