<template>
  <section class="section-palette">
    <LazyBaseTag 
      class="section-palette__tag"
      hydrate-never
    >{{ tagRegistry.explore }}</LazyBaseTag>
    <h2 class="section-palette__title fnt-h2">Рецепты на&nbsp;любой вкус</h2>
    <p class="section-palette__descr fnt-p-2">
      Ищете вдохновение для идеального завтрака, сытного обеда или потрясающего десерта? В&nbsp;нашей авторской коллекции собраны проверенные рецепты на&nbsp;каждый день и&nbsp;для особых случаев.
    </p>
    <BaseBtn 
      class="section-palette__btn"
      theme="default-outline"
      tag="NuxtLink"
      to="/recipes-catalog"
    >Смотреть все</BaseBtn>

    <ul class="section-palette__list">
      <li 
        v-for="navItem in menuList"
        :key="navItem.key"
      >
        <NuxtLink 
          :to="navItem.link" 
          class="section-palette__link"
        >
          <SvgIcon 
            :name="navItem.icon"
            class="section-palette__svg"
          />
          <span class="fnt-h4">{{ navItem.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import type { RecipeCategory } from '~~/shared/constants'

type RecipeCategoryPalette = Exclude<RecipeCategory, 'vegan'>

interface PaletteNav {
  key: RecipeCategoryPalette
  label: string
  link: string
  icon: string
}

const menuList: Readonly<PaletteNav[]> = [
  {
    key: 'breakfast',
    link: '/recipes-catalog/breakfast',
    label: 'Завтрак',
    icon: 'icon-breakfast',
  },
  {
    key: 'lunch',
    link: '/recipes-catalog/lunch',
    label: 'Обед',
    icon: 'icon-lunch',
  },
  {
    key: 'dinner',
    link: '/recipes-catalog/dinner',
    label: 'Ужин',
    icon: 'icon-dinner',
  },
  {
    key: 'dessert',
    link: '/recipes-catalog/dessert',
    label: 'Десерт',
    icon: 'icon-dessert',
  },
  {
    key: 'quick-bite',
    link: '/recipes-catalog/quick-bite',
    label: 'Перекус',
    icon: 'icon-bite',
  },
];
</script>

<style lang="scss" scoped>
.section-palette {
  --side-padding: 24px;
  --half-padding: calc(var(--side-padding) / 2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px var(--side-padding);
  border-radius: var(--section-border-radius);
  background-color: var(--primary-color-4);
  color: var(--dark-color);
  @include media("min800") {
    display: grid;
    align-items: flex-end;
    justify-items: flex-start;
    justify-content: space-between;
    grid-template-columns: repeat(2, 1fr);
    grid-template-columns: repeat(2, minmax(0, 500px));
    grid-template-rows: 1fr repeat(3, min-content);
    column-gap: 16px;
  }
  &__tag {
    margin-bottom: 8px;
    @include media("min800") {
      grid-column: 1/2;
      margin-bottom: 16px;
    }
  }
  &__title {
    margin-top: 0;
    margin-bottom: 12px;
    @include media("min800") {
      grid-column: 1/2;
    }
  }
  &__descr {
    font-family: var(--font-family);
    opacity: 0.8;
    margin-top: 0;
    margin-bottom: 40px;
    @include media("min800") {
      grid-column: 1/2;
    }
  }
  &__btn {
    margin-bottom: 64px;
    @include media("min800") {
      grid-column: 1/2;
      margin-bottom: 0;
    }
  }
  &__list {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 16px;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style-type: none;
    @include media("min800") {
      grid-area: 1 / 2 / 5 / 3;
    }
  }
  &__link {
    --main-color: var(--dark-color);
    display: flex;
    align-items: center;
    column-gap: 16px;
    justify-content: space-between;
    padding: 16px var(--half-padding);
    text-decoration: none;
    color: var(--main-color);
    border-bottom: 1px solid;
    &:focus-visible {
      outline: 2px solid var(--primary-color-2);
      outline-offset: 2px;
      border-radius: 2px;
    }
    @include apply-tint(border-color, var(--dark-color), 74%);
    @include transition-default(background-color);
    @include mediaHover() {
      background-color: var(--primary-color-1);
    }
  }
  &__svg {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    fill: var(--main-color);
  }
}
</style>