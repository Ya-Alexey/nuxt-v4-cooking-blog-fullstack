<template>
  <div class="app-layout">
    <NuxtLoadingIndicator 
      :color="'#f59e0b'" 
      :height="3" 
    />

    <AppHeader 
      ref="headerEl"
      @scroll-to-subscribe="scrollToSubscribe"
    />

    <div class="app-layout__main">
      <slot />
    </div>

    <SectionSubscribe   
      v-if="!error"
      ref="subscribeEl"
      class="app-layout__subscribe"
    />

    <LazyAppFooter hydrate-never/>
  </div>
</template>

<script lang="ts" setup>
const HEADER_OFFSET = 16;
const headerEl = useTemplateRef('headerEl');
const subscribeEl = useTemplateRef('subscribeEl');
const router = useRouter();
const error = useError();
const { handleRouteChange } = useOverlayManager();
router.afterEach(handleRouteChange);

function scrollToSubscribe() {
  const subscribeHtml = subscribeEl.value?.$el as HTMLElement | null;
  const headerHtml = headerEl.value?.headerEl;
  if (!headerHtml || !subscribeHtml) {
    console.warn('headerHtml or subscribeHtml not defined');
    return;
  }

  const scrollOffset = subscribeHtml.getBoundingClientRect().top - headerHtml.offsetHeight - HEADER_OFFSET;

  window.scrollBy({
    top: scrollOffset,
    behavior: 'smooth',
  });
}
</script>

<style lang="scss">
.app-layout {
  display: grid;
  padding: 15px 16px;
  grid-template-columns: minmax(0px, 1fr);
  grid-auto-rows: min-content;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  @include media("min1200") {
    padding: 15px 64px;
  }
  &__main {
    padding: 16px 0;
    display: grid;
    grid-template-columns: minmax(0px, 1fr);
    grid-template-rows: 1fr;
    grid-auto-rows: min-content;
    row-gap: var(--section-row-gap);
    min-height: 100vh;
    min-height: 100svh;
  }
  &__subscribe {
    margin-bottom: 16px;
    margin-top: var(--section-row-gap);
  }
}
</style>
