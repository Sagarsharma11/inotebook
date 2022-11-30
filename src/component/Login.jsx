import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [cred, setCred] = useState({email:"",password:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(cred.email,cred.password)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({email: cred.email,password: cred.password})
        })

        const json = await response.json()

        if(json.success === true){
            // save the auth token and redirect
            localStorage.setItem('token',json.auth_token)
            navigate("/")       
            props.showAlert("You are successfully logged in","success")  

        }else{
            alert("Invalid.........")
            props.showAlert("Invalid credantials","danger") 
        }
        console.log(json)
    }
    const onChange =(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" value={cred.email} name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1"   className="form-label">Password</label>
                    <input type="password" onChange={onChange} value={cred.password} name="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login