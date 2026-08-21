import { defineVitestConfig } from '@nuxt/test-utils/config'
import dotenv from 'dotenv'

dotenv.config()

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
  },
})
