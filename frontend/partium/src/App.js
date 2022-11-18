import { useState, useRef, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Sidebar from './components/sidebar/Sidebar';
import UserFeed from './components/userfeed/UserFeed'
import UserList from './components/userlist/UserList';
import SignUp from './components/signup/Signup';
import Login from './components/login/Login';

import './App.css'

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="main-pane">
      <Sidebar/>

      <Router>
        <Routes>
          <Route path="/users" element={<UserList />}/>
          <Route path="/feed" element={<UserFeed />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserFeed />}/>
        </Routes>
      </Router>
    </div>
  );

}

export default App;

