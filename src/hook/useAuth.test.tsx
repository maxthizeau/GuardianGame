import { act, createWrapper, localStorageMock, renderHook } from "../utils/test-utils"
import useAuth from "./useAuth"
import { setupStore } from "../redux/store"
import { fetchUser, profileActions } from "../redux/slices/profileSlice"
import { vi } from "vitest"
import { mockNetWorkResponse } from "../utils/mocks/apiCalls.data"
import { LOCAL_KEY_uuid, LOCAL_KEY_twitchAccessToken } from "../libs/constants"
import { AnyAction, Store } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

describe("useAuth - hook", () => {
  beforeAll(() => {
    // mock API responses
    mockNetWorkResponse()
    // mockLocalStorage
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    })

    // since we use window.location.href in one function of the hook --> need to assign it in order to test / use it
    Object.defineProperty(window, "location", {
      value: { assign: vi.fn() },
    })
  })
  it("should fetch current user whenever accessToken changes", async () => {
    const store = setupStore()
    const spyFetchUser = vi.fn().mockImplementation(fetchUser)
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper(store) })

    expect(store.getState().profile.accessToken).not.toBeDefined()
    await act(async () => {
      const res = await store.dispatch(spyFetchUser("valid_token"))
    })
    expect(spyFetchUser).toHaveBeenCalled()
    expect(store.getState().profile.accessToken).toBeDefined()
  })
  it("should return true when calling compareUuidState with the same state than the one stored in localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })
    window.localStorage.setItem(LOCAL_KEY_uuid, "mytestuuid")

    let res
    act(() => {
      res = result.current.compareUuidState("mytestuuid")
    })

    expect(res).toBeDefined()
    expect(res).toBe(true)
  })
  it("should return false when calling compareUuidState with a different state than the one stored in localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })
    window.localStorage.setItem(LOCAL_KEY_uuid, "mytestuuid")

    let res
    act(() => {
      res = result.current.compareUuidState("anotheruuid")
    })

    expect(res).toBeDefined()
    expect(res).toBe(false)
  })
  it("should store access token in localStorage", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })

    act(() => {
      result.current.setAccessToken("accesstoken")
    })

    const localAccessToken = window.localStorage.getItem(LOCAL_KEY_twitchAccessToken)
    expect(localAccessToken).toBeDefined()
    expect(localAccessToken).toBe("accesstoken")
  })
  it("should clear localStorage on logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })

    window.localStorage.setItem(LOCAL_KEY_uuid, "mytestuuid")
    window.localStorage.setItem(LOCAL_KEY_twitchAccessToken, "myaccesstoken")
    act(() => {
      result.current.logout()
    })

    const localAccessToken = window.localStorage.getItem(LOCAL_KEY_twitchAccessToken)
    const localUUID = window.localStorage.getItem(LOCAL_KEY_uuid)
    expect(localUUID).toBe(null)
    expect(localAccessToken).toBe(null)
  })
  it("should set a new uuid state in localStorage when calling handleOAuthTwitch", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() })
    const localUUID = window.localStorage.getItem(LOCAL_KEY_uuid)
    expect(localUUID).toBe(null)

    act(() => {
      result.current.handleOAuthTwitch()
    })

    expect(window.localStorage.getItem(LOCAL_KEY_uuid)).not.toBe(null)
  })
  it("isAuthenticated should return true when twitchId is stored in storage", () => {
    const store = setupStore({
      profile: {
        name: "A default name",
        twitchId: "123",
        accessToken: "123456",
      },
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(store),
    })

    // store has twitchId && accessToken -> should be true
    expect(result.current.isAuthenticated).toBe(true)
  })
  it("isAuthenticated should be updated whenever accessToken or twitchId changes in state ", async () => {
    const store = setupStore({
      profile: {
        name: "A default name",
        twitchId: "123",
        accessToken: "123456",
      },
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(store),
    })

    // store has twitchId && accessToken -> should be true
    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      // Dispatch logout to clear state
      store.dispatch(profileActions.logout())
    })

    // should now be false
    expect(result.current.isAuthenticated).toBe(false)
  })
})
