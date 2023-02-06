import { useState, useEffect, useMemo, useCallback } from "react"
import { LOCAL_KEY_twitchAccessToken, LOCAL_KEY_uuid } from "../libs/constants"
import { fetchUser, profileActions } from "../redux/slices/profileSlice"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { uuid } from "../utils/utils"
const clientId = import.meta.env.VITE_TWITCH_SECRET_TOKEN
const frontUrl = import.meta.env.PROD ? import.meta.env.VITE_FRONTURL : "http://localhost:5173/"

const useAuth = () => {
  const profile = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()

  const isAuthenticated = useMemo(() => {
    return profile.accessToken !== undefined && profile.twitchId !== undefined
  }, [profile.accessToken, profile.twitchId])

  useEffect(() => {
    dispatch(fetchUser(profile.accessToken))
  }, [profile.accessToken])
  // what I call uuid state id a string props passed as "state" in twitch auth link, and we need to verify
  // that the same is in the response
  const setUuidState = (uuid: string) => {
    localStorage.setItem(LOCAL_KEY_uuid, uuid)
  }

  // return true if received uuid == uuid in storage
  const compareUuidState = (receivedUuid: string) => localStorage.getItem(LOCAL_KEY_uuid) !== undefined && localStorage.getItem(LOCAL_KEY_uuid) == receivedUuid
  // setAccessToken to localStorage
  const setAccessToken = (receivedAccessToken?: string) =>
    receivedAccessToken ? localStorage.setItem(LOCAL_KEY_twitchAccessToken, receivedAccessToken) : false
  // get Access token from localStorage
  const localAccessToken = localStorage.getItem(LOCAL_KEY_twitchAccessToken) ?? undefined

  const logout = () => {
    // remove items from storage
    localStorage.removeItem(LOCAL_KEY_uuid)
    localStorage.removeItem(LOCAL_KEY_twitchAccessToken)
    // dispatch to redux to remove ids
    dispatch(profileActions.logout())
  }

  const handleOAuthTwitch = () => {
    const stateString = uuid()
    setUuidState(stateString)
    const responseType = "token"
    const scope = "channel%3Amanage%3Apolls+channel%3Aread%3Apolls"
    const redirectUri = `${frontUrl}auth`
    window.location.href = `https://id.twitch.tv/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${stateString}`
  }

  return {
    isAuthenticated,
    localAccessToken,
    setAccessToken,
    setUuidState,
    compareUuidState,
    handleOAuthTwitch,
    logout,
  }
}

export default useAuth
