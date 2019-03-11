import React, { useState, useEffect } from 'react';

function useCounter(initialState: any = 0, step: number = 1) {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + step);
  return {count, increment};
}

function Counter() {
  const initialCount = () => Number(window.localStorage.getItem('count') || 0);
  const {count, increment} = useCounter(initialCount);
  useEffect(() => {
    window.localStorage.setItem('count', count)
  }, [count]);
  return <button onClick={increment}>{count}</button>;
}

export default Counter;