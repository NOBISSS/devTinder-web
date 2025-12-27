import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { toast } from 'react-toastify';

// RequestCard Component
const RequestCard = ({ request, review }) => {
    const status={
        accept:"accepted",
        reject:"rejected"
    }
    console.log("REQUEST::",request);
    
  const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId || {};
  
  return (
    <div className="card w-80 bg-base-100 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-warning/20">
      {/* Image Section */}
      <figure className="relative h-64 overflow-hidden bg-gradient-to-br from-orange-400 to-amber-400">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Pending Request Badge */}
        <div className="absolute top-4 right-4">
          <div className="badge badge-warning gap-2 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending
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
          <button 
            onClick={() => review(status.reject,request._id)}
            className="btn btn-error btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject
          </button>
          <button 
            onClick={() => review(status.accept,request._id)}
            className="btn btn-success btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
                dispatch(addRequest(res.data.connectionRequest));
            } catch (error) {
                console.log("ERROR:" + error);
            }
        }
        fetchRequests();
    }, [dispatch]);

    const HandleReview=async(status,requestId)=>{
        try{
            await axios.post(BASE_URL+`/request/review/${status}/${requestId}`,{},{withCredentials:true});
            dispatch(removeRequest(requestId));
            toast.success(status === "accepted" ? "Request accepted!" : "Request rejected");
        }catch(error){
            toast.error(error?.response?.data?.message || "Failed to update request");
            console.log("ERROR:" + error);
        }
    }

    if (requests === null) return null;

    if (!requests || requests.length === 0) return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-semibold text-gray-600">No Pending Requests</h1>
          <p className="text-gray-500 mt-2">You're all caught up!</p>
        </div>
      </div>
    );

    return (
        <div className='flex justify-center my-10 flex-wrap gap-5'>
            {requests.map((request) => (
                <RequestCard 
                    key={request._id} 
                    request={request}
                    review={HandleReview}
                />
            ))}
        </div>
    )
}

export default Requests