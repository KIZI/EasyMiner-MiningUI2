import { QueryClient } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};

export type Optional<T> = T | undefined | null;
