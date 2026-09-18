<template>
  <section class="about-main">
    <div class="about-main__top">
      <div class="about-main__author">
        <img 
          class="about-main__image"
          src="/images/Author_Image.webp" 
          alt="" 
          loading="lazy"
        >
        <ControlSocials>Территория магии</ControlSocials>
      </div>
      <div class="about-main__content">
        <h2 class="about-main__title fnt-h2">
          От&nbsp;традиций Италии к&nbsp;мировым вкусам
        </h2>
        <p class="about-main__descr fnt-p-2">
          Я&nbsp;родилась и&nbsp;выросла в&nbsp;Италии, среди ярких красок и&nbsp;вкусов местной кухни, а&nbsp;моё кулинарное путешествие началось в&nbsp;самом сердце нашего дома&nbsp;&mdash; на&nbsp;семейной кухне. Окруженная ароматами свежих трав, шкворчанием сковородок и&nbsp;смехом близких, я&nbsp;всем сердцем полюбила искусство готовить. Мой путь в&nbsp;кулинарии пролегал через исторические улочки Рима и&nbsp;шумные рынки Флоренции&nbsp;&mdash; именно там я&nbsp;оттачивала мастерство и&nbsp;училась ценить простоту и&nbsp;подлинность итальянских традиций.
        </p>
        <p class="about-main__descr fnt-p-2">
          Движимая бесконечным любопытством, я&nbsp;отправилась в&nbsp;кругосветное путешествие за&nbsp;новыми вкусами и&nbsp;вдохновением, которые таят в&nbsp;себе кухни разных народов мира. От&nbsp;пряных рынков Марракеша до&nbsp;уютных суши-баров Токио&nbsp;&mdash; каждый новый опыт добавлял свой неповторимый штрих на&nbsp;холст моего кулинарного творчества.
        </p>
        <p class="about-main__descr fnt-p-2">
          Опытный&nbsp;ли вы&nbsp;домашний повар или только начинаете своё кулинарное приключение&nbsp;&mdash; я&nbsp;искренне рада, что вы&nbsp;здесь. Давайте вместе смешивать, тушить и&nbsp;наслаждаться красотой создания чего-то по-настоящему чудесного!
        </p>
        <p class="about-main__descr fnt-p-2">
          С теплом и вкусом
        </p>
        <img 
          class="about-main__caption" 
          src="/images/author_title.svg" 
          alt=""
          loading="lazy"
        >
      </div>
    </div>
    <div class="about-main__grid">
      <img
        v-for="(image, idx) in galleryList" 
        :key="idx"
        class="about-main__gallery"
        :src="image" 
        alt=""
        loading="lazy"
      >
    </div>
  </section>
</template>

<script lang="ts" setup>
const galleryList = [
  '/images/about/Image.webp',
  '/images/about/Image-1.webp',
  '/images/about/Image-2.webp',
  '/images/about/Image-3.webp',
  '/images/about/Image-4.webp',
  '/images/about/Image-5.webp',
  '/images/about/Image-6.webp',
  '/images/about/Image-7.webp',
];
</script>

<style lang="scss" scoped>
.about-main {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 16px;
  border: 1px solid var(--dark-color-alpha-24);
  border-radius: var(--section-border-radius);
  @include media("min800") {
    row-gap: 64px;
  }
  &__top {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    column-gap: 16px;
    row-gap: 40px;
    @include media("min800") {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
    }
  }
  &__author {
    @include media("min800") {
      position: sticky;
      top: 86px;
      align-self: flex-start;
    }
  }
  &__image {
    aspect-ratio: 0.65 / 1;
    border-radius: 12px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 16px;
    @include media("min800") {
      aspect-ratio: 4 / 3;
    }
  }
  &__title {
    margin: 0;
  }
  &__descr {
    opacity: 0.8;
    margin: 0;
  }
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    @include media("min800") {
      padding: 16px 24px;
    }
  }
  &__caption {
    align-self: flex-start;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(302px, 1fr));
    gap: 16px;
  }
  &__gallery {
    border-radius: 24px;
    aspect-ratio: 4 / 3;
    width: 100%;
    object-fit: cover;
  }
}
</style>