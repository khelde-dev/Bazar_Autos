import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { AppRoutes } from "./Routes/AppRoutes";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <AppRoutes />
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
