<template>
  <footer class="app-footer">
    <NuxtLink 
      class="app-footer__logo"
      aria-label="главная страница"
      to="/"
    >
      <AppLogo class="app-footer__svg"/>
    </NuxtLink>

    <ul class="app-footer__menu">
      <li 
        v-for="nav in mainNav"
        :key="nav.key"
        class="app-footer__item"
      >
        <NavLink 
          class="app-footer__link" 
          tag="NuxtLink"
          :to="nav.link"
          size="small"
        >{{ nav.label }}</NavLink>
      </li>
    </ul>

    <MenuSocials class="app-footer__socials"/>

    <div class="app-footer__copyright">
      Copyright: © 2026 Cooks Delight.
    </div>
  </footer>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.app-footer {
  display: grid;
  row-gap: 24px;
  padding: 24px;
  border-radius: var(--section-border-radius);
  background-color: var(--dark-color);
  @include media('min800') {
    padding: 24px 40px;
    column-gap: 16px;
    grid-template-columns: min-content 1fr min-content;
  }
  .app-footer__link {
    @include media('min800') {
      padding: 1px 0;
      border: none;
      opacity: 0.4;
      @include transition-default(opacity);
      @include mediaHover() {
        opacity: 1;
      }
    }
    &.nav-link--state-active {
      @include media('min800') {
        opacity: 1;
      }
    }
    &:focus-visible {
      opacity: 1;
    }
  }
  .app-footer__svg {
    --text-color: var(--background-app);
    --first-color: var(--background-app);
    --second-color: rgba(240, 235, 225, 0.6);
    --third-color: rgba(240, 235, 225, 0.32);
  }
  &__logo {
    margin: 0 auto;
    &:focus-visible {
      border-radius: 2px;
      outline: 1px solid var(--primary-color-2);
    }
  }
  &__menu {
    padding: 0;
    margin: 0;
    display: grid;
    row-gap: 4px;
    list-style-type: none;
    @include media('min800') {
      display: flex;
      column-gap: 16px;
      justify-content: center;
      align-self: center;
    }
  }
  &__item {
    @include media('min800') {
      display: flex;
      column-gap: 16px;
      &::after {
        content: '';
        display: block;
        width: 1px;
        @include apply-tint(background-color, var(--background-app), 76.00%);
      }
      &:last-child {
        &::after {
          content: none;
        }
      }
    }
  }
  &__copyright {
    padding-top: 23px;
    border-top: 1px solid;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1.2;
    @include apply-tint(border-color, var(--background-app), 76%);
    @include apply-tint(color, var(--background-app), 40%);
    @include media('min800') {
      grid-column: 1/-1;
      padding-top: 14px;
    }
  }
}
</style>