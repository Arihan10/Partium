import { useState, useRef } from 'react'
import UserDataService from "../../services/user"
import EventView from '../eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import './Signup.css'
import { Arrow90degRight, ArrowBarRight, Search } from 'react-bootstrap-icons'

function SignUp()
{
    const [handle, setHandle] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState(""); 

    const onChangeHandle = e => {
        setHandle(e.target.value);
    }

    const onChangeName = e => {
        setName(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const addUser = (data) => {
        UserDataService.createUser(data)
            .then(response => {
                console.log(data); 
                console.log(response.data); 
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className='pane'>
            <div className='signUpTitle'>
                <h1>SIGN UP FOR ALL!!!</h1>
                <h6>*must be indian</h6>
            </div>
            <div className="search-bar signUpSearch">
                <input type="text" placeholder="Handle" value={handle} onChange={onChangeHandle}/>
                <input type="text" placeholder="Full Name" value={name} onChange={onChangeName}/>
                <input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                <button className='signUpBtn' onClick={() => addUser({
                    handle: handle, 
                    name: name, 
                    password: password
                })}><Arrow90degRight /></button>
            </div>
        </div>
    );
}

export default SignUp;