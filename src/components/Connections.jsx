import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

// ConnectionCard Component
const ConnectionCard = ({ connection }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = connection;
  
  return (
    <div className="card w-80 bg-base-100 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-success/20">
      {/* Image Section */}
      <figure className="relative h-64 overflow-hidden bg-gradient-to-br from-green-400 to-emerald-400">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Connected Badge */}
        <div className="absolute top-4 right-4">
          <div className="badge badge-success gap-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Connected
          </div>
        </div>
        
        {/* Name and Age Badge */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-white/90 text-base mt-1">
                  {age} • {gender}
                </p>
              )}
            </div>
          </div>
        </div>
      </figure>

      {/* Content Section */}
      <div className="card-body bg-gradient-to-b from-base-100 to-base-200 p-4">
        {/* About Section */}
        {about && (
          <div className="py-2">
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {about}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center gap-3 mt-2 pb-1">
          <button className="btn btn-outline btn-info btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
          <button className="btn btn-primary btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message
          </button>
        </div>
      </div>
    </div>
  )
}

const Connections = () => {
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
    
    useEffect(()=>{
        const fetchConnections=async()=>{
            try{
                const res=await axios.get(BASE_URL+"/user/requests/connections",{withCredentials:true});
                console.log(res);
                dispatch(addConnection(res.data.connections));
            }catch(error){
                console.log("ERROR:"+error);
            }
        }
        fetchConnections();
    },[dispatch]);
    if(!connections) return;

    if(connections.length===0) return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl font-semibold text-gray-600">No Connections Found</h1>
          <p className="text-gray-500 mt-2">Start connecting with developers!</p>
        </div>
      </div>
    );
  return connections && (
    <div className='flex justify-center my-10 flex-wrap gap-5'>
        {connections.map((connection)=>(
            <ConnectionCard key={connection._id} connection={connection}/>
        ))}
    </div>
  )
}

export default Connections