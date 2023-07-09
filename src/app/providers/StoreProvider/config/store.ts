import { configureStore, Reducer, CombinedState } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { ReducersMapObject } from 'redux';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { appStateReducer } from 'entities/AppState';
import { uiReducer } from 'features/UI';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

export const createReduxStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    appState: appStateReducer,
    user: userReducer,
    ui: uiReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,

        },
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
