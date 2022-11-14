import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import MainPane from './components/mainpane/Mainpane';
import {CSSTransition} from 'react-transition-group'
import './components/eventview/EventView.css'

function App() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button onClick={() => {setToggle(!toggle)}}>Open</button>
      <MainPane/>
      <CSSTransition in={toggle} timeout={300} classNames="transitiontest" unmountOnExit mountOnEnter>
        <div>
          <EventView toggle={toggle} setToggle={setToggle} />
        </div>
      </CSSTransition>
    </>
  );
}

export default App;

