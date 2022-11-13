import "./EventView.css"
import React, { useState } from "react";
import { loremIpsum, name, surname, fullname, username } from 'react-lorem-ipsum';
import dayjs from "dayjs";
import { Check } from 'react-bootstrap-icons';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

function UserPane()
{
    return(
        <a className="user-pane" href="https://youtube.com/c/frostbiiten">
                <div className="pfp">
                    <img src="pfp.jpg"></img>
                </div>
                <div className="user-info">
                    <h1>Frostbiiten</h1>
                    <p>@frostbiiten</p>
            </div>
        </a>
    );
}

function TimePane()
{
    let eventTime = 1670291200; // placeholder
    return(<p> In <b>{dayjs.unix(eventTime).fromNow(true)}</b></p>);
}

function HeaderPane()
{
    return(
        <div className="header-pane">
            <h1>Event name</h1>
            <TimePane/>
            <UserPane/>
        </div>
    );
}

function EventContent()
{
    return (
        <div className="event-content">
            <p>{loremIpsum({p : 6})}</p>
        </div>
    );
}

export default function EventView() {
    const [active, setActive] = useState(true)

    if (active)
    {
        return (
            <>
                <div className="backdrop" onClick={() => { setActive(false) }}></div>
                <div className="event-pane">
                    <HeaderPane/>
                    <EventContent/>
                    <button>+</button>
                </div>
            </>
        );
    }
}