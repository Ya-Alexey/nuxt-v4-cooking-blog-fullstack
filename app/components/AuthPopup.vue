<template>
  <BaseOverlay
    @click-overaly="onClose()"
  >
    <AuthForm 
      ref="authEl"
      @clickClose="onClose()"
    />
  </BaseOverlay>
</template>

<script lang="ts" setup>
const isActive = defineModel<boolean>('isActive', {
  required: true,
});

const authEl =  useTemplateRef('authEl');
useFocusTrap(() => authEl.value?.$el || null);

function onClose() {
  isActive.value = false;
}
</script>

