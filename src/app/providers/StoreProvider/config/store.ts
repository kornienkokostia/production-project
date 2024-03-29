import { configureStore, Reducer, CombinedState } from '@reduxjs/toolkit';
import { ReducersMapObject } from 'redux';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { appStateReducer } from '@/entities/AppState';
import { uiReducer } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';
import { articleEditReducer } from '@/pages/ArticleEditPage/model/slice/articleEditSlice';

export const createReduxStore = () => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    appState: appStateReducer,
    user: userReducer,
    ui: uiReducer,
    articleEditPage: articleEditReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
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
    }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
