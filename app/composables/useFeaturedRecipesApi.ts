export const useFeaturedRecipesApi = () => {
  const { $api } = useNuxtApp();

  return useAsyncData(
    'recipes-featured-api',
    $api.recipes.getFeatured,
    {
      getCachedData(key, nuxtApp) {
        const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        return cachedData
      },
    }
  );
}
