import { createApiList } from "~/utils/api";

export default defineNuxtPlugin({
  name: 'apiFetch',
  parallel: true,
  
  setup() {
    const apiFetch = $fetch.create({
      baseURL: '/',
      headers: {
        Accept: "application/json",
      },
    });

    const api = createApiList(apiFetch)

    return {
      provide: {
        apiFetch,
        api,
      }
    }
  }
});