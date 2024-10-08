import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attempt) => attempt * 1000, // linear backoff, used with `retry`
      staleTime: 5000, // 5 sec
      gcTime: 1000 * 60 * 1, // 1 min
      refetchOnWindowFocus: false,
    },
  },
});
