export default defineNuxtPlugin({
  name: 'vueDirectives',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('on-click-outside', {});
    nuxtApp.vueApp.directive('autofocus', {});
  }
});