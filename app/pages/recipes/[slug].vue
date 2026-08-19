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
      <!-- <SectionArticle /> -->
      <ContentRenderer 
        :value="recipeData" 
      />
    </main>
    <LazyHydrationSectionSwiper 
      v-if="relatedRecipes?.length"
      :recipe-list="relatedRecipes"
      :hydrate-on-visible="{ rootMargin: '100px' }" 
    >
      <template #title>Похожие рецепты</template>
    </LazyHydrationSectionSwiper>
  </template>
</template>

<script lang="ts" setup>
import type { RecipeCard } from '~/types/common';

const LazyHydrationSectionSwiper = defineLazyHydrationComponent(
  'visible',
  () => import('~/components/SectionSwiper.vue'),
);

const route = useRoute();

const {
  data: recipeData,
} = await useAsyncData(
  route.path, 
  () => queryCollection('recipes')
    .path(route.path)
    .first()
);

const { data: relatedRecipes } = await useAsyncData<RecipeCard[]>(
  `related-for-${route.path}`, 
  () => {
    const recipe = recipeData?.value
    if (!recipe) {
      return Promise.resolve([])
    }
    const query = queryCollection('recipes')
      .where('category', '=', recipe.category)
      .where('path', '<>', recipe.path);

    return selectRecipeCardFields(query)
      .limit(5)
      .all()
  },
  {
    watch: [() => recipeData.value?.path]
  }
);

useProvideRecipeItemContext(recipeData);

watchEffect(() => {
  console.log('recipeData', recipeData.value);
  
  if (recipeData.value === null) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true
    });
  }
});
</script>
