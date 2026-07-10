import "./App.css";
import { AppProvider } from "./providers";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
