firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      if(user.emailVerified) {

      } else {
          setTimeout(()=>{
              window.location.assign("./emailVerification.html")
          }, 300)
      }
  } else {
      setTimeout(()=>{
          window.location.assign("./authentication.html")
      }, 300)
  }
});


const logout = ()=>{
  firebase.auth().signOut().then(() => {
    window.location.assign("./authentication.html")
  })
}



document.addEventListener('DOMContentLoaded', function () {
  // Reference to the "users" collection in Cloud Firestore
  var usersRef = firebase.firestore().collection('users');

  // Function to fetch and display all users
  function displayUsers(users) {
    var userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear existing user list

    users.forEach(function (user) {
        var userElement = document.createElement('div');
        userElement.classList.add('list-group-item');
        userElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">${user.Email}</h5>
                </div>
                <div>
                    <button class="btn btn-primary follow-btn" data-user-id="${user.uid}">Upvote</button>
                    <button class="btn btn-secondary view-profile-btn" data-user-id="${user.uid}">View Profile</button>
                </div>
            </div>
        `;
        userList.appendChild(userElement);
    });

    // Add event listeners to follow buttons
    var followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var userId = button.getAttribute('data-user-id');
            // Call a function to handle follow action
            handleFollow(userId);
        });
    });

    var viewProfileButtons = document.querySelectorAll('.view-profile-btn');
    viewProfileButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var userId = button.getAttribute('data-user-id');
            // Call a function to view the user's profile
            viewProfile(userId);
        });
    });
    
}

    // Function to handle the "View Profile" button click
    function viewProfile(userId) {
      usersRef.doc(userId).get().then(function (doc) {
          if (doc.exists) {
              var userData = doc.data();
              var userProfile = document.getElementById('userProfile');
              userProfile.innerHTML = `
                  <p><strong>Email:</strong> ${userData.Email}</p>
                  <p><strong>Upvotes:</strong> ${userData.Followers.length}</p>
                  <p><strong>Sign Up Date:</strong> ${userData.SignUpDate}</p>
              `;
          } else {
              console.log("No such document!");
          }
      }).catch(function (error) {
          console.error("Error getting user profile:", error);
      });
  }
