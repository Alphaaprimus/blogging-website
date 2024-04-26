import React, {useState} from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const [input, setInput] = useState ({
        username:"",
        email:"",
        password:"",

    })
    const [err,setError] = useState(null) ;

    const navigate = useNavigate()

    const handleChange = e =>{
        setInput(prev=>({...prev, [e.target.name]: e.target.value}))

    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
        await axios.post("http://localhost:8800/api/auth/register", input)
        navigate("/login")
        //console.log(res)
        }catch(err){
            setError(err.response.data);
            
        }
    }
    return (
        <div className="auth"> 
            <h1>Register</h1>
            <form>
                <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
                <input required type="email" placeholder="email" name="email"onChange={handleChange}/>
                <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}>login</button>
                {err &&<p>{err}</p>}
                <span>Do you have an account?<Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register 