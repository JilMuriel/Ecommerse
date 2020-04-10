import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCbS2Cqyp_eUmWJyL0cXg9O5ptJB44xyCw",
  authDomain: "ecommerse-62eda.firebaseapp.com",
  databaseURL: "https://ecommerse-62eda.firebaseio.com",
  projectId: "ecommerse-62eda",
  storageBucket: "ecommerse-62eda.appspot.com",
  messagingSenderId: "1065947745193",
  appId: "1:1065947745193:web:e14f6d3adb6ab07d0512b8",
  measurementId: "G-BERXWDX2H5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //if use data is null it returns nothing
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};



const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
