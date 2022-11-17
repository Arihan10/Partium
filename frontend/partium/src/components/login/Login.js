import { useState, useRef } from 'react'
import UserDataService from "../../services/user"
import EventView from '../eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import './Login.css'
import { Arrow90degRight, ArrowBarRight, Search } from 'react-bootstrap-icons'

function Login()
{
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

                localStorage.setItem("userHandle", data.handle); 
                console.log(localStorage.getItem("userHandle")); 
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className='pane'>
            <div className='loginTitle'>
                <h1>LOGIN</h1>
            </div>
            <div className="search-bar loginSearch">
                <input type="text" placeholder="Handle" value={handle} onChange={onChangeHandle}/>
                <input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                <button className='loginBtn' onClick={() => verifyUser({
                    handle: handle, 
                    password: password
                })}><Arrow90degRight /></button>
            </div>
        </div>
    );
}

export default Login;