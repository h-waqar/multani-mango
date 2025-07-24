// src/app/layout.jsx
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Multani Mango",
  description: "Delicious fresh mangoes delivered to your door!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
