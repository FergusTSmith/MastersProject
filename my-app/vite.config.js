import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  testTimeout: 10000,
  plugins: [vue()],
  resolve: {
  		extensions: [
  		".vue", ".js", ".ts"],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
  	globals: true,
  	environment: 'jsdom'
  }
})
