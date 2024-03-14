firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if(user.emailVerified) {
            setTimeout(()=>{
                window.location.assign("./html/main.html")
            }, 350)
        } else {
            setTimeout(()=>{
                window.location.assign("./html/emailVerification.html")
            }, 350)
        }
    } else {
        setTimeout(()=>{
            window.location.assign("./html/authentication.html")
        }, 350)
    }
  });
