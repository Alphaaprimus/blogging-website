import React,{ useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"
import { AuthContext } from "../context/authContext.jsx";

const Login = () => {

    const [input, setInput] = useState ({
        username:"",
        password:"",

    })
    const [err,setError] = useState(null) ;

    const navigate = useNavigate()

     const {login} = useContext(AuthContext); 

    //console.log(currentUser); 

    const handleChange = e =>{
        setInput(prev=>({...prev, [e.target.name]: e.target.value}))

    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{ 
           // console.log("working")
         //await axios.post("http://localhost:8800/api/auth/login", input)
        await login(input)
        navigate("/")
        
        
        }catch(err){
           // console.log("after path")
            //console.log(err.response)
            setError(err.response.data);
            
        }
    }


    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}>login</button>
                {err &&<p>{err}</p>}
                <span>Don't have an account?<Link to="/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login 