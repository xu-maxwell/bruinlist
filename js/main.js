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
