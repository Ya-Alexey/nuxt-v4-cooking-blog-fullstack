<template>
  <button
    class="btn-burger reset-btn"
    :class="classes"
    type="button"
    @click="toggleState()"
  >
    <span class="btn-burger__line"></span>
    <span class="btn-burger__line"></span>
    <span class="btn-burger__line"></span>
  </button>
</template>

<script lang="ts" setup>
const isActive = defineModel<boolean>('isActive', {
  default: true,
});

const wasPlayed = ref(false);

const classes = computed(() => ({
  'btn-burger--is-active': isActive.value,
  'btn-burger--was-playng': wasPlayed.value && !isActive.value,
}));

watch(isActive, (activeVal) => {
  if (activeVal) {
    wasPlayed.value = true;
  }
}, {
  once: true,
});

function toggleState() {
  isActive.value = !isActive.value;
}
</script>

<style lang="scss" scoped>
.btn-burger {
  --line-color: var(--dark-color);
  --bg-color: var(--dark-color);
  width: 34px;
  height: 34px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9px;
  row-gap: 3px;
  @include apply-tint(background-color, var(--bg-color), 84%);
  @include transition-default(background-color);
  @include mediaHover() {
    @include apply-tint(background-color, var(--bg-color), 74%);
  }
  &:focus-visible {
    outline: 1px solid var(--primary-color-2);
  }
  &--is-active {
    --line-color: var(--primary-color-2);
    --bg-color: var(--light-color);
    .btn-burger__line:nth-child(1),
    .btn-burger__line:nth-child(3) {
      animation: burgerLineActive var(--base-duration) var(--base-timing) forwards;
    }
    .btn-burger__line:nth-child(2) {
      opacity: 0;
    }
  }
  &--was-playng {
    .btn-burger__line:nth-child(1),
    .btn-burger__line:nth-child(3) {
      animation: burgerLineDefault var(--base-duration) var(--base-timing) forwards;
    }
  }
  &__line {
    --translate-x: 5px;
    --rotate-z: 45deg;
    height: 2px;
    width: 100%;
    border-radius: 2px;
    background-color: var(--line-color);
    @include transition-default(opacity, background-color);

    &:nth-child(3) {
      --translate-x: -5px;
      --rotate-z: -45deg;
    }
  }
}
@keyframes burgerLineActive {
  0% {
    transform: translate(0, 0) rotate(0);
  }
  25% {
    transform: translate(0, var(--translate-x)) rotate(0);
  }
  100% {
    transform: translate(0, var(--translate-x)) rotate(var(--rotate-z));
  }
}
@keyframes burgerLineDefault {
  0% {
    transform: translate(0, var(--translate-x)) rotate(var(--rotate-z));
  }
  75% {
    transform: translate(0, var(--translate-x)) rotate(0);
  }
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
</style>