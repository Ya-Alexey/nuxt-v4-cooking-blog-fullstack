import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  alias: {
    '#domain_auth_api': fileURLToPath(new URL('./index', import.meta.url)),
    '#domain_auth': fileURLToPath(new URL('./app', import.meta.url)),
  },
});