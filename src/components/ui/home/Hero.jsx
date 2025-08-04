"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] py-20 px-6 flex justify-between items-center">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[var(--primary)]">
            Fresh, Juicy, Multani Mangoes 🥭
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] max-w-md">
            Handpicked from the orchards of Multan and delivered straight to
            your doorstep. Taste the sunshine in every bite!
          </p>

          <Link href="/shop">
            <button className="mt-6 px-6 py-3 rounded-full text-white bg-[var(--primary)] hover:bg-[var(--accent)] transition-colors text-xl font-semibold shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex-1 justify-end flex">
          <Image
            src="/images/home.png"
            alt="white chaunsa"
            width={500}
            height={400}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
