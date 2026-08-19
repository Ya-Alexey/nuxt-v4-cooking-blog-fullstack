<!-- eslint-disable vue/no-v-html -->
<template>
  <section class="recipe-details">
    <p class="recipe-details__title fnt-h4">
      <slot name="title"></slot>
    </p>
    <p 
      v-if="$slots.description"
      class="recipe-details__descr fnt-p-2" 
    >
      <slot name="description"></slot>
    </p>
    <ul class="recipe-details__list">
      <li 
        v-for="(item, idx) in list"
        :key="idx"
        class="recipe-details__item fnt-p-2"
        v-html="item"
      ></li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
const {
  list,
} = defineProps<{
  list: string[]
}>();
</script>

<style lang="scss" scoped>
.recipe-details {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 24px 16px;
  background-color: var(--light-color);
  border-radius: 24px;
  border: 1px solid var(--dark-color-alpha-24);
  &__title {
    color: var(--primary-color-3);
    margin: 0;
  }
  &__descr {
    margin: 0;
  }
  &__list {
    margin: 0;
    padding-left: 24px;
  }
}
</style>