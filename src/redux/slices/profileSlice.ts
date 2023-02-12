import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { GUEST_ACCESS_TOKEN, GUEST_TWITCH_ID } from "../../libs/constants"
const clientId = import.meta.env.VITE_TWITCH_SECRET_TOKEN

// not used
enum LoadingState {
  INACTIVE,
  STARTED,
  DONE,
  ERROR,
}

interface IProfileState {
  name: string
  twitchId?: string
  accessToken?: string
}

const twitchAccessToken = localStorage.getItem("twitchAccessToken") ?? undefined

export const fetchUser = createAsyncThunk("profile/fetchUser", (token?: string) => {
  // Prioritize props token, then localstorage, except if localstorage token is guest

  let finalToken = token ?? localStorage.getItem("twitchAccessToken") ?? undefined
  if (localStorage.getItem("twitchAccessToken") == GUEST_ACCESS_TOKEN) {
    return { userId: GUEST_TWITCH_ID, displayName: "Guest", accessToken: GUEST_ACCESS_TOKEN }
  }

  if (!finalToken) {
    throw Error("No token to fetch")
  }
  return axios({
    method: "get",
    url: "https://api.twitch.tv/helix/users",
    headers: {
      Authorization: `Bearer ${finalToken}`,
      "Client-Id": clientId,
    },
  }).then((response) => {
    const user = response.data?.data?.[0]
    return {
      userId: user["id"] ?? undefined,
      displayName: user["display_name"] ?? undefined,
      accessToken: finalToken,
    }
  })
})

const initialState: IProfileState = {
  name: "Username",
  accessToken: twitchAccessToken,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    logout: (state) => {
      return initialState
    },
    loginGuest: (state) => {
      ;(state.name = "Guest"), (state.accessToken = GUEST_ACCESS_TOKEN), (state.twitchId = GUEST_TWITCH_ID)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      // console.log("Pending... (to handle)")
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      // console.log(action.error.message)
      state = initialState
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.name = action.payload.displayName
      state.twitchId = action.payload.userId
    })
  },
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
export const getProfileInitialState = profileSlice.getInitialState
