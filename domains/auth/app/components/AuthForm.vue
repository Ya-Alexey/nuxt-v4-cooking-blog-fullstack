<template>
  <div class="auth-form">
    <div 
      class="auth-form__title fnt-h3"
    >
      {{ fromTitle }}
    </div>

    <BtnCircled
      class="auth-form__close"
      aria-label="закрыть попап"
      @click="$emit('clickClose')"
    >
      <SvgIcon name="icon-close"/>
    </BtnCircled>

    <FormSignUp 
      v-if="currentAuth.signUp"
      class="auth-form__form" 
    />

    <FormSignIn 
      v-if="currentAuth.signIn"
      class="auth-form__form" 
    />

    <UserProfile 
      v-if="currentAuth.signOut"
      :user-data="userData!"
    />

    <BaseBtn 
      v-if="currentAuth.signUp"
      type="button"
      theme="default-outline"
      @click="changeAuthVariant('signIn')"
    >Войти</BaseBtn>

    <BaseBtn 
      v-if="currentAuth.signIn"
      type="button"
      theme="default-outline"
      @click="changeAuthVariant('signUp')"
    >Зарегистрироваться</BaseBtn>

  </div>
</template>

<script lang="ts" setup>
import { useAuthState } from '#domain_auth/composables/useAuthState';
import FormSignUp from '#domain_auth/components/FormSignUp.vue';
import FormSignIn from '#domain_auth/components/FormSignIn.vue';
import UserProfile from '#domain_auth/components/UserProfile.vue';

type AuthVariant = 'signUp' | 'signIn' | 'signOut';

defineEmits<{
  'clickClose': [],
  'onSubmit': [],
}>();

const titleMap: { [K in AuthVariant ]: string } = {
  signUp: 'Зарегестрироваться',
  signIn: 'Войти',
  signOut: 'Личные данные',
};

const authState = useAuthState();
const userData = computed(() => authState.value.data?.user ?? null);
const hasUser = computed(() => !!userData.value);
const authVariant = ref<AuthVariant>(hasUser.value ? 'signOut' : 'signUp');

const currentAuth = computed<{ [K in AuthVariant ]: boolean }>(() => {
  const variant = authVariant.value;
  return {
    signUp: variant === 'signUp',
    signIn: variant === 'signIn',
    signOut: variant === 'signOut',
  };
});

const fromTitle = computed(() => titleMap[authVariant.value]);

function changeAuthVariant(variant: AuthVariant) {
  authVariant.value = variant;
}
</script>

<style lang="scss" scoped>
.auth-form {
  position: relative;
  z-index: 1;
  padding: 40px 16px;
  max-width: 600px;
  width: 100%;
  border-radius: var(--section-border-radius);
  border: 1px solid var(--dark-color-alpha-24);
  background-color: var(--background-app);
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>