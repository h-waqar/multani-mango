export default function OrderForm({ cart, onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input name="name" placeholder="Name" required className="border p-2 w-full" />
      <input name="phone" placeholder="Phone" required className="border p-2 w-full" />
      <input name="address" placeholder="Address" required className="border p-2 w-full" />
      <select name="payment" required className="border p-2 w-full">
        <option value="">Select Payment</option>
        <option value="easypaisa">Easypaisa</option>
        <option value="jazzcash">Jazzcash</option>
      </select>
      <div className="bg-yellow-100 p-2 rounded">
        Send payment to <b>Account # 0300-XXXXXXX</b>
      </div>
      <input name="transactionId" placeholder="Transaction ID" required className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Place Order</button>
    </form>
  );
}
