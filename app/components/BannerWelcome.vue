<template>
  <section class="banner-welcome">
    <h1 class="banner-welcome__title fnt-h1">Высший пилотаж на&nbsp;вашей кухне</h1>
    <p class="banner-welcome__descr fnt-p-1">
      Исследуйте многообразие вкусов, открывайте уникальные домашние рецепты и&nbsp;готовьте с&nbsp;любовью вместе с&nbsp;нами
    </p>
    <BaseBtn 
      theme="secondary"
      tag="NuxtLink"
      to="/recipes-catalog"
    >В поисках вкуса</BaseBtn>

    <picture
      class="banner-welcome__picture"
    >
      <source media="(min-width: 800px)" srcset="/images/Hero-Section.webp">
      <img 
        fetchpriority="high"
        class="banner-welcome__image" 
        src="/images/Hero-Section-Mobile.webp" 
        alt="Шеф-повар готовит сочное мясо с томатами черри и розмарином на сковороде"
      >
    </picture>
  </section>
</template>

<style lang="scss" scoped>
.banner-welcome {
  --header-offset: 115px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(90vh - var(--header-offset));
  min-height: calc(100svh - var(--header-offset));
  padding: 16px;
  color: var(--background-app);
  border-radius: var(--section-border-radius);
  overflow: hidden;
  @include media("min800") {
    min-height: 578px;
  }
  &__title {
    text-align: center;
    margin-top: 0;
    margin-bottom: 12px;
    max-width: 580px;
    width: 100%;
    @include media("min800") {
      max-width: 870px;
    }
  }
  &__descr {
    text-align: center;
    margin-top: 0;
    margin-bottom: 40px;
    max-width: 500px;
    width: 100%;
    @include media("min800") {
      max-width: 450px;
    }
  }
  &__picture {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--dark-color);
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      @include apply-tint(background-color, var(--dark-color), 40%);
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>