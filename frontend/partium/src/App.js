import { useState } from 'react';
import EventView from './components/eventview/EventView'

function App()
{
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button onClick={() => {setToggle(!toggle); console.log(toggle)}}>Open</button>
      { toggle &&
        <>
          <EventView />
        </>
      }
    </>
  );
}

export default App;
