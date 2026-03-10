/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_API_URL: string;
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
