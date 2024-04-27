import { createContext, useState , useEffect} from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)


    const login = async(input) =>{
        
        const res = await axios.post("http://localhost:8800/api/auth/login", input, { withCredentials: true });
        console.log("inside authcontext login")
        console.log(res)
        
        setCurrentUser(res.data)

    }; 

    const logout = async(input) =>{
        //console.log(input)
        const res = await axios.post("http://localhost:8800/api/auth/logout",null,{ withCredentials: true });
        // console.log("inside authcontext logout")
         //console.log(res)
        setCurrentUser(null)

    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]) 

    return (
        <AuthContext.Provider value={{ currentUser, login ,logout}}>
            {children}
            </AuthContext.Provider>
    )

};