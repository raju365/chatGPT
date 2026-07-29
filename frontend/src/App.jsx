import AppRoutes from "./AppRoutes";
import "./index.css";
import { Toaster } from "sonner";
function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        theme="dark"
        position="top-right"
        richColors
        closeButton
        expand
      />
    </>
  );
}

export default App;
