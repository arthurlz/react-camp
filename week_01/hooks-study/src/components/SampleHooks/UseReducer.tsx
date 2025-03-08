import { useReducer } from "react";
import { Button } from "antd";

type Action =
  | { type: 'add'; payload: number }
  | { type: 'sub'; payload: number }

const MainComponent = () => {
  const [count, dispatch] = useReducer((state: number, action: Action) => {
    switch (action.type) {
      case 'add':
        return state + action.payload;
      case 'sub':
        return state - action.payload;
      default:
        return state;
    }
  }, 0);

  return (
    <>
      <div>count: {count}</div>
      <Button type="primary" onClick={() => dispatch({ type: 'add', payload: 1 })}>
        加1
      </Button>
      <Button type="primary" style={{marginLeft: 10}} onClick={() => dispatch({ type: 'sub', payload: 1 })}>
        减1
      </Button>
    </>
  )
}

export default MainComponent;
