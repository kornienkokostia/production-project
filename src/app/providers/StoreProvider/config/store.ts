import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { ReducersMapObject } from 'redux';
import { loginReducer } from 'features/AuthByUserName';
import { StateSchema } from './StateSchema';

export const createReduxStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
  });
};
