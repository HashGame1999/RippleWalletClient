import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import UserReducer from './slices/UserSlice'
import xrplReducer from './slices/xrplSlice'
import { watchUser } from './sagas/UserSaga'
import { watchXRPL } from './sagas/xrplSaga'
import { taskInstant, taskFast, taskSlow } from './sagas/TaskSaga'

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchXRPL(),
    taskInstant(),
    taskFast(),
    taskSlow(),
  ])
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    xrpl: xrplReducer,
    User: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)