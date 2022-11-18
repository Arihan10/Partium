import { useState, useRef, useEffect } from 'react';
import { loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum';
import EventView from '../eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import UserDataService from "../../services/user"
import './UserFeed.css'

function EventPost({username, handle, pfp, title, description})
{
    return(
        <div className="feed-event">
            <div className="poster-strip">
                <img className="pfp" src={pfp}/>
                <div className="user-info">
                    <h1>{handle}</h1>
                    <p>@{handle}</p>
                </div>
                <h2>{title}</h2>
            </div>
            <div className="event-desc-preview">
                <div className="description">
                    <p>{description}</p>
                </div>
                <div className="gradient-overlay"></div>
            </div>
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
                <EventPost user={name()} handle={"handle"} pfp="pfp.jpg" title="Title" description={loremIpsum({p : 5})} />
                <EventPost user={name()} handle={"handle"} pfp="pfp.jpg" title="Title" description={loremIpsum({p : 5})} />
                <EventPost user={name()} handle={"handle"} pfp="pfp.jpg" title="Title" description={loremIpsum({p : 5})} />
                <EventPost user={name()} handle={"handle"} pfp="pfp.jpg" title="Title" description={loremIpsum({p : 5})} />
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