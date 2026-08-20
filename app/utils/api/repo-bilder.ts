export type RepoBuilder = <T>(
  repositoryBuilder: (apiFetch: typeof $fetch, rootUrl: string) => T
) => T;

export function createApiConfig(apiFetch: typeof $fetch, rootUrl: string): RepoBuilder {
  return (repositoryBuilder) => repositoryBuilder(apiFetch, rootUrl);
}