import { describe, vi } from "vitest"
import { getSaveResponse, mockNetWorkResponse, stateReturnedByMockSave } from "../../utils/mocks/apiCalls.data"
import { setupStore } from "../store"
import { inventoryActions } from "../slices/inventorySlice"
import axios from "axios"
import { fetchUser } from "../slices/profileSlice"
import { delay } from "../../utils/utils"
import { GUEST_ACCESS_TOKEN, GUEST_TWITCH_ID } from "../../libs/constants"

const initStateWithLoggedUser = {
  profile: {
    name: "name should not matter",
    twitchId: getSaveResponse.twitchId,
    accessToken: "should not matter to send save",
  },
}

describe("saveMiddleware - Redux Middleware", () => {
  beforeAll(() => {
    mockNetWorkResponse()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it("should not send save request when user has no twitchId", async () => {
    const store = setupStore({
      profile: {
        name: "username",
        twitchId: undefined,
      },
    })

    // spy the "POST" request on axios
    const spyPost = vi.spyOn(axios, "post")

    // dispatch earnMoney action
    store.dispatch(inventoryActions.earnMoney)

    // should not have send a post request since we don't even know the twitch Id
    expect(spyPost).not.toHaveBeenCalled()
  })

  it("should send save request on earn money action", async () => {
    // spy the "POST" request on axios
    const spyPost = vi.spyOn(axios, "post")
    const store = setupStore(initStateWithLoggedUser)

    expect(spyPost).not.toHaveBeenCalled()
    // dispatch earnMoney action
    store.dispatch(inventoryActions.earnMoney)

    // should have send a post request on api
    expect(spyPost).toHaveBeenCalled()
  })
  it("should send save request on buy lootbox action", async () => {
    // spy the "POST" request on axios
    const spyPost = vi.spyOn(axios, "post")
    const store = setupStore(initStateWithLoggedUser)

    expect(spyPost).not.toHaveBeenCalled()
    // dispatch buyLootbox action
    store.dispatch(inventoryActions.buyLootbox)

    // should have send a post request on api
    expect(spyPost).toHaveBeenCalled()
  })
  it("should get the save and update state when fetching current user", async () => {
    const store = setupStore()

    await store.dispatch(fetchUser("123"))
    // Wait some time to be sure middleware had enough time to fetch and dispatch the new save
    // (with "inventory/importSave" action)
    await delay(500)

    expect(store.getState().inventory).toMatchObject(stateReturnedByMockSave)
  })
  it("should not save the state when logged in as guest", async () => {
    const spyPost = vi.spyOn(axios, "post")
    const store = setupStore({
      profile: {
        name: "Guest",
        accessToken: GUEST_ACCESS_TOKEN,
        twitchId: GUEST_TWITCH_ID,
      },
    })

    await store.dispatch(inventoryActions.earnMoney(300))
    expect(spyPost).not.toHaveBeenCalled()
  })
})
