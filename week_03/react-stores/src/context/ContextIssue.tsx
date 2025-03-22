import { createContext, useContext, useState } from "react";

const context = createContext(null);

const Count1 = () => {
  const { count1, setCount1 } = useContext(context);
  console.log("Count1 render");
  return <div onClick={() => setCount1(count1 + 1)}>count1: {count1}</div>;
};

const Count2 = () => {
  const { count2 } = useContext(context);
  console.log("Count2 render");
  return <div>count2: {count2}</div>;
};

const StateProvider = ({ children }) => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  return (
    <context.Provider
      value={{
        count1,
        count2,
        setCount1,
        setCount2
      }}
    >
      {children}
    </context.Provider>
  );
};

const ContextIssue = () => (
  <StateProvider>
    <Count1 />
    <Count2 />
  </StateProvider>
);

export default ContextIssue;
