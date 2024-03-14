document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("logged in")
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        const messageLoginElement = document.getElementById("messageLogin");
        const userData = {
            Email: loginEmail,
            Password: loginPassword
        }
        firebase.auth().signInWithEmailAndPassword(userData.Email, userData.Password)
        .then((userCredential) => {
            messageLoginElement.textContent = "Signed in successfully."
            messageLoginElement.style.color = "green"
            if (userCredential.user.emailVerified) {
                window.location.assign("../html/main.html")
            } else {
                window.location.assign("../html/emailVerification.html")
            }
        })
        .catch((error) => {
            messageLoginElement.textContent = error.message;
        });
    });

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Add signup validation logic here
        const signupEmail = document.getElementById("signupEmail").value;
        const signupPassword = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const messageElement = document.getElementById("message");

        if (signupPassword !== confirmPassword) {
            messageElement.textContent = "Passwords do not match";
            messageElement.style.color = "red";
        } else if (!signupEmail.match(regex)) {
            messageElement.textContent = "Please enter a valid email";
            messageElement.style.color = "red";           
        }
        else {
            messageElement.textContent = "Signed up successfully.";
            messageElement.style.color = "green";   
            firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
            .then((userCredential) => {
                var d = new Date().toLocaleDateString();
                const userData = {
                    Email: signupEmail,
                    Password: signupPassword,
                    ConfirmPassword: confirmPassword,
                    uid: userCredential.user.uid,
                    ProfilePicture: "",
                    Description: "",
                    Followers: [],
                    SignUpDate: `${d}`
                }
                firebase.firestore().collection("users").doc(userCredential.user.uid).set(userData).then((res)=>{
                    messageElement.textContent = "Account was successfully created."
                    messageElement.style.color = "green"

                    const user = firebase.auth().currentUser;
                    user.sendEmailVerification().then((res)=>{
                        setTimeout(()=>{
                            window.location.assign("../html/emailVerification.html")
                        }, 2000) 
                    })

                })
            })
            .catch((error) => {
              messageElement.textContent = error.message;
              messageElement.style.color = "red";   
            });
        }
    });

    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    loginTab.addEventListener("click", function () {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    });

    signupTab.addEventListener("click", function () {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
    });
});
