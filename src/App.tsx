import { SnackbarProvider } from "../seed-design/ui/snackbar";
import { CartPage } from "./cart/CartPage";

export default function App() {
  return (
    <SnackbarProvider>
      <CartPage />
    </SnackbarProvider>
  );
}
