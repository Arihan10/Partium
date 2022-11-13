//import logo from './logo.svg';
//import './App.css';
import { useState } from 'react';
import EventView from './components/eventview/EventView'
import UserList from './components/test-user-list';

/*
function EventDisplay() {
  return (
    <div className="EventView">
      <header className="EventHeader">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React (NO)
        </a>
      </header>
    </div>
  );
}
*/

function App()
{
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button onClick={() =>setToggle(!toggle)} className="btn-modal"> Open </button>
      { toggle &&
        <>
          <EventView />
          <p> Test! </p>
          <UserList />
        </>
      }
    </>
  );
}

export default App;
