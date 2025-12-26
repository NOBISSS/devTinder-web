import React, { useState } from 'react'
import UserCard from './UserCard';

const EditProfile = ({user}) => {
    console.log(user);
    const [firstName,setFirstName]=useState(user?.firstName);
    const [lastName,setLastName]=useState(user?.lastName);
    const [age,setAge]=useState(user?.age);
    const [gender,setGender]=useState(user?.gender);
    const [about,setAbout]=useState(user?.about);
    const [photoUrl,setPhotoUrl]=useState(user?.photoUrl);

    const [emailId,setEmailId]=useState("henry123@gmail.com");
    const [password,setPassword]=useState("Henry@123");
    const [error,setError]=useState("");
  return (<div className='flex gap-5  justify-center my-10'>
    <div className='flex justify-center mx-10'>
            <div className="card bg-base-300 w-96 shadow-sm ">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>First Name</span>
                            </div>
                            <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Last Name</span>
                            </div>
                            <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Age</span>
                            </div>
                            <input type="text" className="input" value={age} onChange={(e)=>setAge(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>About</span>
                            </div>
                            <input type="text" className="input" value={about} onChange={(e)=>setAbout(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Gender</span>
                            </div>
                            <input type="text" className="input" value={gender} onChange={(e)=>setGender(e.target.value)}/>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-4">
                            <div className='label'>
                                <span className='label-text text-white'>Photo URL</span>
                            </div>
                            <input type="text" className="input" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>
                        </fieldset>
                    </div>
                    <p className='text-red-400' id="LOGIN-ERROR">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary px-5" onClick={()=>console.log("HELLO")}>Save Profile</button>
                    </div>
                </div>
            </div>
    </div>
    <UserCard user={{firstName,lastName,age,about,gender,photoUrl}}/>
    </div>
  )
}

export default EditProfile