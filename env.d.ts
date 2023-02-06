/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TWITCH_SECRET_TOKEN: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
