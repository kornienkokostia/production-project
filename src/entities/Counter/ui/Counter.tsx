import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1>Value = {counter}</h1>
      <Button theme={ButtonTheme.APPLE} onClick={increment}>
        Increment
      </Button>
      <Button theme={ButtonTheme.APPLE} onClick={decrement}>
        Decrement
      </Button>
    </div>
  );
};
