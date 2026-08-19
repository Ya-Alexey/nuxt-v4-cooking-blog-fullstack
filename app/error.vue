<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout>
    <div class="error-page">
      <div class="error-page__inner">
        <img class="error-page__image" :src="errorData.image" alt="">
        <div 
          class="error-page__title fnt-h2" 
          v-html="errorData.title"
        ></div>
        <div 
          class="error-page__description fnt-p-2"
          v-html="errorData.description"
        ></div>
        <BaseBtn
          class="error-page__btn"
          theme="secondary"
          tag="NuxtLink"
          to="/"
        >
          {{ errorData.button }}
        </BaseBtn>
      </div>
    </div>
  </NuxtLayout>
</template>


<script lang="ts" setup>
const errorList = {
  404: {
    image: '/images/cook-404_v2.webp',
    title: 'Сбились с&nbsp;маршрута?',
    description: 'Гастрономические дороги иногда заводят в&nbsp;тупик. На&nbsp;этой странице ничего не&nbsp;готовится, но&nbsp;наш кулинарный гид готов вернуть вас на&nbsp;правильный путь.',
    button: 'Вернуться к карте вкусов',
  },
  500: {
    image: '/images/cook-500.webp',
    title: 'Авария на&nbsp;нашей кухне',
    description: 'В&nbsp;нашей кулинарной лаборатории что-то пошло не&nbsp;так: блюдо пересолено, а&nbsp;сервер временно перегружен. Наш шеф-повар уже чинит оборудование, чтобы вернуть вас на&nbsp;гастрономический маршрут. Попробуйте обновить страницу чуть позже!',
    button: 'Проверить главную кухню',
  }
} as const;

const error = useError();

const errorData = computed(() => {
  if (error.value?.status === 404) {
    return errorList['404']
  }
  return errorList['500']
});
</script>


<style lang="scss" scoped>
.error-page {
  @include media('min800') {
    padding: 64px 0;
  }
  &__image {
    aspect-ratio: 1 / 1;
    max-width: 100%;
    border-radius: 24px;
    @include media('min800') {
      grid-area: 1 / 2 / 4 / 2;
    }
  }
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 16px;
    @include media('min800') {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr auto 1fr;
      align-items: center;
      justify-items: center;
      column-gap: 16px;
    }
  }
  &__title {
    text-align: center;
    @include media('min800') {
      align-self: flex-end;
    }
  }
  &__description {
    text-align: center;
    opacity: 0.8;
  }
  &__btn {
    @include media('min800') {
      align-self: flex-start;
    }
  }
}
</style>