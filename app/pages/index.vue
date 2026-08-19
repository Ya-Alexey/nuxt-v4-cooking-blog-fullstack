<template>
  <main class="page-main">
    <Head>
      <Title>Cooks Delight — Рецепты и гастрономические путешествия</Title>
      <Meta 
        name="description"
        content="Добро пожаловать в кулинарный мир Изабеллы Руссо. Откройте пошаговые рецепты со всего мира и отправляйтесь в незабываемое гастрономическое путешествие!"
      />
    </Head>
    <BannerWelcome />
    <SectionPalette />
    
    <LazyHydrationSectionSwiper 
      v-if="featuredRecipes?.length"
      :recipe-list="featuredRecipes"
      :hydrate-on-visible="{ rootMargin: '100px' }" 
    >
      <template #title>Рекомендуем</template>
    </LazyHydrationSectionSwiper>

    <SectionAbout />
  </main>
</template>

<script lang="ts" setup>
// const { data: users } = await useFetch('/api/users');

// watchEffect(() => {
//   console.log('users', users.value);
// });

const { data: featuredRecipes } = await useFeaturedRecipes();
const LazyHydrationSectionSwiper = defineLazyHydrationComponent(
  'visible',
  () => import('~/components/SectionSwiper.vue'),
);

// watchEffect(() => {
//   console.log('featuredRecipes', featuredRecipes.value);
// });
</script>

<style lang="scss" scoped>
.page-main {
  display: grid;
  grid-auto-rows: min-content;
  row-gap: var(--section-row-gap);
}
</style>