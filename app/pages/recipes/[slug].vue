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
    <!-- TODO рекомендуемое -->
    <!-- <LazyHydrationSectionSwiper 
      v-if="relatedRecipes?.length"
      :recipe-list="relatedRecipes"
      :hydrate-on-visible="{ rootMargin: '100px' }" 
    >
      <template #title>Похожие рецепты</template>
    </LazyHydrationSectionSwiper> -->
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

const recipeData = computed(() => pageData.value?.data)
</script>
