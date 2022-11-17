import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import {CSSTransition} from 'react-transition-group'
import './components/eventview/EventView.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import './components/sidebar/Sidebar.css'
import UserFeed from './components/userfeed/UserFeed'
import UserList from './components/userlist/UserList';
import SignUp from './components/signup/Signup';
import Login from './components/login/Login';

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;