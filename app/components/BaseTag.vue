<template>
  <div class="base-tag">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.base-tag {
  padding: 4px 8px;
  border-radius: 12px;
  background-color: var(--primary-color-3);
  color: var(--background-app);
  font-size: 14px;
  line-height: 1.14;
  font-weight: 500;
  text-transform: uppercase;
}
</style>