export type OverlayType = 'dropdown' | 'modal' | 'drawer'

export interface OverlayInstance {
  id: string
  type: OverlayType
  close: () => void
  closeOnRouteChange: boolean
  triggerElement?: MaybeRefOrGetter<HTMLElement | null>
  contentElement?: MaybeRefOrGetter<HTMLElement | null>
}

export const useOverlayManager = () => {
  const activeOverlays = useState<OverlayInstance[]>(
    'overlays-list', () => []
  );

  const isGlobalListenerActive = useState<boolean>(
    'overlays-global-listener', () => false
  );

  function register(instance: OverlayInstance) {
    // Если это модалка, закрыть все дропдауны
    if (instance.type === 'modal') {
      closeByType('dropdown')
    }
    activeOverlays.value.push(instance);
    initGlobalListeners();
  }

  function unregister (id: string) {
    activeOverlays.value = activeOverlays.value.filter(({ id: itemId }) => itemId !== id);
    if (activeOverlays.value.length === 0) {
      destroyGlobalListeners();
    }
  }

  function closeAll() {
    const activeOverlaysLength = getIndexedLength();
    for (let i = activeOverlaysLength; i >= 0; i--) {
      activeOverlays.value[i]!.close();
    }
    activeOverlays.value = [];
  }

  function closeByType(type: OverlayType) {
    const targets = activeOverlays.value.filter(({ type: itemType }) => itemType === type);
    targets.forEach((item) => item.close())
  }

  function handleRouteChange() {
    const activeOverlaysLength = getIndexedLength();
    for (let i = activeOverlaysLength; i >= 0; i--) {
      const overlay = activeOverlays.value[i]!;
      if (overlay.closeOnRouteChange) {
        overlay.close();
      }
    }
  }

  function handleGlobalPointerDown(event: PointerEvent) {
    const target = event.target as HTMLElement;

    if (!target || activeOverlays.value.length === 0) {
      return;
    }
    const topOverlay = getTopOverlay();
    
    if (!topOverlay) {
      return;
    }
    const { triggerElement, contentElement } = topOverlay;
    const clickedInsideTrigger = toValue(triggerElement)?.contains(target);
    const clickedInsideContent = toValue(contentElement)?.contains(target);

    if (!clickedInsideTrigger && !clickedInsideContent) {
      topOverlay.close();
    }
  }

  function handleGlobalKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape' || activeOverlays.value.length === 0) {
      return;
    }
    const topOverlay = getTopOverlay();;
    if (!topOverlay) {
      return;
    }
    topOverlay.close();
    toValue(topOverlay.triggerElement)?.focus();
  }

  function initGlobalListeners() {
    if (isGlobalListenerActive.value) {
      return;
    }
    document.addEventListener('pointerdown', handleGlobalPointerDown, { capture: true })
    document.addEventListener('keydown', handleGlobalKeyDown)
    isGlobalListenerActive.value = true
  }

  function destroyGlobalListeners() {
    document.removeEventListener('pointerdown', handleGlobalPointerDown, { capture: true })
    document.removeEventListener('keydown', handleGlobalKeyDown)
    isGlobalListenerActive.value = false
  }

  function getIndexedLength() {
    return activeOverlays.value.length - 1;
  }

  function getTopOverlay() {
    return activeOverlays.value[getIndexedLength()] || null;
  }

  return {
    register,
    unregister,
    closeAll,
    closeByType,
    handleRouteChange
  }
}
