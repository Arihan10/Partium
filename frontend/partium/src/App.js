import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import MainPane from './components/mainpane/Mainpane';
import {CSSTransition} from 'react-transition-group'
import './components/eventview/EventView.css'

function App() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <MainPane/>
      <CSSTransition in={toggle} timeout={300} classNames="transitiontest" unmountOnExit mountOnEnter>
        <div>
          <EventView toggle={toggle} setToggle={setToggle} />
        </div>
      </CSSTransition>
      <button onClick={() => {setToggle(!toggle)}}>Open</button>
    </>
  );
}

export default App;

