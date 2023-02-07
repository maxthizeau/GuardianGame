import { APIResponse } from "../types/ApiResponse"
import axios from "axios"
import { GAME_VERSION } from "../libs/constants"

const BACKEND_URL = import.meta.env.VITE_BACKEND
const BACKEND_AUTH = import.meta.env.VITE_BACKEND_AUTH

export class SaveAPI {
  constructor() {}

  fetchSave = async (id: string) => {
    //   try {
    const res: APIResponse = await axios
      .get(`${BACKEND_URL}${id}`, {
        headers: {
          Authorization: BACKEND_AUTH,
        },
      })
      .then((response) => {
        return { data: response.data }
      })
      .catch((err) => {
        return { error: err.message }
      })
    return res
  }

  postSave = async (id: string, serializedState: string) => {
    //   try {
    const res: APIResponse = await axios
      .post(
        `${BACKEND_URL}`,
        {
          twitchId: id,
          serializedState,
          gameVersion: GAME_VERSION,
        },
        {
          headers: {
            Authorization: BACKEND_AUTH,
          },
        }
      )
      .then((response) => {
        return { data: response.data }
      })
      .catch((err) => {
        return { error: err.message }
      })
    return res
  }
}
