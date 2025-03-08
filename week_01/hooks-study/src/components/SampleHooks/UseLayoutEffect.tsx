import { useState, useLayoutEffect, useEffect } from 'react';

const UseLayoutEffect = () => {
  const [effectCount, setEffectCount] = useState(0);
  const [layoutCount, setLayoutCount] = useState(0);

  useLayoutEffect(() => {
    if (layoutCount === 0) {
      console.log('useLayoutEffect');
      setLayoutCount(10 + Math.random() * 200);
    }
  }, [layoutCount]);

  useEffect(() => {
    if (effectCount === 0) {
      console.log('useEffect');
      setEffectCount(10 + Math.random() * 100);
    }
  }, [effectCount]);

  return (
    <>
      <div>useEffect and useLayoutEffect demo</div>
      <div>Layout Count: {layoutCount}</div>
      <div>Effect Count: {effectCount}</div>
    </>
  )
}

export default UseLayoutEffect;
