
function getScrollOffset(): number {
  const div: HTMLDivElement = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}

function getWindowScrollOffset(): number {
  return innerWidth - document.documentElement.clientWidth;
}

/**
 * отключаем дефолтный скролл для body
 */
function freezeScroll() {
  const scrollWidth = getWindowScrollOffset();
  document.body.style.cssText = `
    overflow: hidden;
    padding-right: ${scrollWidth}px;
  `;
}

function resetBodyStyle() {
  document.body.style.cssText = `
    overflow: '';
    padding-right: '';
  `;
}

function toggleBodyScroll(isLocked: boolean) {
  if (isLocked) {
    freezeScroll();
    return;
  }
  resetBodyStyle();
}


export {
  getScrollOffset,
  freezeScroll,
  resetBodyStyle,
  toggleBodyScroll,
}