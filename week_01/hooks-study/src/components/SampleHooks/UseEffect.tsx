import { useState, useEffect } from 'react';
import {Button, Typography} from 'antd';

const { Title } = Typography;

// const Child = () => {
//   useEffect(() => {
//     console.log('Child组件挂载');
//     return () => {
//       console.log('Child组件卸载');
//     }
//   }, []);
//   return <Typography>
//     <Title level={4}>Child组件</Title>
//   </Typography>
// }

// const Index = () => {
//   const [flag, setFlag] = useState(false);

//   return (
//     <>
//       <Button type="primary" onClick={() => setFlag(!flag)}>
//         {flag ? '卸载' : '挂载'}Child组件
//       </Button>
//       {flag && <Child />}
//     </>
//   )
// }

const Index = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count)
    console.log('count变化才会执行');
  }, [count]);


  return (
    <>
      <div>number: {number}  count: {count}</div>
      <Button type="primary" onClick={() => setNumber(number + 1)}>
        number + 1
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => setCount(count + 1)}
      >
        count + 1
      </Button>
    </>
  )
}

export default Index;


