import React, { useState } from 'react';

function useCounter(initialState: number = 0, step: number = 1) {
  const [count, setCount] = useState(initialState);
  const increment = () => setCount(count + step);
  return {count, increment};
}

function Counter() {
  const {count, increment} = useCounter(0);
  return <button onClick={increment}>{count}</button>;
}

export default Counter;