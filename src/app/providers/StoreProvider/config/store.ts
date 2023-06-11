import { configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import { counterReducer } from 'entities/Counter'

export const createReduxStore = () => {
  return configureStore<StateSchema>({
    reducer: { counter: counterReducer },
    devTools: __IS_DEV__
  })
}


