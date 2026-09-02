interface FocusTrapOptions {
  loop?: boolean
  focusFirstEl?: boolean
}

export const useFocusTrap = (
  containerEl: MaybeRefOrGetter<HTMLElement | null>,
  {
    loop = true,
    focusFirstEl = false,
  }: FocusTrapOptions = {}
) => {
  let previousFocusedElement: HTMLElement | null = null;

  const containerElVal = computed(() => toValue(containerEl));

  onBeforeMount(() => {
    previousFocusedElement = document.activeElement as HTMLElement;
  });

  onMounted(() => {
    initFocusTrap();
  });

  onUnmounted(() => {
    clearFocusTrap();
  });

  function initFocusTrap() {
    const containerEl = containerElVal.value;
    if (!containerEl) {
      return;
    }
    containerEl.addEventListener('keydown', handleKeyDown);
    const focusable = getFocusableElements(containerEl);
    if (focusable.length > 0 && focusFirstEl) {
      focusable[0]!.focus();
    }
  }

  function clearFocusTrap() {
    if (containerElVal.value) {
      containerElVal.value.removeEventListener('keydown', handleKeyDown)
    }
    if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
      previousFocusedElement.focus();
      previousFocusedElement = null;
    }
  }

  function handleKeyDown(evt: KeyboardEvent) {
    if (evt.key !== 'Tab') {
      return;
    }
    const container = containerElVal.value!;
    const focusable = getFocusableElements(container);

    if (focusable.length === 0) {
      // Если внутри ловушки вообще нет кнопок/инпутов, запрещаем Tab
      evt.preventDefault();
      return;
    }

    const firstEl = focusable[0]!;
    const lastEl = focusable[focusable.length - 1]!;
    const activeEl = document.activeElement as HTMLElement;

    // Логика Shift + Tab (движение назад)
    if (evt.shiftKey) {
      if (activeEl === firstEl && loop) {
        lastEl.focus();
        evt.preventDefault();
      }
      return;
    } 
    // Логика обычного Tab (движение вперед)
    if (activeEl === lastEl && loop) {
      firstEl.focus();
      evt.preventDefault();
      return;
    }
  }
}
