import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./Routes/AppRoutes";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left"/>
    </QueryClientProvider>
  );
}

export default App;
