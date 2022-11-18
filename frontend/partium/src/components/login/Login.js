import { useState, useRef } from 'react'
import UserDataService from "../../services/user"
import './Login.css'
import { useNavigate } from "react-router-dom";

function Login()
{
    const navigate = useNavigate(); 

    const [handle, setHandle] = useState("");
    const [password, setPassword] = useState(""); 

    const onChangeHandle = e => {
        setHandle(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const verifyUser = (data) => {
        UserDataService.verifyUserPassword(data)
            .then(response => {
                console.log(data); 
                console.log(response.data); 

                if (response.data == true) {
                    localStorage.setItem("userHandle", data.handle); 
                    console.log(localStorage.getItem("userHandle")); 

                    navigate("/"); 
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="log-in">
            <div className="log-in-pane">
                <h1>LOGIN</h1>
                <div className="log-in-fields">
                    <input type="text" placeholder="Handle" value={handle} onChange={onChangeHandle}/>
                    <input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                    <button className='loginBtn' onClick={() => verifyUser({
                        handle: handle, 
                        password: password
                    })}>Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Login;