import React, { useState, useMemo } from 'react';
import { Button } from 'antd';

// const useSquare = (numbers: number[]) => {
//   return numbers.map((num) => {
//     console.log('计算平方');
//     return Math.pow(num, 2);
//   })
// }

const useSquare = (numbers: number[]) => {
  return useMemo(() => numbers.map((num) => {
    console.log('计算平方');
    return Math.pow(num, 2);
  }), [])
}

const UseMemo = () => {
  const [status, setStatus] = useState(true);
  const squares = useSquare([1, 2, 3]);
  return (
    <div>
      <div>计算结果: {JSON.stringify(squares)}</div>
      <Button type="primary" onClick={() => setStatus(prev => !prev)}>
        切换状态 {JSON.stringify(status)}
      </Button>
    </div>
  )
}
export default UseMemo;
