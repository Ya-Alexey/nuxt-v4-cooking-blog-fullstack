import { vOnClickOutside } from '@vueuse/components';
import { vAutofocus } from '~/directives/vAutofocus';

export default defineNuxtPlugin({
  name: 'vueDirectives',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('on-click-outside', vOnClickOutside);
    nuxtApp.vueApp.directive('autofocus', vAutofocus);
  }
});
