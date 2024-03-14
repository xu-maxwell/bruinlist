let postvalue = document.getElementById("textarea");
let posttitle = document.getElementById("textareaTitle");
let successMessage = document.getElementById("successMessage");
let currentuser = "";
let uid;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if(user.emailVerified) {
            uid = user.uid
        } else {
            window.location.assign("../html/emailVerification.html")
        }
    } else {
        window.location.assign("../html/authentication.html")
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    currentuser = user
  })


var d = new Date();


function createpost() {
  if (postvalue.value !== "" && posttitle.value != "") {
    firebase
      .firestore()
      .collection("posts")
      .add({
        posttitle: posttitle.value,
        postvalue: postvalue.value,
        like: [],
        user: currentuser.email,
        comments: [],
        Date: `${d}`
      })
      .then((res) => {
        firebase
          .firestore()
          .collection("posts/")
          .doc(res.id)
          .update({
            id: res.id
          })
          .then(() => {
            successMessage.textContent = "Post successfully submitted.";
            successMessage.style.color = "green";
            setTimeout(() => {
              location.reload();
            }, 500);
          });
      });
  }
}

const logout = ()=>{
  firebase.auth().signOut().then(() => {
    window.location.assign("./authentication.html")
  })
}
