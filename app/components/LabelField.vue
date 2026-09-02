<template>
  <label class="label-field">
    <span class="label-field__caption">
      <slot name="label"></slot>
    </span>
    <slot></slot>
  </label>
</template>

<style lang="scss" scoped>
.label-field {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  :slotted( > input) {
    background-color: var(--light-color);
  }
  &__caption {
    opacity: 0.6;
    padding: 0 4px;
  }
}
</style>