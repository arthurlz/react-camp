import { useState } from 'react';
import {Button} from 'antd';

const Index = () => {
  const [count, setCount] = useState(0);
  const [objCount, setObjCount] = useState({count: 0});

  return (
    <>
      <div>Count: {count}</div>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        第一种方法： 加1
      </Button>
      <Button type="primary" onClick={() => setCount((count) => count + 1)}>
        第二种方法： 加1
      </Button>

      <div>objCount：: {objCount.count}</div>
      <Button type="primary" onClick={() => {
        objCount.count++;
        // setObjCount(objCount);
        setObjCount({...objCount});
      }}>
        objCount： 加1
      </Button>
    </>
  )
}

export default Index