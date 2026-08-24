<template>
  <main class="recipes-catalog">
    <Head v-if="catalogSeo">
      <Title>{{ catalogSeo.title }}</Title>
      <Meta 
        name="description"
        :content="catalogSeo.description"
      />
    </Head>
    <div class="recipes-catalog__head">
      <h1 class="recipes-catalog__title fnt-h1">Наша библиотека вкуса</h1>
      <p class="recipes-catalog__descr fnt-p-1">
        Коллекция рецептов Cooks Delight&nbsp;&mdash; это не&nbsp;просто списки ингредиентов, а&nbsp;готовые формулы вашего кулинарного триумфа. Независимо от&nbsp;уровня мастерства, здесь вы&nbsp;найдете вдохновение для каждого дня. Доверьтесь нашим проверенным техникам, открывайте новые сочетания и&nbsp;получайте истинное удовольствие от&nbsp;магии процесса на&nbsp;вашей кухне.
      </p>
    </div>
    
    <div 
      ref="categoryEl"
      class="recipes-catalog__category"
    >
      <BaseBtn 
        v-for="nav in catalogNav"
        :key="nav.key"
        class="recipes-catalog__nav"
        :theme="currentCategory === nav.key ? 'secondary' : 'default-outline'"
        :state="currentCategory === nav.key ? 'active' : 'default'"
        tag="NuxtLink"
        :to="nav.link"
      >{{ nav.label }}</BaseBtn>
    </div>

    <!-- <div 
      v-if="catalogData?.length"
      class="recipes-catalog__grid"
    >
      <CardRecipe 
        v-for="recipe in catalogData"
        :key="recipe.id"
        :card-data="recipe"
      />
    </div> -->

    <!-- <div 
      v-if="totalPages > 1"
      class="recipes-catalog__pagination"
    >
      <span class="fnt-p-1">Страницы: </span>

      <BaseBtn 
        v-for="page in totalPages"
        :key="page"
        theme="default-outline"
        class="recipes-catalog__link"
        tag="NuxtLink"
        :state="page === currentPage ? 'active' : 'default'"
        :to="{
          query: {
            page,
          }
        }"
      >{{ page }}</BaseBtn>
    </div> -->
  </main>
</template>

<script lang="ts" setup>
import { queryRecipePaginationSchema } from '~~/shared/schemas/recipes-pagination';

definePageMeta({
  scrollToTop(to, from) {
    return to.name !== from.name
  },
});
const { $api } = useNuxtApp();

const HEADER_OFFSET = 86;
const categoryEl = useTemplateRef('categoryEl');
const currentCategory = useCatalogCategory();
const catalogSeo = useCatalogSeo(currentCategory);
const route = useRoute();

const queryParams = computed(
  () => queryRecipePaginationSchema.parse(route.query)
);

const { data: pageData, error } = await useAsyncData(
  () => `recipes-catalog-${currentCategory.value}-${queryParams.value.page}`,
  () => {
    if (currentCategory.value === 'not-found') {
      return Promise.resolve(null)
    }
    const category = currentCategory.value !== 'all' ? currentCategory.value : undefined
    return $api.recipes.get({
      ...queryParams.value,
      category,
    });
  }
);

watchEffect(() => {
  console.log('data', pageData.value);
});

// const { data: totalCount } = await useRecipesCollectionCount(currentCategory);

// const {
//   currentPage,
//   skip,
//   totalPages,
// } = usePagePagination({
//   limit: LIMIT,
//   total: totalCount,
// });

// const { data: catalogData } = await useCatalogData({
//   limit: LIMIT,
//   skip,
//   category: currentCategory,
//   page: currentPage,
// });

// watch(currentPage, scrollToStartGrid);

watchEffect(() => {
  if (currentCategory.value === NOT_FOUND_CATEGORY) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
      fatal: true
    });
  }
  if (error.value) {
    throw createError(error.value)
  }
});

function scrollToStartGrid() {
  const topOffset = categoryEl.value?.getBoundingClientRect().top || 0;
  window.scrollBy({
    'top': topOffset - HEADER_OFFSET,
    behavior: 'smooth',
  });
}
</script>

<style lang="scss" scoped>
.recipes-catalog {
  .recipes-catalog__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 4px;
    border-radius: 100%;
  }
  &__head {
    padding: 48px 0;
    display: grid;
    row-gap: 16px;
    @include media("min1000") {
      grid-template-columns: min-content 1fr;
      column-gap: 24px;
      padding: 64px 0;
    }
  }
  &__title {
    margin: 0;
  }
  &__descr {
    margin: 0;
    opacity: 0.8;
    align-self: center;
  }
  &__category {
    display: flex;
    column-gap: 8px;
    row-gap: 8px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
    row-gap: 16px;
    column-gap: 16px;
    @include media('min800') {
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      row-gap: 24px;
    }
    @include media('min1000') {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  &__pagination {
    margin: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
  }
}
</style>