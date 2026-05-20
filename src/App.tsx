import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { ThemeProvider } from "./Context/ThemeContext";
import { AppRoutes } from "./Routes/AppRoutes";

const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" richColors />
        <AppRoutes />
        <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
