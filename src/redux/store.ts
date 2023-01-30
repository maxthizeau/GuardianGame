import { configureStore, Store } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { profileReducer } from "./slices/profileSlice"

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = ReturnType<typeof store.dispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// export const useAppDispatch = () => useDispatch<RootDispatch>()
