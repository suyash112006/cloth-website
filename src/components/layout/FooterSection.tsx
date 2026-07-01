"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Men's Collection", href: "#men" },
  { label: "Women's Collection", href: "#women" },
  { label: "Kids Collection", href: "#kids" },
  { label: "Contact Studio", href: "#footer" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Globe },
  { label: "Email", href: "mailto:hello@krishnacreation.com", icon: Mail },
];

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-black/5 bg-white/50"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-24 left-[8%] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-primary-soft/80 blur-3xl" />

      <div className="relative mx-auto flex max-w-[1600px] flex-col gap-16 px-6 py-20 lg:px-16">
        <div
          id="footer-heading"
          className="grid gap-8 rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_25px_80px_rgba(124,92,255,0.12)] backdrop-blur-xl lg:grid-cols-[1.4fr_0.8fr]"
        >
          <div className="space-y-5">
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-text-muted">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Krishna Creation Nashik
            </span>
            <h2
              className="max-w-3xl font-serif leading-tight text-text"
              style={{ fontSize: "var(--text-fluid-h2)" }}
            >
              Crafted for everyday elegance, finished with the kind of detail
              that makes a wardrobe feel personal.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-text-muted lg:text-lg">
              From polished occasion wear to comfortable everyday staples, we
              shape every collection around fit, feel, and effortless movement.
            </p>
          </div>

          <div className="glass flex flex-col justify-between gap-6 rounded-[1.75rem] p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
                Visit The Studio
              </p>
              <p className="mt-3 text-2xl font-serif text-text">
                Let&apos;s style your next signature look.
              </p>
            </div>
            <a
              href="tel:+919876543210"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              Book a Call
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <motion.div
            id="footer-contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
                Contact
              </p>
              <div className="mt-5 space-y-4 text-sm text-text lg:text-base">
                <a
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                  href="mailto:hello@krishnacreation.com"
                >
                  <Mail size={18} className="mt-0.5 text-primary" />
                  <span>hello@krishnacreation.com</span>
                </a>
                <a
                  className="flex items-start gap-3 transition-colors hover:text-primary"
                  href="tel:+919876543210"
                >
                  <Phone size={18} className="mt-0.5 text-primary" />
                  <span>+91 98765 43210</span>
                </a>
                <div className="flex items-start gap-3 text-text">
                  <MapPin size={18} className="mt-0.5 text-primary" />
                  <span>College Road, Nashik, Maharashtra 422005</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text transition-colors hover:text-primary"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            id="footer-links"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-2 text-lg font-serif text-text transition-colors hover:text-primary"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            id="footer-note"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
              Promise
            </p>
            <div className="rounded-[1.5rem] border border-primary/10 bg-white/75 p-6 shadow-lg shadow-primary/5">
              <p className="text-lg font-serif text-text">
                Tailoring-led silhouettes. Thoughtful fabrics. A finish that
                feels luxurious from first wear.
              </p>
              <p className="mt-4 text-sm leading-6 text-text-muted">
                Built for clients who want statement pieces without losing ease,
                softness, or day-long comfort.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 border-t border-black/5 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 Krishna Creation Nashik. All rights reserved.</p>
          <p>Designed with fluid motion, soft light, and a couture-first eye.</p>
        </div>
      </div>
    </footer>
  );
}

