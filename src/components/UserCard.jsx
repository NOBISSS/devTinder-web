import React from 'react'

const UserCard = ({user}) => {
    console.log(user);
    const {firstName,lastName,photoUrl,age,gender,about}=user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='bg-red-400 h-1/2 w-full'>
    <img
      className='h-full w-full'
      src={photoUrl}
      alt="User Picture" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + ", "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Interested</button>
      <button className="btn btn-secondary">Ignored</button>
    </div>
  </div>
</div>
  )
}

export default UserCard