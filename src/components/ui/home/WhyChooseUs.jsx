export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Farm-Fresh Quality",
      desc: "Directly sourced from the best mango orchards for maximum freshness.",
      icon: "🍃",
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver across Pakistan quickly and with care.",
      icon: "🚚",
    },
    {
      title: "100% Natural",
      desc: "No chemicals or preservatives—just pure, delicious mangoes.",
      icon: "🥭",
    },
    {
      title: "Easy Ordering",
      desc: "Simple and secure ordering experience from any device.",
      icon: "📱",
    },
  ];

  return (
    <section className="px-6 py-20 bg-[var(--secondary)] text-[var(--secondary-foreground)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Mango?</h2>
        <p className="text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
          We are committed to providing the best mangoes in Pakistan with unmatched quality and service.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border border-[var(--border)]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
