<template>
  <div class="section-author">
    <img 
      class="section-author__image"
      src="/images/Author_Image.webp" 
      alt="" 
      loading="lazy"
    >
    <div class="section-author__name">Изабелла Руссо</div>
    <div class="section-author__descr fnt-p-2">
      Среди сотен кастрюль и сковородок моя главная миссия — превращать каждый обед в шедевр. Cooks Delight — это не просто блог. Это наше общее пространство, где любовь к еде стирает любые границы. Здесь мы воспеваем искусство создавать блюда, которые не только насыщают тело, но и питают душу.
    </div>

    <BaseBtn
      class="section-author__btn" 
      theme="default-outline"
      tag="NuxtLink"
      to="/about-us"
    >Познакомиться ближе</BaseBtn>
  </div>
</template>

<style lang="scss" scoped>
.section-author {
  @include media('min800') {
    display: grid;
    grid-template-columns: 120px 1fr;
    grid-auto-rows: min-content;
    grid-template-areas: 
      "image name"
      "image descr"
      "image button"
    ;
    column-gap: 16px;
  }
  &__image {
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
    @include media('min800') {
      width: 120px;
      height: 120px;
      align-self: flex-start;
      grid-area: image;
    }
  }
  &__name {
    font-size: 16px;
    line-height: 1.2;
    font-weight: 500;
    opacity: 0.8;
    margin-bottom: 12px;
    @include media('min800') {
      grid-area: name;
    }
  }
  &__descr {
    opacity: 0.8;
    margin-bottom: 24px;
    @include media('min800') {
      grid-area: descr;
    }
  }
  &__btn {
    width: fit-content;
    @include media('min800') {
      grid-area: button;
    }
  }
}
</style>