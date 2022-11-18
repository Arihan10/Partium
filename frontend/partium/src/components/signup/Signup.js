import { useState, useRef } from 'react'
import UserDataService from "../../services/user"
import './Signup.css'
import { Check, CheckCircleFill} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

function SignUp()
{
    const navigate = useNavigate(); 

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

                navigate("/login"); 
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="sign-up">
            <div className="sign-up-pane">
                <h1>Sign Up</h1>
                <div className="sign-in-fields">
                    <input type="input-bar" placeholder="Handle" value={handle} onChange={onChangeHandle}/>
                    <input type="text" placeholder="Full Name" value={name} onChange={onChangeName}/>
                    <input type="password" placeholder="Password" value={password} onChange={onChangePassword}/>
                    <button onClick={() => addUser({
                        handle: handle, 
                        name: name, 
                        password: password
                    })}>Sign Up</button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;