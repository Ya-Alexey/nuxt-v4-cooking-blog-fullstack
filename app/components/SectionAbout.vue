<template>
  <section class="section-about">
    <div class="section-about__main">
      <BaseTag class="section-about__tag">{{ tagRegistry.about }}</BaseTag>
      <h2 class="section-about__title fnt-h2">Наша кулинарная летопись</h2>
      <p class="section-about__descr fnt-p-2">
        Наш путь соткан из преданности делу, творчества и искреннего желания дарить вам незабываемые вкусовые впечатления. Присоединяйтесь к нам, чтобы прочувствовать суть каждого блюда и узнать истории, которые за ними стоят.
      </p>
      <BaseBtn 
        theme="default-outline"
      >Подробнее</BaseBtn>
    </div>

    <img 
      class="section-about__image"
      loading="lazy"
      alt="Обжаривание крупного куска мяса со специями на горячей сковороде" 
      src="/images/about/Recipe_Card.webp" 
    >
    <img 
      class="section-about__image section-about__horizontal"
      loading="lazy"
      alt="Процесс приготовления горячего блюда на плите" 
      src="/images/about/Recipe_Card-1.webp" 
    >
    <img 
      class="section-about__image section-about__vertical"
      loading="lazy"
      alt="Повара за работой на ресторанной кухне" 
      src="/images/about/About_us.webp" 
    >
  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.section-about {
  display: grid;
  row-gap: 8px;
  padding: 40px 8px;
  border: 1px solid var(--dark-color-alpha-24);
  border-radius: var(--section-border-radius);
  @include media('min640') {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 16px;
    row-gap: 16px;
  }
  @include media('min800') {
    padding: 16px;
  }
  @include media('min1000') {
    grid-template-columns: 5fr 3fr 4fr;
  }
  &__main {
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @include media('min640') {
      justify-content: flex-end;
    }
    @include media('min800') {
      padding: 0 24px;
    }
  }
  &__tag {
    margin-bottom: 8px;
  }
  &__title {
    margin-top: 0;
    margin-bottom: 12px;
  }
  &__descr {
    margin-top: 0;
    margin-bottom: 8px;
    opacity: 0.8;
    @include media('min800') {
      margin-bottom: 12px;
    }
  }
  &__image {
    width: 100%;
    object-fit: cover;
    border-radius: 16px;
    aspect-ratio: 1 / 1;
  }
  &__horizontal {
    @include media('min1000') {
      aspect-ratio: 2.6 / 1;
      grid-area: 2 / 1 / 3 / 3;
    }
  }
  &__vertical {
    @include media('min1000') {
      aspect-ratio: 0.6 / 1;
      grid-area: 1 / 3 / 3 / 4;
    }
  }
}
</style>