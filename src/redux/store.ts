import { combineReducers, configureStore, PreloadedState, Store } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import saveMiddleware from "./middlewares/saveMiddleware"
import { appReducer } from "./slices/appSlice"
import { inventoryReducer } from "./slices/inventorySlice"
import { profileReducer } from "./slices/profileSlice"

const RootReducers = combineReducers({
  app: appReducer,
  profile: profileReducer,
  inventory: inventoryReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: RootReducers,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(saveMiddleware.middleware),
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof RootReducers>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof setupStore>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
