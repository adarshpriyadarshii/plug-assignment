import React, { useState } from "react";
import { uuid,database } from "../Firebase/firebase";
import {ref,update} from 'firebase/database'
import "./userBox.css"

const UserBox = (props) => {
  var [upCount,setUpCount]=useState(0);
  var [downCount,setDownCount]=useState(0);
  var [isClicked,setIsClicked]=useState(false);
  function downChange(){
    if(!isClicked){
      setDownCount(downCount=downCount+1);
      handleSubmitChange();
      setIsClicked(true);
    }
  }
  function upChange(){
    if(!isClicked){
      setUpCount(upCount=upCount+1);
      handleSubmitChange();
     setIsClicked(true);
    }
  }
  const handleSubmitChange = () => {
    update(ref(database,'users/'+uuid), {
      up:upCount,
      down:downCount,
    });
  };
  return (
      <div className='card'>
          <div className='card-item'>
            <img src={props.photo} className='card-image'/>
          </div>
          <div className='card-item'>
            <h4><b>{props.name}</b></h4> 
            <p>{props.status}</p>
            <button className='card-btn-lft' onClick={upChange} disabled={isClicked}>Thumbs Up! ({upCount})</button> <button className='card-btn-rgt' onClick={downChange} disabled={isClicked}>Thumbs Down! ({downCount})</button>
          </div>
      </div>
  )
}

export default UserBox