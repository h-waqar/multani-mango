"use client";
import { usePathname } from "next/navigation";
import { contactDetails } from "@/data/details";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on all admin pages
  if (pathname.startsWith("/admin")) return null;

  const phone = contactDetails.whatsApp;
  const message = encodeURIComponent("Hi! I'm interested in your mangoes 🍋");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition duration-300 w-14 h-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="28"
          height="28"
        >
          <path d="M20.52 3.48A11.937 11.937 0 0012 0C5.37 0 .015 6.186 2.194 12.26L.002 24l11.525-2.916c6.066 2.186 12.262-3.176 12.262-9.84 0-3.19-1.24-6.212-3.268-8.26zM12 21.5c-1.658 0-3.252-.432-4.662-1.222l-.33-.186-6.02 1.52 1.604-5.838-.188-.332C1.406 13.254 1 11.655 1 10c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11zm5.336-7.92c-.264-.132-1.557-.768-1.797-.856-.24-.09-.416-.132-.593.132s-.68.855-.833 1.03c-.152.176-.304.198-.568.066-.264-.132-1.113-.41-2.12-1.308-.784-.696-1.312-1.56-1.464-1.824-.152-.264-.016-.406.116-.538.12-.12.264-.304.4-.456.132-.152.176-.264.264-.44.088-.176.044-.33-.022-.462-.066-.132-.593-1.428-.81-1.954-.212-.508-.426-.44-.593-.448l-.504-.01c-.176 0-.462.066-.704.33s-.924.904-.924 2.206c0 1.302.947 2.562 1.08 2.738.132.176 1.864 2.848 4.52 3.992.632.27 1.126.43 1.51.552.634.202 1.212.174 1.666.106.508-.078 1.557-.636 1.776-1.25.22-.616.22-1.144.154-1.25-.066-.106-.24-.17-.504-.302z" />
        </svg>
      </div>
    </a>
  );
}
