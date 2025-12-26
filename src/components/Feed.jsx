import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const getFeed=async()=>{
    try{
      if(feed) return;
      const res=await axios.get(BASE_URL+"/user/feed/",{withCredentials:true})
      console.log(res);
      dispatch(addFeed(res.data));
    }catch(error){
      console.log("ERROR:"+error.message);
    }
  }
  useEffect(()=>{getFeed()},[]);
  return feed && (
    <div className='flex justify-center my-10 flex-wrap'>
      {/* {
      feed.user.map((user)=>(
        <UserCard user={user}/>
      ))
    } */}
      <UserCard user={feed.user[feed.user.length-1]}/>
    </div>
  )
}

export default Feed