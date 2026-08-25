<template>
  <article class="card-recipe">
    <img 
      class="card-recipe__preview" 
      :src="cardData.preview" 
      alt=""
      loading="lazy"
    >
    <div class="card-recipe__content">
      <p class="card-recipe__title fnt-h3">
        {{ cardData.title }}
      </p>
      <p class="card-recipe__descr fnt-p-2">
        {{ cardData.description }}
      </p>
  
      <img 
        v-if="cardData.vegan"
        class="card-recipe__tag" 
        src="/images/recipe-type-vagen.svg" 
        alt="Веганское блюдо"
      >
  
      <div class="card-recipe__row">
        <div class="card-recipe__info">{{ quickStats }}</div>
        <BaseBtn
          class="card-recipe__link"
          tag="NuxtLink"
          :to="`/recipes/${cardData.slug}`"
          theme="default-outline"
        >Заглянуть в рецепт</BaseBtn>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { RecipeCard } from '~~/server/schemas/recipes';

const {
  cardData,
} = defineProps<{
  cardData: RecipeCard
}>();

const quickStats = computed(() => {
  const { prep, prepTime, servesCount } = cardData;
  const servicesLabel = declensionWord(servesCount, serveicesLabelList);
  return `${prepTime} мин - ${prepRegistry[prep]} - ${servesCount} ${servicesLabel}`;
});
</script>

<style lang="scss" scoped>
.card-recipe {
  --border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  @include media("min800") {
    --border-radius: 24px;
  }
  &__preview {
    display: block;
    aspect-ratio: 4/3;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    width: 100%;
    object-fit: cover;
    background-color: var(--light-color);
  }
  &__content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    background-color: var(--light-color);
    @include apply-tint(border-color, var(--dark-color), 84%);
    @include media("min800") {
      padding: 24px 24px 16px;
    }
  }
  &__title {
    margin-top: 0;
    margin-bottom: 12px;
  }
  &__descr {
    margin-top: 0;
    margin-bottom: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    @include media("min800") {
      margin-bottom: 54px;
    }
  }
  &__tag {
    width: 66px;
    height: 66px;
    position: absolute;
    z-index: 1;
    right: 16px;
    top: 0;
    margin-top: calc(100% / (4/3));
    transform: translateY(-70%);
  }
  &__row {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 12px;
    row-gap: 16px;
  }
  &__info {
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    margin-right: auto;
  }
  &__link {
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }
  }
}
</style>