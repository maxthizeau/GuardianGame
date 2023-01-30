import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IProfileState {
  name: string
}

const initialState: IProfileState = {
  name: "Username",
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
