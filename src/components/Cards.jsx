import React from 'react'

const Cards = ({user}) => {
  
 //  console.log(user);
 
 const {firstName , lastName , age , gender ,  about , skills , image} = user;
 
  return (
     <div className="card bg-base-200 w-96 shadow-sm border-2 border-gray-800 ">
      <figure>
        <img
          src= {image}
          alt="Person Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
         <p>{about}</p>
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center my-4  ">
          <button className="btn btn-primary ">Ignored</button>
          <button className="btn btn-secondary ">Interested</button>
        </div>
      </div>
    </div>
  )
}

export default Cards