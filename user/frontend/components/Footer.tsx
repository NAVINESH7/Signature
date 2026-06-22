import Link from "next/link";
import type { ReactNode } from "react";

const collections = [
  "Kanchipuram Silk",
  "Banarasi Silk",
  "Bridal Silk",
  "Wedding Collection",
];

const customerCare = [
  { label: "Track Orders", href: "/orders" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#171511] text-[#F4EEE3]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-[#B9914B]/10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[20rem] w-[20rem] rounded-full border border-[#B9914B]/10" />

      <div className="border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#C7A96B]">
              A legacy woven in silk
            </p>
            <h2 className="max-w-4xl font-luxury text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Find your forever saree.
            </h2>
          </div>
          <Link
            href="/collections"
            className="group inline-flex w-fit items-center gap-6 rounded-full border border-[#C7A96B]/60 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.26em] transition duration-500 hover:-translate-y-1 hover:bg-[#C7A96B] hover:text-[#171511] sm:px-9 sm:py-5"
          >
            Explore collections
            <span className="text-base transition duration-500 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-2 lg:grid-cols-[1.55fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="inline-block">
              <h2 className="font-luxury text-4xl leading-none tracking-[0.08em] sm:text-5xl">
                SIGNATURE
              </h2>
              <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.48em] text-[#C7A96B]">
                Luxury Silk Sarees
              </p>
            </Link>
            <p className="mt-8 max-w-md text-sm leading-7 text-[#AAA296] sm:text-base sm:leading-8">
              A celebration of heritage, craftsmanship and timeless elegance.
              Premium silk sarees curated for bridal moments, weddings and
              life&apos;s most treasured occasions.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <span className="h-px w-12 bg-[#C7A96B]" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#81796E]">
                Rasipuram · Tamil Nadu
              </span>
            </div>
          </div>

          <FooterColumn title="Collections">
            {collections.map((collection) => (
              <li key={collection}>
                <Link href="/collections" className="footer-link">
                  {collection}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Client Care">
            <li>
              <a href="#footer" className="footer-link">Contact Us</a>
            </li>
            {customerCare.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <div>
            <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C7A96B]">
              Private assistance
            </h3>
            <ul className="space-y-4 text-sm leading-6 text-[#AAA296]">
              <li>
                <a className="footer-link break-all" href="mailto:meyusignature@gmail.com">
                  meyusignature@gmail.com
                </a>
              </li>
              <li>
                <a className="footer-link" href="tel:+919360672054">
                  +91 93606 72054
                </a>
              </li>
              <li>
                <a className="footer-link" href="tel:+919080735468">
                  +91 90807 35468
                </a>
              </li>
              <li className="pt-2 text-[#7F786D]">
                Rasipuram, Tamil Nadu, India
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 text-[10px] uppercase tracking-[0.18em] text-[#6F685E] md:flex-row md:items-center md:justify-between">
          <div>
            <p>© 2026 SIGNATURE. All rights reserved.</p>
            <p className="mt-2 text-[9px] text-[#514C44]">Developed by NAVINESH P K</p>
          </div>
          <div className="flex flex-wrap gap-7">
            <Link href="/privacy" className="transition hover:text-[#C7A96B]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-[#C7A96B]">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #aaa296;
          transition: color 300ms ease, transform 300ms ease;
        }
        .footer-link:hover {
          color: #d7ba7c;
        }
      `}</style>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-7 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C7A96B]">
        {title}
      </h3>
      <ul className="space-y-4 text-sm">{children}</ul>
    </div>
  );
}