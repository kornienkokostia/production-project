import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  // const navigate = useNavigate();
  const store = createReduxStore();

  return <Provider store={store}>{children}</Provider>;
};
