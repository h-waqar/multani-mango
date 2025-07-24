"use client";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./components/ui/sheet";
import { ToastProvider, Toast, ToastTitle } from "@radix-ui/react-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CartProvider, useCart } from "./context/CartContext";
import mangoes from "./data/mangoes";
import Admin from "./app/admin.jsx";

function Header({ onNav }) {
  return (
    <header className="bg-[#F4C430] text-white flex items-center justify-between px-4 py-3 shadow">
      <div className="font-pacifico text-2xl flex items-center gap-2">
        <span role="img" aria-label="mango">🥭</span> Multani Mango
      </div>
      <nav className="flex gap-4">
        <button onClick={() => onNav("home")}>Home</button>
        <button onClick={() => onNav("shop")}>Shop</button>
        <button onClick={() => onNav("cart")}>Cart</button>
        <button onClick={() => onNav("admin")}>Admin</button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#4CAF50] text-white text-center py-3 mt-auto">
      &copy; {new Date().getFullYear()} Multani Mango. All rights reserved.
    </footer>
  );
}

function Home({ onNav }) {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-5xl font-pacifico text-[#F4C430] mb-4 flex items-center gap-2">
        <span>🥭</span> Multani Mango
      </h1>
      <p className="text-lg text-[#4CAF50] mb-8 text-center">Sweetest mangoes from Multan, delivered to your door!</p>
      <img src="/images/chaunsa.jpg" alt="Mango" width={320} height={200} className="rounded shadow mb-8" />
      <button className="bg-[#F4C430] text-white px-6 py-3 rounded-full font-bold shadow hover:bg-[#4CAF50] transition" onClick={() => onNav("shop")}>Shop Now</button>
    </div>
  );
}

function Shop({ onProduct }) {
  return (
    <ScrollArea className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-[#4CAF50]">Available Mangoes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mangoes.map((mango) => (
          <button key={mango.slug} className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition text-left" onClick={() => onProduct(mango)}>
            <img src={mango.image} alt={mango.name} width={220} height={140} className="rounded mb-2 object-cover w-full h-32" />
            <h3 className="font-bold text-lg mb-1 text-[#F4C430]">{mango.name}</h3>
            <div className="text-[#4CAF50] font-semibold">Rs. {mango.price} / kg</div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function ProductPanel({ mango, open, onClose }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [showMsg, setShowMsg] = useState(false);
  if (!mango) return null;
  function handleAdd() {
    addToCart({ ...mango, _id: mango.slug, qty });
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1200);
  }
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md p-6">
        <SheetTitle className="text-3xl font-bold mb-2 text-[#F4C430]">{mango.name}</SheetTitle>
        <img src={mango.image} alt={mango.name} className="rounded mb-4 w-full h-48 object-cover" />
        <div className="mb-2 text-[#4CAF50] font-semibold">Rs. {mango.price} / kg</div>
        <p className="mb-4 text-gray-700">{mango.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} className="border rounded px-2 w-16" />
          <button className="bg-[#F4C430] text-white px-4 py-2 rounded font-bold shadow hover:bg-[#4CAF50] transition" onClick={handleAdd}>Add to Cart</button>
        </div>
        <ToastProvider>
          {showMsg && <Toast open={showMsg} onOpenChange={setShowMsg}><ToastTitle>Added to cart!</ToastTitle></Toast>}
        </ToastProvider>
        <button className="mt-2 underline text-[#4CAF50]" onClick={onClose}>Close</button>
      </SheetContent>
    </Sheet>
  );
}

function CartPanel({ open, onClose, onCheckout }) {
  const { cart, updateQty, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md p-6">
        <SheetTitle className="text-2xl font-bold mb-4 text-[#F4C430]">Your Cart</SheetTitle>
        {cart.length === 0 ? (
          <div className="text-lg">Your cart is empty.</div>
        ) : (
          <ScrollArea className="mb-4 max-h-64">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between p-2 border-b">
                <div>{item.name}</div>
                <input type="number" min={1} value={item.qty} onChange={e => updateQty(item._id, Number(e.target.value))} className="border rounded px-2 w-16" />
                <div>Rs. {item.price * item.qty}</div>
                <button className="text-red-600 px-2" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            ))}
          </ScrollArea>
        )}
        <div className="font-bold text-xl mb-4">Total: Rs. {total}</div>
        <button className="bg-[#F4C430] text-white px-6 py-3 rounded-full font-bold shadow hover:bg-[#4CAF50] transition w-full" onClick={onCheckout} disabled={cart.length === 0}>Checkout</button>
        <button className="mt-2 underline text-[#4CAF50] w-full" onClick={onClose}>Close</button>
      </SheetContent>
    </Sheet>
  );
}

