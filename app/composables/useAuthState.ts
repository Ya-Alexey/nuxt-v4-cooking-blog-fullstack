export const useAuthState = () => {
  const nuxtApp = useNuxtApp()

  if (!import.meta.client) {
    // NOTE заглушка для nuxtApp.$auth
    return readonly(ref({
      data: null,
      isPending: false,
      error: null,
      refetch: async () => {}
    }))
  }

  return nuxtApp.$auth
}
