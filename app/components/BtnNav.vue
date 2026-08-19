<template>
  <button
    class="reset-btn btn-nav"
    :class="classes"
    type="button"
  >
    <SvgIcon 
      name="nav-arrow"
      class="btn-nav__svg"
    />
  </button>
</template>

<script lang="ts" setup>
const {
  direction = 'next',
} = defineProps<{
  direction?: 'next' | 'prev'
}>();

const classes = computed(() => ({
  [`btn-nav--direction-${direction}`]: direction !== 'next',
}));
</script>

<style lang="scss" scoped>
.btn-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid var(--dark-color);
  padding: 6px;
  border-radius: 100%;
  @include transition-default(
    border-color, 
    background-color, 
    transform
  );
  @include mediaHover() {
    border-color: var(--primary-color-1);
    background-color: var(--primary-color-1);
  }
  &:focus-visible {
    border-color: var(--primary-color-1);
    outline: 2px solid var(--primary-color-3);
    outline-offset: 2px;
    background-color: var(--primary-color-1);
  }
  &:disabled {
    cursor: auto;
    opacity: 0.24;
    border-color: var(--dark-color);
    background-color: transparent;
  }
  &:active {
    transform: scale(0.98);
  }
  &--direction-prev {
    .btn-nav__svg {
      transform: rotateY(180deg);
    }
  }
  &__svg {
    fill: var(--dark-color);
  }
}
</style>