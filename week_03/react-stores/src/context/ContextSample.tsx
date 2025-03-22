import { createContext, useContext, useState } from "react";

const CounterContext = createContext<any>(null);
const DisplayContext = createContext<any>(null);

const Counter = () => {
  const { counter, setCounter } = useContext<any>(CounterContext);
  console.log("Counter render");
  return <div onClick={() => setCounter(counter + 1)}>Counter: {counter}</div>;
};

const Display = () => {
  const { displayValue } = useContext<any>(DisplayContext);
  console.log("Display render");
  return <div>Display: {displayValue}</div>;
};

const CounterProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {children}
    </CounterContext.Provider>
  );
};

const DisplayProvider = ({ children }) => {
  const [displayValue, setDisplayValue] = useState(0);
  return (
    <DisplayContext.Provider value={{ displayValue, setDisplayValue }}>
      {children}
    </DisplayContext.Provider>
  );
};

const ContextSample = () => (
  <CounterProvider>
    <DisplayProvider>
      <Counter />
      <Display />
    </DisplayProvider>
  </CounterProvider>
);

export default ContextSample;
