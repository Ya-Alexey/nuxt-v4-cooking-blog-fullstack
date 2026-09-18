<template>
  <section class="about-welcome">
    <h1 class="about-welcome__title fnt-h1">
      Ваш проводник в&nbsp;мир вкусов 
    </h1>
    <p class="about-welcome__descr fnt-p-1">
      Bonjour! Рада видеть вас на&nbsp;моей кухне. Меня зовут <strong>Изабелла Руссо</strong>, 
      и&nbsp;я&nbsp;создательница этого вкусного пространства&nbsp;&mdash; Cooks Delight.
      Приглашаю вас в&nbsp;гастрономическое путешествие, где у&nbsp;каждого блюда есть своя история, 
      а&nbsp;каждый рецепт&nbsp;&mdash; это настоящая симфония вкуса.
    </p>
    <BaseBtn 
      theme="secondary"
      class="about-welcome__btn"
    >В поисках вкуса</BaseBtn>
  </section>
</template>

<style lang="scss" scoped>
.about-welcome {
  display: grid;
  row-gap: 16px;
  justify-items: start;
  padding: 48px 0;
  @include media("min1000") {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr min-content;
    column-gap: 12px;
    padding: 64px 0;
  }
  &__title {
    margin: 0;
    @include media("min1000") {
      grid-row: 1 / 3;
    }
  }
  &__descr {
    margin: 0 0 24px;
    opacity: 0.8;
    @include media("min1000") {
      align-self: flex-end;
    }
  }
  &__btn {
    @include media("min1000") {
      grid-area: 2 / 2 / 3 / 3;
    }
  }
}
</style>