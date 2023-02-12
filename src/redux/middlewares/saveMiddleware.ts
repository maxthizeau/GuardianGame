import { createListenerMiddleware, isAllOf, isAnyOf, isAsyncThunkAction, isFulfilled, TypedStartListening } from "@reduxjs/toolkit"
import { inventoryActions } from "../slices/inventorySlice"
import axios from "axios"
import { APIResponse, SaveFromApi } from "../../types/ApiResponse"
import { AppDispatch, RootState } from "../store"
import { GAME_VERSION, GUEST_ACCESS_TOKEN, GUEST_TWITCH_ID } from "../../libs/constants"
import { decrypt, serializeAndEncrypt } from "../../utils/serializer"
import { fetchUser } from "../slices/profileSlice"
import { SaveAPI } from "../../utils/saveApi"

const isGuest = (state: RootState) => state.profile.twitchId == GUEST_TWITCH_ID && state.profile.accessToken == GUEST_ACCESS_TOKEN

// Create the middleware instance and methods
const saveMiddleware = createListenerMiddleware()

const saveApi = new SaveAPI()
/**
 * Middleware that send serialized state to backend
 */
saveMiddleware.startListening({
  matcher: isAnyOf(inventoryActions.earnMoney, inventoryActions.buyLootbox, inventoryActions.equipItem, inventoryActions.selectCharacter),
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners()
    // Get current state
    const currentState = listenerApi.getState() as RootState

    // if the logged in user is logged as guest, do nothing
    if (isGuest(currentState)) {
      return
    }
    if (currentState.profile.twitchId) {
      // The only way to update twitchId is to ask from Twitch API
      // If twitchId is set, it means that user is connected
      // Encrypt inventory state
      const serializedState = serializeAndEncrypt(currentState.inventory)
      // encrypt function returns null if it failed. Be sure it worked as planned before sending it to the backend
      if (serializedState) {
        // Send Post request to update or create the save for this twitchId user
        const data = await saveApi.postSave(currentState.profile.twitchId, serializedState)
      } else {
        // console.log("Could not serialize state")
      }
    } else {
      //   console.log("No twitch ID --> Not connected user --> No Save")
    }
  },
})

// export type AppStartListening = TypedStartListening<RootState, AppDispatch>

// export const startAppListening =
//   saveMiddleware.startListening as AppStartListening
/**
 * Middleware listening when we load user --> get the save from the backend
 */
saveMiddleware.startListening({
  matcher: isAllOf(isAsyncThunkAction(fetchUser), isFulfilled(fetchUser)),
  effect: async (action, listenerApi) => {
    // Cancel other running instances
    listenerApi.cancelActiveListeners()

    // Get Current state
    const currentState = listenerApi.getState() as RootState
    // if the logged in user is logged as guest, do nothing
    if (isGuest(currentState)) {
      return
    }

    // The only way to update twitchId is to ask from Twitch API
    // If twitchId is set, it means that user is connected
    if (currentState.profile.twitchId) {
      // TODO : Implement save overwrite protection :
      // We should not import save from backend if the backend one is more recent

      // fetch backend to get the encrypted save
      const data = await saveApi.fetchSave(currentState.profile.twitchId)

      // fetchSave returns either a {data} or {error}.
      // do nothing if there was an error while fetching backend
      if (data.data) {
        // decrypt the serializedState and convert it to a IInventoryState object
        const decryptedSave = decrypt(data.data.serializedState)

        // if decrypt failed, it returns null - do nothing if it fails
        if (decryptedSave) {
          listenerApi.dispatch(inventoryActions.importSave({ serializedState: decryptedSave }))
          const newState = listenerApi.getState() as RootState
        }
      } else {
        // No data
      }
    }
  },
})

export default saveMiddleware
