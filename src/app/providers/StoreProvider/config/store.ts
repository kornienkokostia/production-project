import { configureStore, Reducer, CombinedState } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { ReducersMapObject } from 'redux';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (
  navigate?: (to: To, options?: NavigateOptions) => void,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigate,
        },
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
