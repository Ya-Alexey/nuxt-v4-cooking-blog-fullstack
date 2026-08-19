<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <main>
    <Head>
      <Title>Изабелла Руссо — Создательница кулинарного пространства Cooks Delight</Title>
      <Meta 
        name="description"
        content="Познакомьтесь ближе с создательницей Cooks Delight. Изабелла Руссо делится своей философией кулинарии как путешествия. У каждого блюда есть история — откройте ее вместе с нами!"
      />
    </Head>
    <AboutWelcome />
    <AboutMain />
  </main>
  <SectionSwiper 
    v-if="featuredRecipes?.length"
    :recipe-list="featuredRecipes"
  >
    <template #title>Рекомендуем</template>
  </SectionSwiper>
</template>

<script lang="ts" setup>
const { data: featuredRecipes } = await useFeaturedRecipes();
</script>