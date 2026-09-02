<template>
  <div 
    class="base-popup"
    @click.self="$emit('clickOveraly')"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  'clickOveraly': [],
}>()
</script>

<style lang="scss" scoped>
.base-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(76, 79, 83, 0.6);
  z-index: var(--z-base-popup);
}
</style>