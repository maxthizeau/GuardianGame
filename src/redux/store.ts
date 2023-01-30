import { configureStore, Store } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "./slices/appSlice"
import { inventoryReducer } from "./slices/inventorySlice"
import { profileReducer } from "./slices/profileSlice"

export const store = configureStore({
  reducer: {
    app: appReducer,
    profile: profileReducer,
    inventory: inventoryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
