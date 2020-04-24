import firebase from "firebase/app";
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
  measurementId: "G-BERXWDX2H5",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //if use data is null it returns nothing
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);

//   const batch = firestore.batch();
//   objectsToAdd.forEach((obj) => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj)
//   });
//  return await batch.commit()
// }

export const convertCollectionsSnapshotToMap = (collectionSnapShot) => {
  const transformCollection = collectionSnapShot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();
    return {
      id: docSnapshot.id,
      title,
      items,
      routeName: encodeURI(title.toLowerCase())
    };
  });
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
