import React, { useContext, useState } from "react";
import { initializeApp } from 'firebase/app';
import firebaseConfig from "./firebase.config";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,  updateProfile } from "firebase/auth";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

initializeApp(firebaseConfig);

const Login = () => {
    const [profile, setProfile]=useState({
        signUp: false,
        isSigndIn: false,
        name: "",
        email: "",
        password: "",
        photo: ""
      })

      const [loggedInUser, setLoggedInUser]=useContext(userContext);
      const history=useHistory();
      const location=useLocation();
      let { from } = location.state || { from: { pathname: "/" } };
      

      const [valid, setValid]=useState(true);
      const [logInValue, setLogInValue]=useState({
        email: "",
        password: ""
      })
      const [error, setError]=useState("")
    
      const provider = new GoogleAuthProvider();
      const handleSignInWithGoogle =()=>
      {
        setError("");
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then(result => {
        const user = result.user;
        const {displayName, photoURL, email}=user;
    
        const signdInUser=
        {
          isSigndIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setProfile(signdInUser);
        // console.log(displayName, photoURL, email);
      })
      .catch((error) => {
        
      });
      }
      const handleSignOutWithGoogle = ()=>
      {
        setError("");
        const auth = getAuth();
        signOut(auth)
        .then(() => {
        const signdInUser=
        {
          isSigndIn: false,
          name: "",
          email: "",
          photo: ""
        }
        setProfile(signdInUser);
        })
        .catch((error) => {
          // An error happened.
        });
      }
      const signUpClick = () =>
      {
        setError("");
        const isSignUp={
          signUp: true
        }
        setProfile(isSignUp)
      }
      const logInClick = () =>
      {
        setError("");
        const isSignUp={
          signUp: false
        }
        setProfile(isSignUp)
      }
      const getText = (e) =>
      {
        // console.log(e.target.name, e.target.value)
        let isFormValid=true;
        if(e.target.name==="email")
        {
          // console.log("email " +  e.target.value);
          isFormValid=/\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name==="password")
        {
          // console.log("password " +  e.target.value);
          const passLenght=e.target.value.length>=6;
          const containNumber=/\d{1}/.test(e.target.value);
          
          isFormValid=passLenght&&containNumber;
        }
        // console.log(isFormValid);
        if(isFormValid)
        {
          const userInfo={...profile};
          userInfo[e.target.name]=e.target.value;
          setProfile(userInfo);
          setValid(true);
        }
        else{setValid(false)}
      }
    
      const getTextLogIn=(e)=>
      {
        const newLogIn={...logInValue};
        if(e.target.name==="logInEmail")
        {
          newLogIn.email=e.target.value;
        }
        if(e.target.name==="logInPassword")
        {
          newLogIn.password=e.target.value;
        }
        setLogInValue(newLogIn);
      }
    
      const handleLogIn=(e)=>
      {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, logInValue.email, logInValue.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // console.log(user)
          setError("");
          const {displayName, photoURL, email}=user;
    
          const signdInUser=
          {
            isSigndIn: true,
            name: displayName,
            email: email,
            photo: photoURL
          }
          setLoggedInUser(signdInUser);
          setProfile(signdInUser);
          console.log(history);
          console.log(location);
          console.log( from );
          history.replace( from  );
        })
        .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
      });
        e.preventDefault();
      }
      const handleSignUp=(e)=>
      {
        if(profile.email&&profile.password)
        {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, profile.email, profile.password)
            .then((userCredential) => {
              // const user = userCredential.user;
              updateUserName(profile.name);
              // console.log(user);
              setError("");
              
            })
            .catch((error) => {
              // const errorCode = error.code;
              const errorMessage = error.message;
              setError(errorMessage);
              // ..
            });
            // e.preventDefault();
        }
        else
        {
          e.preventDefault();
        }
      }
      const updateUserName=name=>
      {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          // console.log("Name added")
        }).catch((error) => {
          console.log(error);
        });
      }
    
      return (
        <div style={{textAlign: 'center'}}>
          {
            !profile.signUp?
            <div>
              {
                !profile.isSigndIn && <div>
                <form>
                  <p>Log In</p>
                  <input type="text" name="logInEmail" onBlur={getTextLogIn} placeholder="Email" required />
                  <br/>
                  <input type="password" name="logInPassword" onBlur={getTextLogIn} placeholder="Password" required/>
                  <br/>
                  <input type="submit" onClick={handleLogIn}/>
                </form>
                {error&&<p style={{color:"red"}}>{error}</p>}
              </div>
            }
            {
              profile.isSigndIn&&
              <div>
                <h3>Welcome {profile.name}</h3>
                <p>Email: {profile.email}</p>
                {profile.photo&&<img src={profile.photo} alt=""></img>}
              </div>
            }
            
            {
              profile.isSigndIn ? 
              <button onClick={handleSignOutWithGoogle}>Sign Out</button>:
              <div>
                <p> Or <br/>Sign In With</p>
                <button onClick={handleSignInWithGoogle}>Google</button>
              </div>
            }
            <br/>
            <button onClick={signUpClick}>Sign Up</button>
            </div>:
            <div>
              <h1>Sign Up</h1>
              <form>
                  <input type="text" name="name" placeholder="Name" onBlur={getText} required/>
                  <br/>
                  <input type="text" name="email" placeholder="Email" onBlur={getText} required/>
                  <br/>
                  <input type="password" name="password" placeholder="Password" onBlur={getText} required/>
                  <br/>
                  {!valid&&<p style={{color: "red"}}>Enter a valid email and password</p>}
                  <input type="submit" onClick={handleSignUp}/>
                </form>
                {error&&<p style={{color:"red"}}>{error}</p>}
                <p>Or</p>
                <button onClick={logInClick}>Log In</button>
            </div>
          }
        </div>
      );
};

export default Login;