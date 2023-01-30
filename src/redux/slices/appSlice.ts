import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const enum EViews {
  HOME,
  CHARACTER,
  LOOTBOX,
}

export type View = {
  type: EViews
  arg?: any
}

interface IAppState {
  view: View
}

const initialState: IAppState = {
  view: { type: EViews.HOME },
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeView: (state, action: PayloadAction<View>) => {
      state.view = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions
