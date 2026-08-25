<!-- eslint-disable vue/no-v-html -->
<template>
  <article 
    class="section-article" 
  >
    <ArticleWelcome 
      class="section-article__welcome"
      :welcome-data="recipeArticle"
    />

    <div class="section-article__grid">
      <section 
        class="section-article__content"
      > 
        <h2 class="fnt-h2">Кулинарная карта</h2>
        <Markdown
          class="section-article__content"
        >{{ recipeArticle.contentMap }}</Markdown>
      </section>
  
      <div class="section-article__aside">
        <RecipeDetails
          :list="recipeArticle.ingredients"
        >
          <template #title>Ингредиенты</template>
        </RecipeDetails>

        <RecipeDetails
          v-if="recipeArticle.equipment"
          :list="recipeArticle.equipment"
        >
          <template #title>Оборудование, необходимое для приготовления</template>
        </RecipeDetails>

        <RecipeDetails
          :list="recipeArticle.nutritional"
        >
          <template #title>Пищевая ценность</template>
        </RecipeDetails>

        <p class="section-article__note">
          <strong>Обратите внимание:</strong> пищевая ценность рассчитана приблизительно. Значения могут меняться в зависимости от конкретных ингредиентов и размера порций.
        </p>
      </div>
  
      <section 
        class="section-article__content"
      >
        <h2 class="fnt-h2">Магия процесса</h2>
        <Markdown
          class="section-article__content"
        >{{ recipeArticle.contentProcess }}</Markdown>
      </section>
  
      <ControlSocials 
        class="section-article__share">
        Поделиться
      </ControlSocials>
      <div class="section-article__line"></div>
      <SectionAuthor class="section-article__author"/>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { RecipeArticle } from '~~/server/schemas/recipes'

const {
  recipeArticle
} = defineProps<{
  recipeArticle: RecipeArticle
}>();
</script>

<style lang="scss" scoped>
.section-article {
  padding: 64px 16px 40px;
  border: 1px solid var(--dark-color-alpha-24);
  border-radius: var(--section-border-radius);
  @include media('min800') {
    padding: 64px 40px;
  }
  &__grid {
    @include media('min800') {
      padding-top: 40px;
      display: grid;
      column-gap: 56px;
      row-gap: 40px;
      grid-template-columns: 4fr 3fr;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    &:deep(:where(h2, h3, h4, p, ul, ol)) {
      margin: 0;
      max-width: 560px;
      width: 100%;
    }
    &:deep(:where(ul, ol)) {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      padding-left: 24px;
      opacity: 0.8;
    }
    &:deep(p) {
      opacity: 0.8;
    }
  }
  &__welcome {
    margin-bottom: 40px;
    @include media('min800') {
      grid-column: 1 / -1;
      margin: 0;
    }
  }
  &__aside {
    margin: 16px 0 40px;
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    @include media('min800') {
      grid-column: 2 / 3;
      grid-row: 1 / 5;
      position: sticky;
      bottom: 0;
      margin-top: auto;
      margin-bottom: 0;
    }
    @include media('min1000') {
      padding: 40px 16px 16px;
    }
  }
  &__note {
    text-transform: uppercase;
    opacity: 0.8;
    font-size: 12px;
    line-height: 1.2;
  }
  &__share {
    width: fit-content;
    margin: 40px 0;
    @include media('min800') {
      align-self: flex-end;
      grid-column: 1 / 2;
      margin: 0;
    }
  }
  &__author {
    @include media('min800') {
      grid-column: 1 / 2;
    }
  }
  &__line {
    height: 1px;
    background-color: var(--dark-color-alpha-24);
    margin-bottom: 40px;
    @include media('min800') {
      margin-bottom: 0;
    }
  }
}
</style>