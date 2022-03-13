import React, { useEffect,useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout,UserName,picture,uuid,database,uStatus as status,readData } from "../Firebase/firebase";
import {ref,update} from 'firebase/database'
import './navBar.css'
const NavBar = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
    }, [user, loading]);
    useEffect(()=>{
        readData();
    },[]);
    var photo="";
    var name="Anonymous User";
    if(user?.isAnonymous){
         name = UserName;
         photo=picture;
    }else{
        name=user?.displayName;
        photo=user?.photoURL;
    }
    const [userStatus,setUserStatus]=useState(status);
    const handleStatusChange = (e) => {
        setUserStatus(e.target.value);
      };
    const handleSubmitChange = () => {
        update(ref(database,'users/'+uuid), {
          user_status:userStatus,
        });
      };
    return (
        <>
       <div className="navBar">
            <div className="navBar-lft">
                <input placeholder= {userStatus} value={userStatus} onChange={handleStatusChange}></input>
                <button onClick={handleSubmitChange}>Update</button>
            </div>
            <div className="navBar-rgt">
                <img src={photo} className='card-image'/>
               {name} <button onClick={logout}>Logout!</button>
            </div>
       </div>
        </>
    )
}

export default NavBar
