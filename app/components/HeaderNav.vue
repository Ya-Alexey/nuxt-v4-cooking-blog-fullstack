<template>
  <nav class="header-nav">
    <ul class="header-nav__list">
      <li 
        v-for="nav in mainNav"
        :key="nav.key"
      >
        <NavLink 
          class="header-nav__link" 
          tag="NuxtLink"
          :to="nav.link"
        >{{ nav.label }}</NavLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.header-nav {
  .header-nav__link {
    @include media('min800') {
      --border-color: transparent;
      font-size: 14px;
      color: var(--dark-color);
      padding: 8px;
      font-weight: 500;
      opacity: 0.4;
      border-bottom: 4px solid var(--border-color);
      border-radius: 2px;
      @include transition-default(opacity, border-color);
      @include mediaHover() {
        opacity: 1;
        border-color: var(--border-color);
      }
    }
    &.nav-link--state-active {
      @include media('min800') {
        --border-color: var(--primary-color-2);
        opacity: 1;
      }
    }
    &:focus-visible {
      opacity: 1;
    }
  }
  &__list {
    padding: 0;
    margin: 0;
    display: grid;
    row-gap: 12px;
    list-style-type: none;
    @include media('min800') {
      height: 100%;
      display: flex;
      align-items: center;
      column-gap: 24px;
    }
  }
}
</style>