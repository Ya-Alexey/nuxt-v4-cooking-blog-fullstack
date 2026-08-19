<template>
  <img 
    class="image-content"
    :src
    :alt
  >
</template>

<script lang="ts" setup>
const {
  src,
  alt = '',
} = defineProps<{
  src: string
  alt?: string
}>();
</script>

<style lang="scss" scoped>
.image-content {
  aspect-ratio: 0.82 / 1;
  width: 100%;
  object-fit: cover;
  border-radius: 16px;
  margin: 24px 0;
  border: 1px solid var(--dark-color-alpha-24);
  @include media("min800") {
    aspect-ratio: 4 / 3;
    border-radius: 24px;
  }
}
</style>