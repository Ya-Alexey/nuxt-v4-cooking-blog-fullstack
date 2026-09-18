<template>
  <div class="user-profile">
    <!-- NOTE, если развивать, тут можно сделать возможность редактировать данные пользователя -->
    <div class="user-profile__row">
      <span class="user-profile__caption">Имя: </span>
      <span class="user-profile__value fnt-h4">{{ userData.name }}</span>
    </div>

    <div class="user-profile__row">
      <span class="user-profile__caption">Email: </span>
      <span class="user-profile__value fnt-h4">{{ userData.email }}</span>
    </div>

    <BaseBtn 
      theme="default"
      @click="onLogOut()"
    >Выйти</BaseBtn>
  </div>
</template>

<script lang="ts" setup>
import { createAuthClient } from 'better-auth/vue';

defineProps<{
  userData: {
    name: string,
    email: string,
  }
}>();

const authClient = createAuthClient();

async function onLogOut() {
  await authClient.signOut({
    fetchOptions: {
      'onSuccess': () => {
        reloadNuxtApp();
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  &__row {
    display: flex;
    column-gap: 8px;
  }
  &__caption {
    opacity: 0.6;
  }
}
</style>