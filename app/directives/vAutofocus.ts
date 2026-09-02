import type { Directive } from "vue";

/**
 * автофокус в элемент, использование: v-autofocus="true"
 */
export const vAutofocus: Directive<HTMLElement, boolean> = {
  mounted: (el, binding) => {
    if (!binding.value) {
      return;
    }
    el.focus();
    // el.contentEditable передается в виде строки, если это редактируемый div, будет "true"
    if (el.contentEditable !== 'true') {
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    selection.removeAllRanges();
    selection.addRange(range);
  },
}