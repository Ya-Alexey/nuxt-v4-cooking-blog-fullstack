export const usePagePagination = ({
  limit,
  total,
}: {
  limit: number,
  total: Ref<number>
}) => {
  const route = useRoute();
  const currentPage = computed(() => Number(route.query.page) || 1)
  const skip = computed(() => (currentPage.value - 1) * limit)
  const totalPages = computed(() => Math.ceil((total.value || 0) / limit));

  return {
    currentPage,
    skip,
    totalPages,
  }
}
