import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signup() {

  const [cred, setCred] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
    })

    const json = await response.json()
    console.log(json)
    if (json.success === true) {
      // save the auth token and redirect
      localStorage.setItem('token', json.auth_token)
      navigate("/login")
    } else {
      alert("Invalid.........")
    }
    // console.log(json)
  }
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange} name="password" required minLength={5} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" onChange={onChange} required minLength={5}  id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup