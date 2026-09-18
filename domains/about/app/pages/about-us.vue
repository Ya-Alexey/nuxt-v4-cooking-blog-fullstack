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
    v-if="featuredRecipes?.success"
    :recipe-list="featuredRecipes.data"
  >
    <template #title>Рекомендуем</template>
  </SectionSwiper>
</template>

<script lang="ts" setup>
import AboutWelcome from '#domain_about/components/AboutWelcome.vue'
import AboutMain from '#domain_about/components/AboutMain.vue'

const { data: featuredRecipes } = await useFeaturedRecipesApi();
</script>