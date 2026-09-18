import type { vOnClickOutside } from '@vueuse/components';
import type { vAutofocus } from '~/directives/vAutofocus';

declare module '@vue/runtime-core' {
  interface GlobalDirectives {
    'vOnClickOutside': typeof vOnClickOutside;
    'vAutofocus': typeof vAutofocus;
  }
  // interface GlobalComponents {}
}

export {}