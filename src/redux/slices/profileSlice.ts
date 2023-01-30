import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IProfileState {
  name: string
  money: number
}

const initialState: IProfileState = {
  name: "Username",
  money: 300,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    earnMoney: (state, action: PayloadAction<number>) => {
      state.money += action.payload
    },
    spendMoney: (state, action: PayloadAction<number>) => {
      state.money - action.payload >= 0 && state.money - action.payload
    },
  },
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
