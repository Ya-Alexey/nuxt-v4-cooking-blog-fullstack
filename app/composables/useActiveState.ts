export const useActiveState = (initValue = false) => {
  const isActive = ref(initValue);
  
  function toggleState(newState?: boolean) {
    if (typeof newState === 'boolean') {
      isActive.value = newState;
      return;
    }
    if (isActive.value) {
      isActive.value = false;
      return;
    }
    isActive.value = true;
  }

  function setActiveOff() {
    if (isActive.value) {
      toggleState(false);
    }
  }

  function setActiveOn() {
    if (!isActive.value) {
      toggleState(true);
    }
  }

  return {
    isActive: readonly(isActive),
    toggleState,
    setActiveOff,
    setActiveOn,
  }
}
