import Link from "next/link";

export default function Footer() {
  return (
    <footer
  id="footer"
  className="mt-24 bg-white border-t border-[#E7E0D4]"
>
      <div className="luxury-container pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">
          {/* Brand */}

          <div className="lg:col-span-2">
            <h2
              className="
                font-luxury
                text-5xl
                text-[#111111]
                leading-none
              "
            >
              SIGNATURE
            </h2>

            <p
              className="
                uppercase
                tracking-[6px]
                text-[#B8860B]
                text-xs
                mt-3
              "
            >
              Luxury Silk Sarees
            </p>

            <p
              className="
                mt-6
                text-gray-600
                leading-9
                max-w-lg
                text-lg
              "
            >
              A celebration of heritage, craftsmanship and timeless elegance.
              Discover premium silk sarees curated for bridal moments,
              weddings and life's most treasured occasions.
            </p>
          </div>

          {/* Collections */}

          <div>
            <h3
              className="
                text-[#111111]
                font-semibold
                text-lg
                mb-5
              "
            >
              Collections
            </h3>

            <ul className="space-y-3 text-gray-600 text-lg">
              <li>
                <Link href="/collections">
                  Kanchipuram Silk
                </Link>
              </li>

              <li>
                <Link href="/collections">
                  Banarasi Silk
                </Link>
              </li>

              <li>
                <Link href="/collections">
                  Bridal Silk
                </Link>
              </li>

              <li>
                <Link href="/collections">
                  Wedding Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}

          <div>
            <h3
              className="
                text-[#111111]
                font-semibold
                text-lg
                mb-5
              "
            >
              Customer Care
            </h3>

            <ul className="space-y-3 text-gray-600 text-lg">


<li>
  <a href="#footer">
    Contact Us
  </a>
</li>

              <li>
                <Link href="/orders">
                  Track Orders
                </Link>
              </li>

              <li>
                <Link href="/shipping">
                  Shipping
                </Link>
              </li>

              <li>
                <Link href="/returns">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3
              className="
                text-[#111111]
                font-semibold
                text-lg
                mb-5
              "
            >
              Contact
            </h3>

            <ul className="space-y-3 text-gray-600 text-lg">
              <li>meyusignature@gmail.com</li>
              <li>+91 93606 72054 </li>
              <li>+91 90807 35468 </li>
              <li>+91 88071 70215</li>
              <li>Rasipuram, Tamil Nadu, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-16
            pt-8
            border-t
            border-[#E7E0D4]
            flex
            flex-col
            items-center
            text-center
          "
        >
          <p className="text-gray-500 text-lg">
            © 2026 SIGNATURE. All rights reserved.
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Developed by NAVINESH P K
          </p>

          <div className="flex gap-10 mt-8 text-gray-500">
            <Link href="/privacy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}