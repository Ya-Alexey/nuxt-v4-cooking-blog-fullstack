import { defineNuxtConfig } from 'nuxt/config'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  alias: {
    '#domain_about_api': fileURLToPath(new URL('./index', import.meta.url)),
    '#domain_about': fileURLToPath(new URL('./app', import.meta.url)),
  },
});