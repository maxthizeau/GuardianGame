/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TWITCH_SECRET_TOKEN: string
  readonly VITE_FRONTURL: string
  readonly VITE_BACKEND: string
  readonly VITE_BACKEND_AUTH: string
  readonly VITE_ENCRYPT_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
