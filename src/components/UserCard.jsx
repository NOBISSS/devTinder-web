import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,photoUrl,age,gender,about}=user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='bg-red-400 h-1/5'>
    <img
      className='w-1/3 h-1/2'
      src={photoUrl}
      alt="User Picture" />
  </figure>
  <div className="card-body flex flex-col gap-5 capitalize">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <h1 className='bg-'>{age + " , "+gender}</h1>}
    <h1 className='bg-red-500 h-2'>{about}</h1>
    <div className="card-actions justify-center mt-5">
      <button className="btn btn-primary">Interested</button>
      <button className="btn btn-secondary">Ignoredd</button>
    </div>
  </div>
</div>
  )
}

export default UserCard