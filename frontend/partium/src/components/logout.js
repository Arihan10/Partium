import { useState, useRef, useEffect } from 'react'
import UserDataService from "../services/user"
import './login/Login.css'
import { useNavigate } from "react-router-dom";

function Logout()
{
    const navigate = useNavigate(); 

    useEffect(() => {
        logoutUser();
    }, [])

    const logoutUser = () => {
        localStorage.setItem("userHandle", ""); 
        console.log("User logged out!"); 
        navigate("/login"); 
    }

    return (
        <div className="log-in">
            <div className="log-in-pane">
                <h1>LOGGED OUT</h1>
            </div>
        </div>
    );
}

export default Logout;