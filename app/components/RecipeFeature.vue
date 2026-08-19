<template>
  <ul class="recipie-feature">
    <li class="recipie-feature__item">
      <SvgIcon 
        class="recipie-feature__icon" 
        name="icon-timer" 
      />
      {{ featureData.prepTime }} мин
    </li>
    <li class="recipie-feature__item">
      <SvgIcon 
        class="recipie-feature__icon" 
        name="icon-weight" 
      />
      {{ prepRegistry[featureData.prep] }}
    </li>
    <li class="recipie-feature__item">
      <SvgIcon 
        class="recipie-feature__icon" 
        name="icon-serving" 
      />
      {{featureData.servesCount}} {{ servicesLabel }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { RecipePrep } from '~/types/common';

const {
  featureData,
} = defineProps<{
  featureData: {
    prep: RecipePrep
    prepTime: number
    servesCount: number
  }
}>();

const servicesLabel = computed(() => declensionWord(featureData.servesCount, serveicesLabelList));
</script>

<style lang="scss" scoped>
.recipie-feature {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 24px;
  row-gap: 16px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  &__item {
    display: flex;
    align-items: center;
    column-gap: 8px;
    white-space: nowrap;
    font-family: var(--second-family);
    font-size: 18px;
    line-height: 1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    fill: var(--dark-color);
  }
}

</style>