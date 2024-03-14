# Bruinlist
CS 35L Final Project, Winter 2024

The project has been hosted online using Netlify. The simple way of running and testing the project is going to https://bruinlist.netlify.app. 

To run the project locally, clone the project to your local machine. Inside the js directory of the project, add a file firebase.js. In the file, copy in the contents of the Javascript object provided. It should look like this:

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

Course Grader: replace the key values with the information we provided. Afterwards, open the html folder and drag and drop the index.html file to Google Chrome.
