import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

const EditProfile = ({ user }) => {

    console.log(user);
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [genderDropDown,setGenderDropDown]=useState("Male");
    const dispatch = useDispatch();
    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                about,
                gender:genderDropDown,
                photoUrl
            }, { withCredentials: true });
            //TODO-Add Toast
            console.log(res);
            dispatch(addUser(res.data.user));
            toast.success("Profile Updated Successfully");
        } catch (Error) {
            toast.error(Error.response.data.message);
            console.log(Error);
        }
    }

    return (<div className='flex gap-5 justify-center my-2 h-fit'>
        <div className='flex justify-center mx-10 h-fit'>
            <div className="card bg-base-300 w-96 shadow-sm ">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2">
                            <div className='label'>
                                <span className='label-text text-white'>First Name</span>
                            </div>
                            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2">
                            <div className='label'>
                                <span className='label-text text-white'>Last Name</span>
                            </div>
                            <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2">
                            <div className='label'>
                                <span className='label-text text-white'>Age</span>
                            </div>
                            <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2">
                            <div className='label'>
                                <span className='label-text text-white'>About</span>
                            </div>
                            <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2">
                            <div className='w-ful h-10'>
                                
                                 <select className='w-full h-full bg-base-100 rounded-md px-2 capitalize'  value={genderDropDown} onChange={(e)=>setGenderDropDown(e.target.value)}>
                                        <option className='my-2' value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                </select>
                        </div>
                        </fieldset>
                        <fieldset className="form-control fieldset w-full max-w-xs py-2 ">
                            <div className='label'>
                                <span className='label-text text-white'>Photo URL</span>
                            </div>
                            <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary px-5" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-1/3'>
            <UserCard user={{ firstName, lastName, age, about, gender:genderDropDown, photoUrl }} />
        </div>
    </div>
    )
}

export default EditProfile