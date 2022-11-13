import { useState, useRef } from 'react';
import EventView from './components/eventview/EventView'
import { Transition, CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";

const duration = 50;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, },
  entered: { opacity: 1, },
  exiting: { opacity: 1, },
  exited: { opacity: 0, },
};

function App() {
  const [toggle, setToggle] = useState(true);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const toggleTest = (enabled) => {
    setToggle(enabled);
    console.log(toggle)
  }

  return (
    <>
      <button onClick={() => { toggleTest(!toggle) }}>Open</button>
      <CSSTransition nodeRef={nodeRef} in={toggle} timeout={100} mountOnEnter unmountOnExit>
        {state => (
          <div ref={nodeRef} style={{...defaultStyle, ...transitionStyles[state]}}>
            <EventView state={state} setToggle={setToggle} />
          </div>
        )}
      </CSSTransition>
      <CSSTransition nodeRef={nodeRef2} in={toggle} timeout={{enter: 300, exit: 300, appear: 300}} mountOnEnter unmountOnExit>
        {state => (
          <div ref={nodeRef2} style={{...defaultStyle, ...transitionStyles[state]}}>
            <h1>Hello</h1>
          </div>
        )}
      </CSSTransition>
    </>
  );
}

export default App;
