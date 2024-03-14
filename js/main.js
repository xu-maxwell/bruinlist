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
    // Other existing code...

    // Reference to the search button and input field
    var searchButton = document.getElementById('searchButton');
    var searchInput = document.getElementById('searchInput');

    // Event listener for the search button
    searchButton.addEventListener('click', function () {
        var keyword = searchInput.value.trim().toLowerCase(); // Get the search keyword

        // Filter posts based on the keyword
        var filteredPosts = [];
        postsRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var post = doc.data();
            if (post.postvalue.toLowerCase().includes(keyword)) {
            filteredPosts.push(post);
            }
        });
        displayPosts(filteredPosts); // Display filtered posts
        }).catch(function (error) {
        console.error("Error searching posts:", error);
        });
    });
  
    // Reference to the "posts" collection in Cloud Firestore
    var postsRef = firebase.firestore().collection('posts').orderBy("Date", "asc");
  
    // Function to display posts on the forum
    function displayPosts(posts) {
      var forumList = document.querySelector('.list-group');
      forumList.innerHTML = ''; // Clear existing posts
      posts.reverse();
  
      posts.forEach(function (post) {
        var postElement = document.createElement('a');
        postElement.href = '#';
        postElement.classList.add('list-group-item', 'list-group-item-action');
  
        var titleElement = document.createElement('h5');
        titleElement.classList.add('mb-1');
        titleElement.textContent = post.posttitle;
  
        var contentElement = document.createElement('p');
        contentElement.classList.add('mb-1');
        contentElement.textContent = post.postvalue;
  
        var postedByElement = document.createElement('small');
        postedByElement.textContent = 'Posted by: ' + post.user;

        var postedDateElement = document.createElement('small');
        postedDateElement.textContent = 'Post Date: ' + post.Date;
  
        var commentsList = document.createElement('div');
        commentsList.classList.add('card-footer', 'bg-transparent', 'border-top-0');
        
        var commentsList = document.createElement('div');
        commentsList.classList.add('card-footer', 'bg-transparent', 'border-top-0');
        
        // Add header for comments
        var commentsHeader = document.createElement('h6');
        commentsHeader.textContent = 'Comments';
        commentsList.appendChild(commentsHeader);
        
        post.comments.forEach(function(comment, index) {
            var commentElement = document.createElement('p');
            commentElement.classList.add('mb-0');
            commentElement.textContent = comment;
            
            // Add border-bottom style to separate comments
            if (index !== post.comments.length - 1) {
                commentElement.style.borderBottom = '1px solid #dee2e6';
                commentElement.style.paddingBottom = '5px'; // Adjust spacing if needed
            }
            
            commentsList.appendChild(commentElement);
        });
        
        


        // Like, Dislike, and Comment Buttons
        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('mt-2');
  
        var likeButton = createButton('btn-outline-success', 'fas fa-thumbs-up', ' Like (' + post.like.length + ')', function () {
          handleLike(post.id);
        });
  
  
        var commentButton = createButton('btn-outline-primary', 'fas fa-comment', ' Comment (' + post.comments.length + ')', function () {
          handleComment(post.id);
        });
  
        buttonsDiv.appendChild(likeButton);
        buttonsDiv.appendChild(commentButton);
  
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
        postElement.appendChild(postedByElement);
        postElement.appendChild(document.createElement('br'));
        postElement.appendChild(postedDateElement);
        postElement.appendChild(buttonsDiv);
        if (post.comments.length > 0) {
            postElement.appendChild(commentsList); // Append comments
        }
        forumList.appendChild(postElement);
      });
    }

    // Function to create a button element
    function createButton(className, iconClass, text, clickHandler) {
      var button = document.createElement('button');
      button.type = 'button';
      button.classList.add('btn', 'btn-sm', className, 'mr-2');
      button.innerHTML = '<i class="' + iconClass + '"></i>' + text;
      button.addEventListener('click', clickHandler);
      return button;
    }
  
    // Function to handle the "Like" button click
    function handleLike(postId) {
        var user = firebase.auth().currentUser;
        if (user) {
          var userId = user.uid;
          var postRef = firebase.firestore().collection('posts').doc(postId);
          postRef.get().then(function(doc) {
            if (doc.exists) {
              var postData = doc.data();
              var likes = postData.like || []; // Get current likes or initialize empty array
              var likeIndex = likes.indexOf(userId);
              if (likeIndex === -1) {
                // User has not liked the post, add their ID to the like array
                likes.push(userId);
              } else {
                // User has already liked the post, remove their ID from the like array
                likes.splice(likeIndex, 1);
              }
              // Update Firestore document with the modified like array
              return postRef.update({ like: likes });
            }
          }).then(function() {
            // Fetch and display updated posts after like/dislike
            postsRef.get().then(function(querySnapshot) {
              var posts = [];
              querySnapshot.forEach(function(doc) {
                posts.push(doc.data());
              });
              displayPosts(posts);
            });
          }).catch(function(error) {
            console.error("Error updating post:", error);
          });
        } else {
          // User is not logged in, handle this case as needed
          console.log("User is not logged in");
        }
    }
  

  
    // Function to handle the "Comment" button click
    function handleComment(postId) {
        // Assuming you have a prompt to get the comment text from the user
        var commentText = prompt("Enter your anonyous comment:");

        if (commentText !== null && commentText.trim() !== "") {
            // Reference to the specific post document in Firestore
            var postDocRef = firebase.firestore().collection('posts').doc(postId);

            // Update the "comments" array field in Firestore with the new comment
            postDocRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion(commentText)
            })
            .then(function() {
            // Success: Reload the posts to reflect the new comment
            // You may choose to reload only the specific post instead of all posts
            postsRef.get().then(function(querySnapshot) {
                var posts = [];
                querySnapshot.forEach(function(doc) {
                posts.push(doc.data());
                });
                displayPosts(posts);
            });
            })
            .catch(function(error) {
            console.error("Error adding comment: ", error);
            // Handle error here, such as showing an alert to the user
            });
        }
    }
    // Function to search posts based on keyword
    function searchPosts(keyword) {
        postsRef.where("postvalue", "==", keyword).get().then(function (querySnapshot) {
            var posts = [];
            querySnapshot.forEach(function (doc) {
                posts.push(doc.data());
            });
            displayPosts(posts);
        }).catch(function (error) {
            console.error("Error searching posts:", error);
        });
    }

    // Handle search button click
    var searchButton = document.querySelector('.input-group-append button');
    searchButton.addEventListener('click', function () {
        var keyword = document.querySelector('.form-control').value.trim();
        if (keyword !== '') {
            searchPosts(keyword);
        } else {
            // If no keyword entered, display all posts
            postsRef.get().then(function (querySnapshot) {
                var posts = [];
                querySnapshot.forEach(function (doc) {
                    posts.push(doc.data());
                });
                displayPosts(posts);
            });
        }
    });

    // Fetch and display posts on page load
    postsRef.get().then(function (querySnapshot) {
      var posts = [];
      querySnapshot.forEach(function (doc) {
        posts.push(doc.data());
      });
      displayPosts(posts);
    });
  });
  
