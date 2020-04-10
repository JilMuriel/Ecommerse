import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

firestore
  .collection("user")
  .doc("NHpB2IhyMFSB2ZibcWQl")
  .collection("cartItems");
