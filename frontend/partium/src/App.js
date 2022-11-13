import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import UserList from './components/test-user-list';

function App() {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button onClick={() => {setToggle(!toggle)}}>Open</button>
      {toggle &&
        <>
          <EventView toggle={toggle} setToggle={setToggle} />
          <p> Test! </p>
          <UserList />
        </>
      }
      <UserList />
    </>
  );
}

export default App;
