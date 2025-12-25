import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId,setEmailId]=useState("henry123@gmail.com");
    const [password,setPassword]=useState("Henry@123");
    const [error,setError]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogin=async()=>{
        try{
            const res=await axios.post(
                BASE_URL+"/login",
                {
                emailId,
                password
            },
            {withCredentials:true});
            dispatch(addUser(res.data.user));
            navigate("/feed");
        }catch(error){
            setError(error?.response?.data?.message || "Something Went Wrong");
            console.log("ERROR"+error.message);
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm ">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Email ID</span>
                            </div>
                            <input type="text" className="input" value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Password</span>
                            </div>
                            <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </fieldset>
                    </div>
                    <p className='text-red-400' id="LOGIN-ERROR">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary px-5" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login