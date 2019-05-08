import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDZsjINu9aerw6itaCwwayaR1C7isSfKXk",
    authDomain: "proj1-798c4.firebaseapp.com",
    databaseURL: "https://proj1-798c4.firebaseio.com",
    projectId: "proj1-798c4",
    storageBucket: "proj1-798c4.appspot.com",
    messagingSenderId: "332847525454"
  };
  
  
  firebase.initializeApp(config);
      
  

  export default firebase;