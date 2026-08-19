<template>
  <NuxtLink
    class="link-social"
    :class="classes"
    external
  >
    <SvgIcon 
      class="link-social__svg"
      :name="iconName"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
import SvgIcon from '~/components/global/SvgIcon.vue'

const { theme = 'light' } = defineProps<{
  iconName: string
  theme?: 'light' | 'dark',
}>();

const classes = computed(() => ({
  [`link-social--theme-${theme}`]: theme !== 'light',
}));
</script>

<style lang="scss" scoped>
.link-social {
  --fill-color: var(--background-app);
  --bg-color: var(--background-app);
  --fill-color-hover: var(--dark-color);
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  @include transition-default(background-color);
  @include mediaHover() {
    background-color: var(--bg-color);
    --fill-color: var(--fill-color-hover);
  }
  &--theme-dark {
    --fill-color: var(--dark-color);
    --bg-color: var(--dark-color);
    --fill-color-hover: var(--background-app);
  }
  &__svg {
    fill: var(--fill-color);
  }
  &:focus-visible {
    outline: 2px solid var(--primary-color-2);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
</style>