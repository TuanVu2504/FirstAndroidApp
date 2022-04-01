import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { combineReducers, applyMiddleware, createStore, Action } from 'redux'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { auth, opennetResource, permissions, user, modal, appState } from './reducer'

const rootReducer = combineReducers({
  auth,
  opennetResources: opennetResource,
  user,
  permissions,
  modal,
  appState,
})

export const store = createStore(
  rootReducer, 
  applyMiddleware(
    thunkMiddleware
  )
)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer> 
export type ChildRootStateKey = keyof RootState
export type ChildRootState<T extends ChildRootStateKey> = Pick<RootState, T>[T]
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector
export const useDispatchTyped = () => useDispatch<AppDispatch>()
