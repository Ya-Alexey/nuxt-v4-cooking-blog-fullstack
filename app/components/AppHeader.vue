<template>
  <div 
    ref="preHeaderEl"
    class="app-header-trigger"
  ></div>
  <header 
    ref="headerEl"
    class="app-header"
    :class="classes"
    @focusout="onFocusout"
  >
    <div class="app-header__top">
      <NuxtLink 
        class="app-header__logo"
        aria-label="главная страница"
        to="/"
      >
        <AppLogo class="app-header__svg"/>
      </NuxtLink>
      <BtnBurger 
        ref="burgerEl"
        :is-active="isOpenMenu"
        class="app-header__burger"
        aria-label="переключить видимость меню"
        :aria-expanded="!isOpenMenu"
        aria-controls="main-head-nav"
        @update:is-active="toggleMenu($event)"
      />
    </div>

    <div 
      id="main-head-nav"
      class="app-header__dropdown"
    >
      <div class="app-header__wrapper">
        <div class="app-header__menu">
          <HeaderNav class="app-header__nav"/>

          <BaseBtn 
            :theme="isOpenMenu ? 'dark-bg' : 'default'"
            class="app-header__subscribe"
            @click="scrollToSubscribe"
          >Подписаться</BaseBtn>

          <MenuSocials class="app-header__socials"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const HEADER_OVERLAY_ID ='main-header';

const emit = defineEmits<{
  'scrollToSubscribe': []
}>();

const headerEl = useTemplateRef('headerEl');
const burgerEl = useTemplateRef('burgerEl');
const preHeaderEl = useTemplateRef('preHeaderEl'); 
const isStickyHeader = ref(false);

defineExpose({
  headerEl,
});

const {
  register,
  unregister,
} = useOverlayManager();

const {
  isActive: isOpenMenu,
  toggleState: toggleMenu,
} = useActiveState();

const classes = computed(() => ({
  'app-header--is-active': isOpenMenu.value,
  'app-header--is-sticky': isStickyHeader.value,
}));

watch(isOpenMenu, toggleBodyScroll);

let observerInstance: IntersectionObserver | null = null;

onMounted(() => {
  const headerOverlay: OverlayInstance = {
    id: HEADER_OVERLAY_ID,
    type: 'drawer',
    close: closeMenu,
    closeOnRouteChange: true,
    triggerElement: burgerEl.value?.$el,
    contentElement: headerEl.value,
  }
  register(headerOverlay);
  initStickyObserve();
  if (!isOpenMenu.value) {
    toggleBodyScroll(false);
  }
});

onBeforeUnmount(() => {
  unregister(HEADER_OVERLAY_ID);
  if (observerInstance) {
    observerInstance.disconnect();
    observerInstance = null;
  }
});

function initStickyObserve() {
  observerInstance = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting }) => {
      isStickyHeader.value = !isIntersecting;
    });
  }); 
  observerInstance.observe(preHeaderEl.value!);
}

function onFocusout(evt: FocusEvent) {
  const relatedTarget = evt.relatedTarget as HTMLElement;
  if (!relatedTarget) {
    return
  }
  if (!headerEl.value!.contains(relatedTarget)) {
    toggleMenu(false);
  }
}

function closeMenu() {
  toggleMenu(false);
}

function scrollToSubscribe() {
  closeMenu();
  emit('scrollToSubscribe');
}
</script>

<style lang="scss" scoped>
.app-header-trigger {
  height: 1px;
}
.app-header {
  --bg-color: var(--background-app);
  --outline-color: var(--primary-color-2);
  padding: 15px;
  border: 1px solid var(--dark-color-alpha-24);
  border-radius: var(--section-border-radius);
  position: sticky;
  top: 0;
  z-index: var(--z-layout-sticky);
  background-color: var(--bg-color);
  transition: 
    background-color var(--base-timing) var(--base-duration),
    filter var(--base-timing) var(--base-duration),
    border-color var(--base-timing) 0.1s,
    border-radius var(--base-timing) 0.1s,
  ;
  @include media('min800') {
    padding: 15px 23px;
    display: flex;
    justify-content: space-between;
  }
  .app-header__socials {
    @include media('min800') {
      display: none;
    }
  }
  &--is-active {
    --bg-color: var(--dark-color);
    filter: drop-shadow(0px 4px 6px black);
    @include media('min800') {
      --bg-color: var(--background-app);
    }
    .app-header__svg {
      --text-color: var(--background-app);
      @include media('min800') {
        --text-color: var(--dark-color);
      }
    }
    .app-header__dropdown {
      grid-template-rows: 1fr;
      visibility: initial;
      transition: 
        visibility var(--base-duration) 0s var(--base-timing), 
        grid-template-rows var(--base-duration) var(--base-timing), 
        background-color var(--base-duration) var(--base-timing)
      ;
    }
  }
  &--is-sticky {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top-color: var(--bg-color);
  }
  &__top {
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
  }
  &__logo {
    width: 110px;
    height: 35px;
    border-radius: 4px;
    flex-shrink: 0;
    &:focus-visible {
      outline: 1px solid var(--outline-color);
    }
  }
  &__burger {
    flex-shrink: 0;
    @include media('min800') {
      display: none;
    }
  }
  &__dropdown {
    display: grid;
    grid-template-rows: 0fr;
    position: absolute;
    z-index: -1;
    left: -1px;
    right: -1px;
    top: 50%;
    background-color: var(--bg-color);
    border-radius: 0 0 32px 32px;
    visibility: hidden;
    transition: 
      visibility var(--base-duration) var(--base-timing), 
      grid-template-rows var(--base-duration) var(--base-timing), 
      background-color var(--base-duration) var(--base-timing)
    ;
    @include media('min800') {
      position: static;
      visibility: visible;
      grid-template-rows: 1fr;
      flex-grow: 1;
    }
  }
  &__wrapper {
    overflow: hidden;
    @include media('min800') {
      overflow: initial;
    }
  }
  &__menu {
    display: grid;
    grid-auto-rows: min-content;
    row-gap: 40px;
    padding: 56px 16px 48px;
    @include media('min800') {
      display: flex;
      justify-content: space-between;
      padding: 0;
    }
  }
  &__nav {
    @include media('min800') {
      margin: 0 auto;
    }
  }
}
</style>