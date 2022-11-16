import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import MainPane from './components/mainpane/Mainpane';
import {CSSTransition} from 'react-transition-group'
import './components/eventview/EventView.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import './components/sidebar/Sidebar.css'

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/users" element={<MainPane />}/>
        </Routes>
      </Router>

      <Sidebar/>
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