function CheckoutPanel({ open, onClose, onSuccess }) {
  const { cart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: "", transactionId: "" });
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cart }),
      });
      if (!res.ok) throw new Error("Order failed");
      onSuccess();
      onClose();
    } catch (err) {
      setError("Could not place order. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md p-6">
        <SheetTitle className="text-2xl font-bold mb-4 text-[#F4C430]">Checkout</SheetTitle>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" required className="border p-2 w-full rounded" value={form.name} onChange={handleChange} />
          <input name="phone" placeholder="Phone" required className="border p-2 w-full rounded" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Address" required className="border p-2 w-full rounded" value={form.address} onChange={handleChange} />
          <select name="payment" required className="border p-2 w-full rounded" value={form.payment} onChange={handleChange}>
            <option value="">Select Payment</option>
            <option value="easypaisa">Easypaisa</option>
            <option value="jazzcash">JazzCash</option>
          </select>
          <div className="bg-yellow-100 p-2 rounded">
            Send payment to <b>Account # 0300-XXXXXXX</b>
          </div>
          <input name="transactionId" placeholder="Transaction ID" required className="border p-2 w-full rounded" value={form.transactionId} onChange={handleChange} />
          <button type="submit" className="bg-[#4CAF50] text-white px-4 py-2 rounded font-bold shadow w-full" disabled={loading}>{loading ? "Placing..." : "Place Order"}</button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </form>
        <button className="mt-2 underline text-[#4CAF50] w-full" onClick={onClose}>Close</button>
      </SheetContent>
    </Sheet>
  );
}

function SuccessPanel({ open, onClose }) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full max-w-md p-6 flex flex-col items-center justify-center">
        <SheetTitle className="text-2xl font-bold mb-4 text-[#F4C430]">Order Successful!</SheetTitle>
        <p className="mb-4 text-center">Thank you for your order. We’ll contact you soon!</p>
        <button className="bg-[#4CAF50] text-white px-4 py-2 rounded font-bold shadow w-full" onClick={onClose}>Close</button>
      </SheetContent>
    </Sheet>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [product, setProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  function handleNav(v) {
    setView(v);
    setProduct(null);
    setCartOpen(v === "cart");
    setProductOpen(false);
    setCheckoutOpen(false);
    setSuccessOpen(false);
  }
  function handleProduct(mango) {
    setProduct(mango);
    setProductOpen(true);
  }
  function handleCheckout() {
    setCheckoutOpen(true);
  }
  function handleSuccess() {
    setSuccessOpen(true);
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F4C430]/10">
        <Header onNav={handleNav} />
        <main className="flex-1">
          {view === "home" && <Home onNav={handleNav} />}
          {view === "shop" && <Shop onProduct={handleProduct} />}
          {view === "admin" && <Admin />}
        </main>
        <Footer />
        <ProductPanel mango={product} open={productOpen} onClose={() => setProductOpen(false)} />
        <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
        <CheckoutPanel open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onSuccess={handleSuccess} />
        <SuccessPanel open={successOpen} onClose={() => setSuccessOpen(false)} />
      </div>
    </CartProvider>
  );
}
