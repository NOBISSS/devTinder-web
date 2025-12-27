import React from 'react'

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card w-80 bg-base-100 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image Section */}
      <figure className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
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
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
              {about}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center gap-3 mt-2 pb-1">
          <button className="btn btn-error btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Ignore
          </button>
          <button className="btn btn-primary btn-md px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard