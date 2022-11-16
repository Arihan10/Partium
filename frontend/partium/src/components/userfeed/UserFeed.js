import { useState, useRef } from 'react';
import EventView from '../eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import './UserFeed.css'

function UserFeed()
{
    const [toggle, setToggle] = useState(false);

    return (
        <div className='main'>
            <CSSTransition in={toggle} timeout={300} classNames="transitiontest" unmountOnExit mountOnEnter>
                <div>
                    <EventView toggle={toggle} setToggle={setToggle} />
                </div>
            </CSSTransition>
            <button onClick={() => {setToggle(!toggle)}} className="test-btn">Open</button>
        </div>
    );
}

export default UserFeed;