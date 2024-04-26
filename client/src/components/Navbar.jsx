import React ,{ useContext } from "react";
import {Link} from "react-router-dom";
import Logo from "../images/logo.png"
import { AuthContext } from "../context/authContext.jsx";

const Navbar = () => {

    const {currentUser,logout} = useContext(AuthContext); 

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                    <img className="image" src={Logo} alt=""/>
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=design">
                        <h5>Design</h5>
                    </Link>
                    <Link className="link" to="/?cat=technology">
                        <h5>Technology</h5>
                    </Link>
                    <Link className="link" to="/?cat=cars">
                        <h5>Cars</h5>
                    </Link>
                    <Link className="link" to="/?cat=infrastructure">
                        <h5>Infrastruture</h5>
                    </Link>
                    <Link className="link" to="/?cat=art">
                        <h5>Art</h5>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {currentUser ? 
                    (<span onClick={logout}>Logout</span>) : (<Link className="link" to="/login">Login</Link>)}
                    <span className="write">
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar