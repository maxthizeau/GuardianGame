import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { GAME_VERSION } from "../../libs/constants"
import { getInventoryInitialState, IInventoryState } from "../../redux/slices/inventorySlice"
import { APIResponse, SaveFromApi } from "../../types/ApiResponse"
import { serializeAndEncrypt } from "../serializer"
import { mockData } from "../test-utils"
const BACKEND_URL = import.meta.env.VITE_BACKEND

export const stateReturnedByMockSave: IInventoryState = {
  money: 5500,
  characters: mockData.heroes,
  items: mockData.items,
}

const serializedState = serializeAndEncrypt(stateReturnedByMockSave)

const fetchUserResponse = {
  data: [
    {
      id: "123",
      display_name: "maximethizeau",
    },
  ],
}

const getSaveResponse: SaveFromApi = {
  twitchId: "123",
  serializedState: serializedState!,
  gameVersion: GAME_VERSION,
  date: 1675860286000,
}
const getSaveErrorResponse: APIResponse = {
  error: "Unknown twitch Id",
}

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios)

  // Twitch API
  mock.onGet(`https://api.twitch.tv/helix/users`).reply((config) => {
    if (config.headers?.Authorization) {
      return [200, fetchUserResponse]
    }
    return [401, "Not Authorized"]
  })
  // Save API
  // user id = 123 --> return save
  mock.onGet(`${BACKEND_URL}${getSaveResponse.twitchId}`).reply((config) => {
    if (config.headers?.Authorization) {
      return [200, getSaveResponse]
    }
    return [401, "Not Authorized"]
  })
  // any other id --> return 404 unknown twitch id
  mock.onGet(`${BACKEND_URL}`).reply((config) => {
    if (config.headers?.Authorization) {
      return [404, getSaveErrorResponse]
    }
    return [401, "Not Authorized"]
  })
  // mock post request
  // returns the 123 twitchId save (same as getSaveResponse but with more recent date)
  mock.onPost(`${BACKEND_URL}`).reply((config) => {
    if (config.headers?.Authorization) {
      return [200, { ...getSaveResponse, date: Date.now() }]
    }
    return [401, "Not Authorized"]
  })
}

export { fetchUserResponse, mockNetWorkResponse, getSaveResponse, getSaveErrorResponse }
