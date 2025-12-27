import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';

const NavBar = () => {
  const userPhoto={
    male:"https://images.unsplash.com/photo-1640952131659-49a06dd90ad2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    female:"https://images.unsplash.com/photo-1653558368201-cf9d0b2a2c70?q=80&w=956&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    }catch(error){
      console.log("error"+error.message);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {user && (<div className='flex items-center'>
      <div className='welcome-message'>Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end mx-5 ">
        
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full flex">
          
          <img
            alt="User Photo"
            src={user?.photoUrl || (user?.gender === 'male' ? userPhoto.male : userPhoto.female)} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li>
          <Link to="/connections" className="justify-between">
            Connections
          </Link>
        </li>
        <li>
          <Link to="/requests" className="justify-between">
            Requests
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
    </div>)}
  </div>
</div>
  )
}

export default NavBar