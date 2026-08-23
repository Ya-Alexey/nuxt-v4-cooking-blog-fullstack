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
    
    <LazySectionSwiper 
      v-if="featuredRecipes?.success"
      :recipe-list="featuredRecipes.data"
      hydrate-on-visible 
    >
      <template #title>Рекомендуем</template>
    </LazySectionSwiper>

    <LazySectionAbout hydrate-never/>
  </main>
</template>

<script lang="ts" setup>
const { data: featuredRecipes } = await useFeaturedRecipesApi();
</script>

<style lang="scss" scoped>
.page-main {
  display: grid;
  grid-auto-rows: min-content;
  row-gap: var(--section-row-gap);
}
</style>