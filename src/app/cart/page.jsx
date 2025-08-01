"use client";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { banks } from "@/data/details";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedBank, setSelectedBank] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    setMessage("");

    if (!name || !email || !phone || !address) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    if (cart.length === 0) {
      setMessage("❌ Your cart is empty.");
      return;
    }

    if (paymentMethod === "bank" && (!selectedBank || !transactionId)) {
      setMessage("❌ Please select a bank and enter transaction ID.");
      return;
    }

    const orderData = {
      name,
      email,
      phone,
      address,
      payment: paymentMethod,
      cart,
      ...(paymentMethod === "bank" && {
        transactionId,
        bank: selectedBank,
      }),
    };

    try {
      setLoading(true);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Order placed successfully!");
        clearCart();
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setSelectedBank("");
        setTransactionId("");
      } else {
        setMessage(`❌ ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 text-xl font-semibold text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[var(--primary)] text-center mb-8">
        🛒 Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    Rs. {item.price.toLocaleString()} / kg
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="p-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2 font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right sm:text-center">
                <p className="font-medium text-lg">
                  Rs. {(item.price * item.qty).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 mt-2 hover:underline text-sm flex items-center gap-1 justify-end"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-2xl font-bold text-[var(--primary)] border-t pt-4">
            Total: Rs. {total.toLocaleString()}
          </div>
        </div>

        {/* Customer Info Form */}
        <div className="bg-white border rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-2">🧾 Customer Info</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Full Address"
              className="w-full border p-2 rounded col-span-full"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">💳 Payment Method</h2>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                Bank Transfer
              </label>
            </div>

            {paymentMethod === "bank" && (
              <div className="mt-4 space-y-4">
                {banks.map((bank) => (
                  <label
                    key={bank.id}
                    className={`flex items-start gap-4 p-4 rounded border cursor-pointer transition ${
                      selectedBank === bank.id
                        ? "border-[var(--primary)]"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bank-option"
                      value={bank.id}
                      checked={selectedBank === bank.id}
                      onChange={() => setSelectedBank(bank.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {bank.logo ? (
                          <img
                            src={bank.logo}
                            alt={bank.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {bank.name.charAt(0)}
                          </div>
                        )}
                        <h3 className="font-semibold">{bank.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {bank.accountTitle &&
                          `Account Title: ${bank.accountTitle}\n`}
                        {bank.accountNumber &&
                          `Account No: ${bank.accountNumber}\n`}
                        {bank.iban && `IBAN: ${bank.iban}\n`}
                        {bank.branch && `Branch: ${bank.branch}\n`}
                        {bank.branchCode && `Branch Code: ${bank.branchCode}`}
                      </p>
                    </div>
                  </label>
                ))}

                <input
                  type="text"
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition w-full text-lg font-semibold"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {message && (
            <p
              className={`mt-3 text-sm text-center font-medium ${
                message.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
