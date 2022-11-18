import { useState, useRef, useEffect } from 'react';
import { loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum';
import EventView from '../eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import UserDataService from "../../services/user"
import './UserFeed.css'

function EventPost({user, pfp, title, description})
{
    return(
        <div className="feed-event">
            <div className="poster-strip">
                <img src={pfp}/>
            </div>

            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

function UserFeed()
{
    const [toggle, setToggle] = useState(false);
    const [userHandle, setUserHandle] = useState(""); 

    useEffect(() => {
        setUserHandle(localStorage.getItem("userHandle")); 
        reloadFeed();
    }, []);

    const reloadFeed = () =>
    {
        console.log(userHandle)
        UserDataService.getUserEventsByHandle(userHandle);
    };

    //<button onClick={() => {setToggle(!toggle)}} className="test-btn">Open</button>
    return (
        <>
            <div className="feed">
                <EventPost user={name()} pfp="pfp.jpg" title="Title" description={loremIpsum({p : 1})} />
            </div>

            <CSSTransition in={toggle} timeout={300} classNames="transitiontest" unmountOnExit mountOnEnter>
                <div>
                    <EventView toggle={toggle} setToggle={setToggle} />
                </div>
            </CSSTransition>
        </>
    );
}

export default UserFeed;