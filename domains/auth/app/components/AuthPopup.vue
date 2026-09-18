<template>
  <BaseOverlay
    @click-overaly="onClose()"
  >
    <AuthForm 
      ref="authEl"
      @click-close="onClose()"
    />
  </BaseOverlay>
</template>

<script lang="ts" setup>
import AuthForm from '#domain_auth/components/AuthForm.vue';

const isActive = defineModel<boolean>('isActive', {
  required: true,
});

const authEl =  useTemplateRef('authEl');
useFocusTrap(() => authEl.value?.$el || null);

function onClose() {
  isActive.value = false;
}
</script>

