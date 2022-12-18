/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BUILD_MODE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
