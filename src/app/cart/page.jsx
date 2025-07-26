"use client";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedBank, setSelectedBank] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // NEW email state
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const banks = [
    {
      id: "hbl",
      name: "HBL",
      account: "1234-5678-9000",
      iban: "PK00HBL0000001234567890",
    },
    {
      id: "meezan",
      name: "Meezan Bank",
      account: "2233-4455-6677",
      iban: "PK00MEZN0000002233445566",
    },
    {
      id: "ubl",
      name: "UBL",
      account: "9988-7766-5544",
      iban: "PK00UBL0000009988776655",
    },
  ];

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
    };

    if (paymentMethod === "bank") {
      orderData.transactionId = transactionId;
      orderData.bank = selectedBank;
    }

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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[var(--primary)]">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
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
                  className="p-1 bg-gray-200 rounded"
                >
                  <Minus size={14} />
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="p-1 bg-gray-200 rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="font-medium">
              Rs. {(item.price * item.qty).toLocaleString()}
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 mt-2 hover:underline text-sm flex items-center gap-1"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right text-xl font-bold">
        Total: Rs. {total.toLocaleString()}
      </div>

      <div className="border-t pt-6 space-y-4">
        <h2 className="text-xl font-semibold">Customer Info</h2>

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
          className="w-full border p-2 rounded"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2 className="text-xl font-semibold pt-4">Payment Method</h2>
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

        <label className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            Bank Transfer
          </div>

          {paymentMethod === "bank" && (
            <div className="ml-6 mt-2 space-y-2 text-sm">
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">-- Select Bank --</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name} - A/C: {bank.account} - IBAN: {bank.iban}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
          )}
        </label>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:opacity-90 transition w-full"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {message && (
          <p
            className={`mt-3 text-sm text-center ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
