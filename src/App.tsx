import AppContent from "./components/AppContent";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
