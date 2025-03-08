import React, { useState } from 'react';
import { Button } from 'antd';

type ChildProps = {
  getCount: (v: number)  => void;
  children?: React.ReactNode;
}

const Child: React.FC<ChildProps> = ({ getCount, children }) => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: '1px solid red', padding: '10px' }}>
      <div>我是子组件</div>
      <div>{children}</div>
      <Button type="primary" onClick={() => {
        const temp = count + 1;
        setCount(temp);
        getCount(temp)
      }}>
        子组件count加一: {count}
      </Button>
    </div>
  )
}

const MainLayout = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>我是主要组件</div>
      <div>子组件的count {count}</div>
      {/* <Button type="primary" onClick={() => setCount(count + 1)}>
        点击主组件count+1{count}
      </Button> */}
      <Child getCount={(v) => setCount(v)}>
        <div>我是子组件的children</div>
      </Child>
    </>
  )
}
export default MainLayout;

