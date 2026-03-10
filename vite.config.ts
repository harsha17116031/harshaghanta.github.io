import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Vite options
    base: './',

    // Only expose variables prefixed with VITE_ to the client
    // This prevents accidentally exposing sensitive backend variables
    define: {
      // Example: You can add runtime config here if needed
      // '__APP_VERSION__': JSON.stringify(env.npm_package_version),
    },

    // Build options
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },

    // Server options for development
    server: {
      port: 5173,
      strictPort: false,
      open: true,
    },

    // Preview server options
    preview: {
      port: 4173,
      strictPort: false,
    },
  };
});
