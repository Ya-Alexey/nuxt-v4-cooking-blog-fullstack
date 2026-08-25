<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <template v-if="recipeData">
    <Head>
      <Title>{{ recipeData.title }} | Рецепты Cooks Delight</Title>
      <Meta 
        name="description"
        :content="`${recipeData.description} Откройте пошаговый рецепт от Изабеллы Руссо и добавьте нотку гастрономического путешествия в свой день!`"
      />
    </Head>
    <main>
      <SectionArticle 
        :recipe-article="recipeData"
      />
    </main>

    <LazySectionSwiper 
      v-if="relatedList"
      :recipe-list="relatedList"
      hydrate-on-visible
    >
      <template #title>Похожие рецепты</template>
    </LazySectionSwiper>
  </template>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();
const route = useRoute();
const routeSlug = computed(() => route.params.slug as string);

const {
  data: pageData
} = await useAsyncData(
  () => `page-recipe-${routeSlug.value}`,
  () => $api.recipes.getBySlug(routeSlug.value),
);
const recipeData = computed(() => pageData.value?.data);

const {
  data: relatedData
} = await useAsyncData(
  () => `related-recipes-${recipeData.value?.category ?? 'category'}`,
  () => {
    if (!recipeData.value?.category) {
      return Promise.resolve(null);
    }
    return $api.recipes.get({
      category: recipeData.value.category,
    });
  },
  {
    getCachedData(key, nuxtApp) {
      const cachedData = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      return cachedData
    },
  }
);

const relatedList = computed(() => {
  if (!relatedData.value) {
    return null
  }
  const mainRecipeId = recipeData.value!.id;
  return relatedData.value.data.filter(({ id }) => id !== mainRecipeId)
});

</script>
