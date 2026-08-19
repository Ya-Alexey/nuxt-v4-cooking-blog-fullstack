import { vOnClickOutside } from '@vueuse/components';

export default defineNuxtPlugin({
  name: 'vueDirectives',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('on-click-outside', vOnClickOutside);
  }
});
