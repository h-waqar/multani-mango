import { PackageCheck, Truck, Smile, HandCoins } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-[var(--secondary)] text-[var(--secondary-foreground)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-[var(--muted-foreground)] mb-12 max-w-xl mx-auto">
          From our farms to your doorstep – in just a few simple steps.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {/* Step 1 */}
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow">
            <HandCoins className="text-[var(--primary)] mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Place Your Order</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Choose your favorite mango box and place an order online.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow">
            <PackageCheck className="text-[var(--primary)] mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Freshly Picked</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              We handpick mangoes from our orchards right after your order.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow">
            <Truck className="text-[var(--primary)] mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Delivered to your home in eco-friendly packaging within 2–3 days.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl shadow">
            <Smile className="text-[var(--primary)] mb-4" size={32} />
            <h3 className="font-semibold text-lg mb-2">Enjoy!</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              Enjoy the juicy taste of premium Pakistani mangoes with your family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
