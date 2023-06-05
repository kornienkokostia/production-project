import React, { useState } from 'react';
import classes from './Counter.module.scss';

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(prev => ++prev);
  const decrement = () => setCounter(prev => --prev);

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={increment} className={classes.btn}>
        Incriment
      </button>
      <button onClick={decrement} className={classes.btn}>
        Decriment
      </button>
    </div>
  );
};
