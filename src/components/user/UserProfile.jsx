import React, { useState, useEffect } from 'react';
import Form from '../Form';
import { useNavigate } from "react-router-dom";
const Profile = ({refreshing, setClassData, classData,setUser, user }) => {
  const navigate = useNavigate()

  useEffect(()=>{
    if(Object.keys(user).length < 5){
      navigate("/404")
      return
    }
  },[])

  return (
    <section className="section p-10 h-min-screen bg-gray-900 ">
      <h2 className="text-4xl font-bold text-yellow-500 text-center m--1 mb-4">Profile</h2>
      <Form refreshing={refreshing}  type={'updateUser'} setUser={setUser} user={user}/>
    </section>
  );
};

export default Profile;
