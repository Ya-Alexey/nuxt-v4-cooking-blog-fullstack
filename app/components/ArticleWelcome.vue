<template>
  <section class="article-welcome">
    <BaseTag class="article-welcome__tag">{{ tagRegistry.recipe }}</BaseTag>
    <h1 class="article-welcome__title fnt-h1">
      {{ welcomeData.title }}
    </h1>
    <p class="article-welcome__descr fnt-p-1">
      {{ welcomeData.welcomeDescription }}
    </p>
    <RecipeFeature  
      class="article-welcome__list" 
      :feature-data="welcomeData"
    />
    <img 
      class="article-welcome__image"
      :src="welcomeData.preview" 
      alt="" 
      fetchpriority="high"
    >
  </section>
</template>

<script lang="ts" setup>
import type { RecipeWelcome } from '~/types/common';

defineProps<{
  welcomeData: RecipeWelcome
}>();
</script>

<style lang="scss" scoped>
.article-welcome {
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 12px;
  justify-items: center;
  .article-welcome__list {
    margin: 28px 0;
  }
  &__title {
    margin: 0;
    text-align: center;
  }
  &__descr {
    text-align: center;
    opacity: 0.8;
    max-width: 648px;
    width: 100%;
    margin: 0;
  }
  &__image {
    display: block;
    border-radius: 16px;
    aspect-ratio: 0.65 / 1;
    width: 100%;
    object-fit: cover;
    @include media('min800') {
      aspect-ratio: 1.925 / 1;
      border-radius: 24px;
    }
  }
}
</style>