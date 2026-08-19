<template>
  <component
    :is="componentTag"
    class="nav-link reset-btn"
    :active-class="activeLinkClass"
    :class="classes"
    :type="defaultBtnType"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { ControlTag } from '~/types/common';

const {
  tag = 'button',
  state = 'default',
  size = 'default',
} = defineProps<{
  tag?: ControlTag
  state?: 'default' | 'active',
  size?: 'default' | 'small',
}>();

const componentTag = useDynamicHtmlTag(() => tag);
const defaultBtnType = useDefaultButtonType(() => tag === 'button');

const classes = computed(() => ({
  [`nav-link--state-${state}`]: state !== 'default',
  [`nav-link--size-${size}`]: size !== 'default',
}));

const activeLinkClass = computed(() => {
  if (tag !== 'NuxtLink') {
    return;
  }
  return 'nav-link--state-active'
});
</script>

<style lang="scss" scoped>
.nav-link {
  --border-color: var(--light-color);
  display: block;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
  color: var(--background-app);
  padding: 16px 8px;
  border-bottom: 1px solid;
  text-transform: uppercase;
  @include apply-tint(border-color, var(--border-color), 84%);
  @include transition-default(border-color);
  @include mediaHover() {
    border-color: var(--border-color);
  }
  &--state-active {
    --border-color: var(--primary-color-2);
    cursor: default;
    border-color: var(--border-color);
  }
  &--size-small {
    font-size: 14px;
    font-weight: 500;
    padding: 12px 0;
  }
  &:focus-visible {
    outline: 2px solid var(--primary-color-2);
    outline-offset: 2px;
    border-radius: 2px;
  }
}
</style>