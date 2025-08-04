"use client";

import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { contactDetails } from "@/data/details";

export default function Footer() {
  return (
    // <footer className="bg-gradient-to-t from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)] py-10 px-6">
    <footer className="bg-[var(--primary)] text-[var(--primary-foreground)] py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>

          <a
            href="mailto:info@multanimango.com"
            className="flex items-center gap-2 hover:underline"
          >
            <Mail size={16} />
            {contactDetails.email}
          </a>

          <a
            href={`tel:+${contactDetails.phone}`}
            className="flex items-center gap-2 hover:underline"
          >
            <Phone size={16} />
            {contactDetails.phone}
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4">
            <Link
              href={contactDetails.facebook}
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href={contactDetails.instagram}
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href={contactDetails.twitter}
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-[var(--primary-foreground)]/80">
        &copy; {new Date().getFullYear()} Multani Mango. All rights reserved.
      </div>
    </footer>
  );
}
