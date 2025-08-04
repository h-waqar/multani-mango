"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

import reviews from "@/context/reviewsData";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const [sliderInstance, setSliderInstance] = useState(null);

  const [ref] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: { perView: 1.2, spacing: 16 },
        },
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 20 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 24 },
        },
      },
      created(instance) {
        setSliderInstance(instance);
      },
    },
    []
  );

  return (
    <section className="px-6 py-20 bg-[var(--background)] text-[var(--foreground)] relative">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
          Thousands of happy mango lovers across Pakistan.
        </p>

        <div className="relative">
          {/* Slider */}
          <div ref={ref} className="keen-slider">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="keen-slider__slide bg-[var(--card)] text-[var(--card-foreground)] p-6 rounded-xl shadow border border-[var(--border)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                  <div className="text-left">
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {review.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-left text-[var(--muted-foreground)]">
                  “{review.comment}”
                </p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          {/* <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center z-10 pointer-events-none"> */}
          <div className="flex justify-center gap-4 mt-4 items-center z-10 pointer-events-none">
            <button
              onClick={() => sliderInstance?.prev()}
              className="p-2 bg-white rounded-full shadow hover:bg-[var(--primary)] hover:text-white transition pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderInstance?.next()}
              className="p-2 bg-white rounded-full shadow hover:bg-[var(--primary)] hover:text-white transition pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
