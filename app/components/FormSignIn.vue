<template>
  <form 
    @submit.prevent="onSubmit"
  >  
    <LabelField>
      <template #label>Email</template>
      <BaseInput 
        v-model="formFields.email"
        :state="validFields.email ? 'default' : 'invalid'"
        name="email" 
        type="email"
        placeholder="email@example.com"
        required
        v-autofocus="true"
      />
    </LabelField>
  
    <LabelField>
      <template #label>Пароль</template>
      <BaseInput 
        v-model="formFields.password"
        :state="validFields.password ? 'default' : 'invalid'"
        name="password" 
        type="password"
        placeholder="Password"
        required
      />
    </LabelField>
  
    <BaseBtn 
      type="submit"
      theme="default"
      :disabled="isSendRequest"
    >Войти</BaseBtn>
  </form>
</template>

<script lang="ts" setup>
import { createAuthClient } from 'better-auth/vue';

interface FormFields {
  email: string
  password: string
}

const validRules: InputValidRules<FormFields> = {
  email: {
    patternRegExp: PATTERNT_EMAIL,
  },
  password: {
    minLength: 8,
    maxLength: 128,
  }
};

const authClient = createAuthClient();

const formFields = ref({
  email: '',
  password: '',
});

const isSendRequest = ref(false);

const {
  validFields,
  hasSomeInvalid,
} = useValidInputScheme(formFields, validRules);

async function onSubmit() {
  if (hasSomeInvalid.value || isSendRequest.value) {
    return;
  }
  isSendRequest.value = true;
  await authClient.signIn.email({
    email: formFields.value.email,
    password: formFields.value.password,
  }, {
    'onSuccess': () => {
      reloadNuxtApp()
    }
  });
}
</script>