import { useSyncExternalStore } from "react";
import { Button } from "antd";
import { combineReducers, createStore } from "redux";

const counterReducer = (state = 0, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ counter: counterReducer });
const store = createStore(rootReducer);

const MainComponent = () => {
  const countStore = useSyncExternalStore(store.subscribe, () => store.getState().counter);

  return (
    <>
      <div>当前count: {countStore}</div>
      <Button type="primary" onClick={() => store.dispatch({ type: 'INCREMENT' })}>
        加1
      </Button>
      <Button type="primary" style={{marginLeft: 10}} onClick={() => store.dispatch({ type: 'DECREMENT' })}>
        减1
      </Button>
    </>
  )
}

export default MainComponent;
