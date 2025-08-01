import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ClientLayout from "@/components/ClientLayout"; // no metadata in here
import { Suspense } from "react";

export const metadata = {
  title: "Multani Mango",
  description: "Delicious fresh mangoes delivered to your door!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
