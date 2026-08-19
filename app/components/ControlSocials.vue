<template>
  <div class="control-socials">
    <div class="control-socials__label">
      <slot></slot>
    </div>
    <MenuSocials 
      theme="dark"
    />
  </div>
</template>

<style lang="scss" scoped>
.control-socials {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 24px;
  padding: 12px 24px;
  border-radius: 24px;
  border: 1px solid var(--dark-color);
  &__label {
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-weight: 500;
  }
}

</style>