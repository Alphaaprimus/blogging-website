import { createContext, useState , useEffect} from "react";
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)


    const login = async(input) =>{
        
        const res = await axios.post("http://localhost:8800/api/auth/login", input, { withCredentials: true });
        //console.log(input)
        setCurrentUser(res.data)

    }; 

    const logout = async(input) =>{
        await axios.post("http://localhost:8800/api/auth/logout");
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