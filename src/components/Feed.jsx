import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const [message,setMessage]=useState("");
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const getFeed=async()=>{
    try{
      if(feed) return;
      const res=await axios.get(BASE_URL+"/user/feed/",{withCredentials:true})
      console.log(res);
      if(res.data.user.length>0){
      dispatch(addFeed(res.data));
      }else{
        setMessage("No New Users Found");
      }
    }catch(error){
      console.log("ERROR:"+error.message);
    }
  }
  useEffect(()=>{getFeed()},[]);
  return feed ? (
    <div className='flex justify-center my-10 flex-wrap'>
      <UserCard user={feed.user[feed.user.length-1]}/>
    </div>
  ) : (<div className='text-1xl text-center my-10 '><h1>{message}</h1></div>)
}

export default Feed