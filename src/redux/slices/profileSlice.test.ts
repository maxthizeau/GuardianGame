import { setupStore } from "./../store"
import { getProfileInitialState, profileActions, profileReducer } from "./profileSlice"
import { describe, vi } from "vitest"
import { fetchUser } from "./profileSlice"
import * as redux from "react-redux"
import { fetchUserResponse, mockNetWorkResponse } from "../../utils/mocks/apiCalls.data"

describe("profileSlice - redux slice", () => {
  beforeAll(() => {
    mockNetWorkResponse()
  })

  it("should init state with empty accessToken and userId", () => {
    const profileState = profileReducer(undefined, { type: undefined })
    expect(profileState.accessToken).not.toBeDefined()
    expect(profileState.twitchId).not.toBeDefined()
  })
  it("should clear accessToken and userId when calling logout", () => {
    const profileState = profileReducer(
      {
        name: "My Username",
        accessToken: "2kqkj198alk91",
        twitchId: "91892810",
      },
      { type: "" }
    )
    expect(profileState.accessToken).toBe("2kqkj198alk91")
    expect(profileState.twitchId).toBe("91892810")
    // ACT : call logout action
    let newState = profileReducer(profileState, profileActions.logout())
    expect(newState.accessToken).not.toBeDefined()
    expect(newState.twitchId).not.toBeDefined()
  })
  it("should update accessToken and userId with a valid call of fetchUser", async () => {
    const store = setupStore()

    // fetchUser is calling api : the response is mocked - any token considered as valid
    const result = await store.dispatch(fetchUser("valid_token"))
    const { accessToken, twitchId, name } = store.getState().profile
    expect(accessToken).toBe("valid_token")
    expect(twitchId).toBe(fetchUserResponse.data[0].id)
    expect(name).toBe(fetchUserResponse.data[0].display_name)
  })
  it("should not update the state when calling fetchUser with wrong accessToken", async () => {
    const store = setupStore()

    // fetchUser is calling api : the response is mocked - no token -> unauthorized response
    const result = await store.dispatch(fetchUser())
    const profile = store.getState().profile
    expect(profile).toMatchObject(getProfileInitialState())
  })
})
