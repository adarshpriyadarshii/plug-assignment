import React, { useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, database, uuid,UserName,picture,uStatus,userData,DataCards } from "../../Firebase/firebase";
import { getDatabase, ref, child, get,onValue } from "firebase/database";
import NavBar from "../../components/navbar";
import UserBox from "../../components/userBox";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);
  var myUserId = uuid;
  //const user_ref=ref(database,'users/$' +{myUserId})
  const dbRef = ref(getDatabase());
 /*useEffect(() => {
    onValue(ref(dbRef, `users/${myUserId}`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((users) => {
          setUsers((oldArray) => [...oldArray, users]);
          
        });
        console.log(data.username);
      }
    });
  }, []);*/
  
  /*let name="";
  let picture="";
  get(child(dbRef, `users/${myUserId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      const data = snapshot.val();
     /* Object.values(data).map((users) => {
        setUsers((oldArray) => [...oldArray, users]);
        
      });
      name=snapshot.val().username;
      picture=snapshot.val().profile_picture;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });*/
  var photo="";
  var name="Anonymous User";
  if(user?.isAnonymous){
       name = UserName;
       photo=picture;
  }else{
      name=user?.displayName;
      photo=user?.photoURL;
  }
  /*Object.values(userData).map((users) => {
    setUsers((oldArray) => [...oldArray, users]);
    
  });*/
  return (
    <>
      <NavBar />
      <UserBox status={uStatus} name={name} photo={photo}/>
      
      
     
      
         
      
    </>
   /*{users.map((users) => (
        <>
          <UserBox status="Hello" name={users.username} photo={users.profile_picture}/>
          <UserBox status={uStatus} name={name} photo={photo}/>
           {userDataCards}
        </>
      ))}*/
      /*<div>
        {userData.map(DataCards)}
      </div>*/
  );
}
export default Dashboard;