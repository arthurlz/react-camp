import React, { useState } from 'react';
import { Button } from 'antd';

// 父传子
const MainLayout = () => {
  const [status, setStatus] = useState(true);

  return (
    <>
      <div>我是主要组件</div>
      <Button type="primary" onClick={() => setStatus((prevStatus) => !prevStatus)}>  
        切换当前状态
      </Button>
      <SubComp status={status}>
        <div>我是子组件的children</div>
      </SubComp>
    </>
  )
}

type SubCompProps = {
  status: boolean;
  children?: React.ReactNode;
}

const SubComp = ({ status, children }: SubCompProps) => {
  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      <div>我是子组件</div>
      <div>父组件传递的status: {JSON.stringify(status)}</div>
      <div>父组件传递的children：{children}</div>
    </div>
  )
} 

export default MainLayout;
