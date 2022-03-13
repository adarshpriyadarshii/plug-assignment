import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInAnonymously,signOut,} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {getDatabase, set, ref,onValue} from 'firebase/database';
import { uid } from "uid";
import UserBox from "../components/userBox";
const firebaseConfig = {
  apiKey: "AIzaSyClLnqeJI_dvvisbr-uA8rIVEFof0S0kO8",
  authDomain: "plug-app-e5fe5.firebaseapp.com",
  databaseURL: "https://plug-app-e5fe5-default-rtdb.firebaseio.com",
  projectId: "plug-app-e5fe5",
  storageBucket: "plug-app-e5fe5.appspot.com",
  messagingSenderId: "11800098371",
  appId: "1:11800098371:web:962810eba8ba29b34fc6f6"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
function writeUserData(userId, name, email, imageUrl,status,upVote,downVote) {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl,
    user_status:status,
    up:upVote,
    down:downVote,
    id:userId,
  });
}
var uuid="";
let userData;
const readData=()=>{
  const dRef=ref(database,'users/');
  let data;
  onValue(dRef, (snapshot) => {
    if(snapshot.exists){
      data = snapshot.val();
      //console.log(data);
      userData=data;
      console.log(userData);
    }
     
    //return data;
  });
}
/*const userDataCards =()=>{
  userData &&
  userData.map(uuid => {
    uuid.map(user=>{
      return (
        <UserBox
          photo={user.profile_picture}
          name={user.username}
          status={user.user_status}
        />
      );
    })
  });
}*/
function DataCards(user){
  return (
    <UserBox
      key={user.id}
      photo={user.profile_picture}
      name={user.username}
      status={user.user_status}
    />
  );
}
   
let uStatus="Hi, I am using this App";
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
     uuid=user.uid;
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    writeUserData(uuid,user.displayName,user.email,user.photoURL,uStatus,0,0);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
const signin = () => {
  signInAnonymously(auth);
  AnonymousUserData();
}
let UserName="";
let picture="";
async function AnonymousUserData() {
  let response = await fetch('https://randomuser.me/api/');
  let data = await response.json();
  UserName=data?.results[0].name.first +" "+ data?.results[0].name.last;
  picture= data?.results[0].picture.medium;
  let Email= data?.results[0].email;
  uuid=uid();
  console.log(data);
  console.log(UserName);
  writeUserData(uuid,UserName,Email,picture,uStatus,0,0);
}


  
export {
  auth,
  db,
  database,
  signInWithGoogle,
  logout,
  signin,
  AnonymousUserData,
  readData,
  uuid,
  UserName,
  picture,
  uStatus,
  DataCards,
  userData,
};