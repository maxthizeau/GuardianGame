export type GameVersion = { major: number; minor: number }

export interface SaveFromApi {
  twitchId: string
  serializedState: string
  gameVersion: GameVersion
  date: number
}

export interface APIResponse {
  data?: SaveFromApi
  error?: string
}
