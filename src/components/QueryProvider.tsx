"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type Props = {
    children: React.ReactNode;
}

const queryClient = new QueryClient()
const QueryProvider = ({children}:Props) => {
  return (
    <div>
        <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    </div>
  )
}

export default QueryProvider