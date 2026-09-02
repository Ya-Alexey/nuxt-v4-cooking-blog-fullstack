<template>
  <form 
    @submit.prevent="onSubmit"
  >
    <LabelField>
      <template #label>Имя</template>
      <BaseInput 
        v-model="formFields.name"
        :state="validFields.name ? 'default' : 'invalid'"
        name="username" 
        type="text"
        placeholder="Изабелла Руссо"
        required
        v-autofocus="true"
      />
    </LabelField>
  
    <LabelField>
      <template #label>Email</template>
      <BaseInput 
        v-model="formFields.email"
        :state="validFields.email ? 'default' : 'invalid'"
        name="email" 
        type="email"
        placeholder="email@example.com"
        required
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
    >Зарегистрироваться</BaseBtn>
  </form>
</template>

<script lang="ts" setup>
import { createAuthClient } from 'better-auth/vue';

interface FormFields {
  name: string
  email: string
  password: string
}

const validRules: InputValidRules<FormFields> = {
  name: {
    minLength: 2,
    maxLength: 60,
  },
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
  name: '',
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
  await authClient.signUp.email({
    name: formFields.value.name,
    email: formFields.value.email,
    password: formFields.value.password,
  }, {
    'onSuccess': () => {
      reloadNuxtApp()
    }
  });
}
</script>
