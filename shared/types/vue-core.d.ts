import type { vOnClickOutside } from '@vueuse/components';
import { vAutofocus } from '~/directives/vAutofocus';

declare module '@vue/runtime-core' {
  interface GlobalDirectives {
    'vOnClickOutside': typeof vOnClickOutside;
    'vAutofocus': typeof vAutofocus;
  }
  // interface GlobalComponents {}
}

export {}