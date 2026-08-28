import { createAuthClient } from "better-auth/vue";

export default defineNuxtPlugin({
  name: "authClient",
  parallel: true,
  setup() {
    const authClient = createAuthClient();
    const sessionHook = authClient.useSession()
    return {
      provide: {
        auth: sessionHook,
      }
    }
  },
});
