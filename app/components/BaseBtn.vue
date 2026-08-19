<template>
  <component
    :is="componentTag"
    class="base-btn reset-btn"
    :class="classes"
    :type="defaultBtnType"
  >
    <span class="base-btn__inner">
      <slot />
    </span>
  </component>
</template>

<script lang="ts" setup>
import type { ControlTag } from '~/types/common';

const {
  tag = 'button',
  theme = 'default',
  state = 'default',
} = defineProps<{
  tag?: ControlTag
  theme?: 'default' | 'default-outline' | 'secondary' | 'dark-bg'
  state?: 'default' | 'active' | 'disabled' 
}>();

const componentTag = useDynamicHtmlTag(() => tag);
const defaultBtnType = useDefaultButtonType(() => tag === 'button');

const classes = computed(() => ({
  [`base-btn--theme-${theme}`]: theme !== 'default',
  [`base-btn--state-${state}`]: state !== 'default',
}));
</script>

<style lang="scss" scoped>
.base-btn {
  --border-color: var(--dark-color);
  --bg-color: var(--dark-color);
  --text-color: var(--background-app);

  --border-color-hover: var(--primary-color-2);
  --bg-color-hover: var(--light-color);
  --text-color-hover: var(--dark-color);

  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  padding: 10px 22px;
  border: 2px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  text-transform: uppercase;
  text-align: center;
  border-radius: 24px;
  @include transition-default(
    background-color, 
    border-color, 
    color, 
    opacity, 
    transform
  );
  @include mediaHover() {
    --bg-color: var(--bg-color-hover);
    --text-color: var(--text-color-hover);
    --border-color: var(--border-color-hover);
  }
  &:active {
    .base-btn__inner {
      transform: scale(0.96);
    }
  }
  &.base-btn--state-active {
    cursor: auto;
    --bg-color: var(--bg-color-hover);
    --text-color: var(--text-color-hover);
    --border-color: var(--border-color-hover);
  } 
  &:focus-visible {
    outline: 2px solid var(--primary-color-3);
    outline-offset: 2px;
    --bg-color: var(--bg-color-hover);
    --text-color: var(--text-color-hover);
    --border-color: var(--border-color-hover);
  }
  &:disabled,
  &.base-btn-state-disabled {
    cursor: auto;
    --border-color: var(--dark-color);
    --bg-color: var(--dark-color);
    --text-color: var(--background-app);
    opacity: 0.6;
  }
  &--theme-dark-bg {
    --border-color: transparent;
    --border-color-hover: rgba(255, 251, 242, 0.1);
    --bg-color: var(--light-color-alpha-16);
    --bg-color-hover: rgba(255, 251, 242, 0.1);
    --text-color-hover: var(--background-app    );
  }
  &--theme-secondary {
    --border-color: var(--primary-color-2);
    --bg-color: var(--primary-color-2);
    --text-color: var(--dark-color);

    --border-color-hover: var(--primary-color-1);
    --bg-color-hover: var(--primary-color-1);
    --text-color-hover: var(--dark-color);
  }
  &--theme-default-outline {
    --border-color: var(--dark-color);
    --bg-color: transparent;
    --text-color: var(--dark-color);

    --border-color-hover: var(--primary-color-1);
    --bg-color-hover: var(--primary-color-1);
    --text-color-hover: var(--dark-color);
  }
  &__inner {
    display: inline-block;
    @include transition-default(transform);
  }
}
</style>