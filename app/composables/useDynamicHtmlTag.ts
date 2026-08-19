export const useDynamicHtmlTag = (tag: MaybeRefOrGetter<string>) => {
  const componentTag = computed<string | Component>(
    () => toValue(tag) === 'NuxtLink' ? defineNuxtLink({}) : toValue(tag)
  );
  return componentTag;
}