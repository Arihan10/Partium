import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import MainPane from './components/mainpane/Mainpane';
import {CSSTransition} from 'react-transition-group'
import './components/eventview/EventView.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import './components/sidebar/Sidebar.css'
import UserFeed from './components/userfeed/UserFeed'
import UserList from './components/userlist/UserList';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Sidebar/>

      <Router>
        <Routes>
          <Route path="/users" element={<UserList />}/>
          <Route path="/feed" element={<UserFeed />}/>
          <Route path="/" element={<UserFeed />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

