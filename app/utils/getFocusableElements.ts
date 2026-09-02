const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

export function getFocusableElements(
  container: HTMLElement
): HTMLElement[] {
  if (!container) {
    return [];
  }
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  );
  return elements.filter(
    (el) => el.offsetWidth > 0 || el.offsetHeight > 0
  );
}