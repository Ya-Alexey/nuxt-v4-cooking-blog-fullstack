<template>
  <div class="menu-socials">
    <LinkSocial 
      v-for="link in socialList"
      :key="link.key"
      :icon-name="link.icon"
      :to="link.url"
      :aria-label="link.label"
      target="_blank"
      :theme="theme"
    />
  </div>
</template>

<script lang="ts" setup>
const {
  theme='light'
} = defineProps<{
  theme?: 'light' | 'dark',
}>();
</script>

<style lang="scss" scoped>
.menu-socials {
  display: flex;
  justify-content: center;
  column-gap: 16px;
}
</style>