import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AccountSchema } from 'entities/Account';
import { AppStateSchema } from 'entities/AppState';
import { ArticleDetailsSchema } from 'entities/Article';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { UISchema } from 'features/UI';
import { addCommentFormSchema } from 'features/addCommentForm';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { NavigateOptions, To } from 'react-router-dom';

export interface StateSchema {
  appState: AppStateSchema
  user: UserSchema;
  ui: UISchema

  // Async redusers
  loginForm?: LoginSchema
  account?: AccountSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: ArticleDetailsCommentsSchema
  addCommentForm?: addCommentFormSchema
  articlesPage?: ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  // true - mounted, false - unmounted
  getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
