import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBApYDWCOmqIreu4qTSg4lMx1816-Ce_3w',
	authDomain: 'jalptech.firebaseapp.com',
	databaseURL: 'https://jalptech-default-rtdb.firebaseio.com',
	projectId: 'jalptech',
	storageBucket: 'jalptech.appspot.com',
	messagingSenderId: '873453340576',
	appId: '1:873453340576:web:25e9c98a3ba94cbb0446c5'
};

var actionCodeSettings = {
	url: 'https://www.jalpTechConfig.com/finishSignUp?cartId=1234',
	// This must be true.
	handleCodeInApp: true,
	dynamicLinkDomain: 'jalpTechConfig2.link'
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig, actionCodeSettings);
console.log(fire);

const firestore = firebase.firestore();

export { firestore };
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;
