import type { vOnClickOutside } from '@vueuse/components';

declare module '@vue/runtime-core' {
  interface GlobalDirectives {
    'vOnClickOutside': typeof vOnClickOutside;
  }
  // interface GlobalComponents {
  //   SimpleBar: typeof SimpleBar;
  // }
}

export {}