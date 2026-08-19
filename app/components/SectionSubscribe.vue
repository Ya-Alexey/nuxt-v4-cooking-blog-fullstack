<template>
  <section class="section-subscribe">
    <p class="section-subscribe__title">
      Будет вкусно! Подпишитесь сейчас
    </p>
    <p class="section-subscribe__descr fnt-p-1">
      Подпишитесь, чтобы раз в&nbsp;неделю получать новые рецепты, лайфхаки и&nbsp;эксклюзивные материалы прямо на&nbsp;вашу почту
    </p>

    <form 
      class="section-subscribe__form"
      @submit.prevent="onSubmit"
    >
      <BaseInput 
        v-model="emainVal"
        :state="inputState"
        class="section-subscribe__input"
        aria-label="Ваш email"
        name="email" 
        type="email"
        placeholder="Ваш email"
        required
      />
      <BaseBtn 
        class="section-subscribe__btn"
        type="submit"
      >Подписаться</BaseBtn>
    </form>
  </section>
</template>

<script lang="ts" setup>
const emainVal = ref('');
const isValidEmail = useValidEmail(emainVal);
const inputState = ref<'default' | 'invalid'>('default');

watch(emainVal, resetInputState);

function resetInputState() {
  inputState.value = 'default';
}

function onSubmit() {
  console.log('emainVal', emainVal.value);
  if (!isValidEmail.value) {
    inputState.value = 'invalid';
  }
}
</script>

<style lang="scss" scoped>
.section-subscribe {
  padding: 64px 16px;
  border-radius: var(--section-border-radius);
  color: var(--background-app);
  background-color: var(--primary-color-3);
  background-image: 
    radial-gradient(570px 390px at top, #FF6653 0%, #FF6653 70%, transparent 70%),
    radial-gradient(570px 390px at bottom, #FF6653 0%, #FF6653 70%, transparent 70%)
  ;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 -50px, 0px 50px; 
  @include media("min480") {
    background-position: 0 -80px, 0px 80px; 
  }
  @include media("min800") {
    padding: 64px 100px;
  }
  @include media("min1000") {
    background-image: 
      radial-gradient(92vw 722px at top, #FF6653 0%, #FF6653 48%, transparent 48%),
      radial-gradient(92vw 722px at bottom, #FF6653 0%, #FF6653 48%, transparent 48%)
    ;
    background-position: 0 -116px, 0px 116px; 
  }
  .section-subscribe__input {
    --outline-color: var(--dark-color);
  }
  .section-subscribe__btn {
    --border-color-hover: var(--dark-color  );
    outline-color: var(--dark-color);
    outline-offset: 0px;
    outline-width: 1px;
  }
  &__title {
    font-size: 38px;
    font-weight: 800;
    text-align: center;
    max-width: 470px;
    margin: 0 auto 12px;
    @include media("min1000") {
      font-size: 80px;
      letter-spacing: -0.01rem;
      font-weight: 700;
      max-width: 890px;
    }
  }
  &__descr {
    text-align: center;
    max-width: 470px;
    margin: 0 auto 48px;
    @include apply-tint(color, var(--light-color), 20%);
    @include media("min1000") {
      color: var(--light-color);
      max-width: 650px;
      font-weight: 700;
    }
  }
  &__form {
    display: grid;
    grid-auto-rows: 1fr;
    row-gap: 8px;
    max-width: 470px;
    margin: 0 auto;
    @include media("min1000") {
      position: relative;
      z-index: 1;
    }
  }
  &__input {
    @include media("min1000") {
      padding-right: 168px;
    }
  }
  &__btn {
    @include media("min1000") {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
    }
  }
}
</style>