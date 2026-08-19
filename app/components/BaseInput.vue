<template>
  <input 
    v-model="inputValue"
    class="base-input"
    :class="classes"
    type="text" 
  >
</template>

<script lang="ts" setup>
const {
  state = 'default',
} = defineProps<{
  state?: 'default' | 'invalid'
}>();

const inputValue = defineModel<string>({ required: true });

const classes = computed(() => ({
  [`base-input--state-${state}`]: state !== 'default'
}));
</script>

<style lang="scss" scoped>
.base-input {
  --outline-color: var(--primary-color-2);
  border: 1px solid var(--background-app);
  outline: none;
  background-color: var(--background-app);
  padding: 0;
  font-size: 16px;
  line-height: 1.4;
  padding: 13px 23px;
  border-radius: 24px;
  @include apply-tint(color, var(--dark-color), 20%);
  @include transition-default(color, border-color);
  @include mediaHover() {
    color: var(--dark-color);
    border-color: var(--dark-color);
  }
  &::placeholder {
    @include apply-tint(color, var(--dark-color), 60%)
  }
  &:focus-visible {
    border-color: var(--dark-color);
  }
  &.base-input--state-invalid {
    color: var(--primary-color-3);
    text-decoration: underline;
    text-decoration-color: var(--primary-color-3);
    text-decoration-style: dashed;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }
}
</style>