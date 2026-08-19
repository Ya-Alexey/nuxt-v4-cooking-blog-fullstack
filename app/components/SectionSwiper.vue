<template>
  <section class="section-swiper">
    <h2 class="section-swiper__title fnt-h2">
      <slot name="title"></slot>
    </h2>

    <div 
      class="section-swiper__nav"
      :class="navClasses"
    >
      <BtnNav 
        class="section-swiper__prev"
        direction="prev"
        :disabled="isBeginSlider"
        aria-label="Предыдущий слайд"
        @click="prev()"
      />
      <BtnNav 
        class="section-swiper__next"
        :disabled="isEndSlider"
        aria-label="Следующий слайд"
        @click="next()"
      />
    </div>

     <ClientOnly>
      <swiper-container 
        ref="containerRef"
        class="section-swiper__wrapper"
        @swiperslidechange="onSlideChange"
      >
        <swiper-slide
          v-for="slide in recipeList"
          :key="slide.id"
        >
          <CardRecipe 
            class="section-swiper__card"
            :card-data="slide"
          />
        </swiper-slide>
      </swiper-container>

      <template #fallback>
        <div class="section-swiper__wrapper">
          <div 
            v-for="slide in recipeList"
            :key="slide.id"
            class="section-swiper__slide"
          >
            <CardRecipe 
              class="section-swiper__card"
              :card-data="slide"
            />
          </div>
        </div>
      </template>
     </ClientOnly>
  </section>
</template>

<script lang="ts" setup>
import type { Swiper } from 'swiper'
import type { RecipeCard } from '~/types/common';

const {
  recipeList,
} = defineProps<{
  recipeList: RecipeCard[]
}>();

const isEndSlider = ref(false);
const isBeginSlider = ref(true);
const containerRef = ref(null);

const { next, prev } = useSwiper(containerRef, {
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 8,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 8,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});

const navClasses = computed(() => ({
  'section-swiper__nav--hide-s': recipeList.length === 1,
  'section-swiper__nav--hide-m': recipeList.length < 3,
  'section-swiper__nav--hide-l': recipeList.length < 4,
}));

function onSlideChange(event: CustomEvent<[Swiper]>) {
  const [ swiperInstance ] = event.detail;
  isEndSlider.value = swiperInstance.isEnd;
  isBeginSlider.value = swiperInstance.isBeginning;
}
</script>

<style lang="scss" scoped>
.section-swiper {
  padding: 40px 16px;
  border-radius: var(--section-border-radius);
  border: 1px solid var(--dark-color-alpha-24);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  @include media("min800") {
    padding-bottom: 16px;
    grid-template-columns: 1fr min-content;
    column-gap: 16px;
    row-gap: 40px;
  }
  &__title {
    margin-top: 0;
    margin-bottom: 24px;
    @include media("min800") {
      margin-bottom: 0;
    }
  }
  &__nav {
    display: flex;
    margin-bottom: 40px;
    display: flex;
    column-gap: 8px;
    @include media("min800") {
      margin-bottom: 0;
    }
    &--hide-s {
      display: none;
    }
    &--hide-m {
      @include media("min640") {
        display: none;
      }
    }
    &--hide-l {
      @include media("min1000") {
        display: none;
      }
    }
  }
  &__wrapper {
    width: 100%;
    display: flex;
    overflow: hidden;
    column-gap: 8px;
    @include media("min800") {
      grid-column: 1/-1;
    }
    @include media("min1000") {
      column-gap: 16px;
    }
  }
  &__slide {
    width: 100%;
    flex-shrink: 0;
    @include media("min640") {
      max-width: calc(50% - 4px);
    }
    @include media("min1000") {
      max-width: calc(100% / 3 - (16px * 2 / 3));
    }
  }
  &__card {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }
}
</style>