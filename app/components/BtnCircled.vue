<template>
  <button
    class="btn-circled reset-btn"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn-circled {
  --bg-color: var(--dark-color);
  --fill-color: var(--dark-color);
  width: 34px;
  height: 34px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 9px;
  @include apply-tint(background-color, var(--bg-color), 84%);
  @include transition-default(background-color);
  @include mediaHover() {
    @include apply-tint(background-color, var(--bg-color), 74%);
  }
  &:focus-visible {
    outline: 1px solid var(--primary-color-2);
  }
  &:deep(svg) {
    fill: var(--fill-color);
  }
}

</style>