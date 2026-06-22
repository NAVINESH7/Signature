/* eslint-disable @next/next/no-img-element */
import Navbar from "@/user/frontend/components/Navbar";
import Footer from "@/user/frontend/components/Footer";
import { getActiveGalleryItems } from "@/user/backend/gallery/getActiveGalleryItems";
import HeroSlider from "@/user/frontend/components/HeroSlider";
import { getActiveHeroBanners } from "@/user/backend/hero-banners/getActiveHeroBanners";

export default async function Home() {
  // Supabase-backed data fetching is intentionally unchanged.
  const banners = await getActiveHeroBanners();
  const galleryItems = await getActiveGalleryItems();

  const collections = [
    "Kanchipuram Silk",
    "Banarasi Silk",
    "Soft Silk",
    "Bridal Silk",
    "Wedding Collection",
    "Festive Collection",
  ];

  // Supabase gallery category mapping is intentionally unchanged.
  const collectionImages = {
    "Kanchipuram Silk": galleryItems.find(
      (item) => item.category === "kanchipuram"
    )?.image_url,
    "Banarasi Silk": galleryItems.find(
      (item) => item.category === "banarasi"
    )?.image_url,
    "Soft Silk": galleryItems.find(
      (item) => item.category === "soft-silk"
    )?.image_url,
    "Bridal Silk": galleryItems.find(
      (item) => item.category === "bridal"
    )?.image_url,
    "Wedding Collection": galleryItems.find(
      (item) => item.category === "wedding"
    )?.image_url,
    "Festive Collection": galleryItems.find(
      (item) => item.category === "festive"
    )?.image_url,
  };

  const houseOfSignatureImage = galleryItems.find(
    (item) => item.category === "house-of-signature"
  )?.image_url;

  const differences = [
    {
      number: "01",
      title: "Pure Silk",
      text: "Authentic premium silk sourced from renowned weaving traditions.",
    },
    {
      number: "02",
      title: "Handcrafted",
      text: "Every saree is woven with exceptional artistry and precision.",
    },
    {
      number: "03",
      title: "Bridal Luxury",
      text: "Exclusive collections designed for unforgettable celebrations.",
    },
    {
      number: "04",
      title: "Worldwide",
      text: "Luxury silk sarees delivered to customers around the globe.",
    },
  ];

  const testimonials = [
    "Absolutely breathtaking craftsmanship and unmatched elegance. The saree became the highlight of our wedding celebration.",
    "Exceptional quality, luxurious silk and timeless artistry. A piece that will remain in our family for generations.",
    "From the weaving to the finishing details, every aspect reflects true luxury and heritage.",
  ];

  const serviceHighlights = [
    { eyebrow: "Complimentary", label: "Luxury Packaging" },
    { eyebrow: "Authentic", label: "Pure Silk" },
    { eyebrow: "Personal", label: "Styling Assistance" },
    { eyebrow: "Worldwide", label: "Insured Delivery" },
  ];

  const heritageStats = [
    { value: "25+", label: "Years of Heritage" },
    { value: "5000+", label: "Happy Clients" },
    { value: "100%", label: "Pure Silk" },
    { value: "Global", label: "Worldwide Delivery" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9EC] text-[#061B42] selection:bg-[#D4AF37] selection:text-white">
      <Navbar />

      <HeroSlider banners={banners} />

      <section className="border-y border-[#D4AF37]/50 bg-[#03132F] text-[#FFF9EC]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-[#FFF9EC]/10 px-5 py-6 md:grid-cols-4 md:px-10 lg:px-16">
          {serviceHighlights.map((item) => (
            <div key={item.label} className="px-3 text-center md:px-6">
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#F3DC8B] md:text-[10px]">
                {item.eyebrow}
              </p>
              <p className="mt-1 font-luxury text-sm md:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="pointer-events-none absolute right-[-8rem] top-8 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#A97908] md:text-xs">
                Curated for connoisseurs
              </p>
              <h2 className="max-w-3xl font-luxury text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#A97908] sm:text-6xl lg:text-7xl">
                Shop the signature collection
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#657087] md:text-base">
              Six expressions of Indian silk, selected for their provenance,
              artistry and enduring beauty.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, index) => {
              const image =
                collectionImages[
                  collection as keyof typeof collectionImages
                ];

              return (
                <article
                  key={collection}
                  className="luxury-tilt group relative min-h-[430px] overflow-hidden rounded-[1.75rem] border border-white/70 bg-[#DDE4F1] shadow-[0_20px_60px_rgba(3,19,47,0.08)]"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={collection}
                      className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#EDF1F8] text-sm uppercase tracking-[0.25em] text-[#657087]">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03132F]/95 via-[#061B42]/25 to-transparent transition duration-500 group-hover:from-[#03132F]" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-7 sm:p-8">
                    <div className="mb-5 h-px w-10 bg-[#E7C85C] transition-all duration-500 group-hover:w-20" />
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.32em] text-[#E7C85C]">
                          Collection {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="font-luxury text-3xl font-semibold leading-none text-[#F3DC8B] sm:text-4xl">
                          {collection}
                        </h3>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl text-white backdrop-blur-md transition duration-500 group-hover:-rotate-45 group-hover:border-[#E7C85C] group-hover:bg-[#E7C85C] group-hover:text-black">
                        &nearr;
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#03132F] px-5 py-24 text-[#FFF9EC] sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
          <div className="group relative [perspective:1400px]">
            <div className="absolute -inset-5 rounded-[2.5rem] border border-[#D4AF37]/25 transition duration-700 group-hover:rotate-2" />
            <div className="heritage-image relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A285C] shadow-[0_40px_100px_rgba(0,0,0,0.45)] md:min-h-[650px]">
              {houseOfSignatureImage ? (
                <img
                  src={houseOfSignatureImage}
                  alt="House Of Signature"
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.25em] text-white/40">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-[#D4AF37]/10" />
              <div className="absolute bottom-6 left-6 rounded-full border border-white/20 bg-black/25 px-5 py-3 text-[10px] uppercase tracking-[0.3em] backdrop-blur-xl">
                An heirloom in every weave
              </div>
            </div>
          </div>

          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#D4AF37] md:text-xs">
              Our heritage
            </p>
            <h2 className="font-luxury text-6xl font-semibold leading-[0.9] tracking-[-0.045em] text-[#F3DC8B] sm:text-7xl lg:text-8xl">
              House of
              <span className="block italic text-[#D4AF37]">Signature</span>
            </h2>
            <div className="my-10 h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <p className="max-w-xl text-lg leading-8 text-[#E7EBF4]">
              Rooted in generations of craftsmanship, every Signature saree is
              a celebration of India&apos;s rich weaving heritage.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#AAB5CA]">
              From bridal masterpieces to heirloom-worthy silk creations, each
              saree is designed to be treasured across generations.
            </p>
            <a
              href="/collections"
              className="group/link mt-10 inline-flex items-center gap-4 border-b border-[#D4AF37] pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#FFF9EC]"
            >
              Discover our story
              <span className="transition duration-300 group-hover/link:translate-x-2">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#E8EEF8] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 overflow-hidden rounded-[2rem] border border-[#D4AF37] bg-[#FFF9EC] shadow-[0_20px_60px_rgba(3,19,47,0.08)] lg:grid-cols-4">
          {heritageStats.map((item, index) => (
            <div
              key={item.label}
              className={`group relative px-5 py-10 text-center md:py-14 ${
                index % 2 === 0 ? "border-r border-[#D4AF37]" : ""
              } ${index < 2 ? "border-b border-[#D4AF37] lg:border-b-0" : ""} ${
                index !== 3 ? "lg:border-r lg:border-[#D4AF37]" : ""
              }`}
            >
              <p className="font-luxury text-4xl font-semibold text-[#A97908] transition duration-500 group-hover:-translate-y-1 group-hover:text-[#D4AF37] md:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#657087] md:text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#A97908] md:text-xs">
              Why choose us
            </p>
            <h2 className="font-luxury text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-[#A97908] sm:text-6xl lg:text-7xl">
              The Signature difference
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {differences.map((item) => (
              <article
                key={item.title}
                className="luxury-tilt group relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-[#D4AF37] bg-[#F8FAFF] p-8 shadow-[0_16px_50px_rgba(3,19,47,0.06)]"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#D4AF37]/20 transition duration-700 group-hover:scale-125 group-hover:bg-[#D4AF37]/5" />
                <p className="font-luxury text-5xl text-[#D4AF37]/35 transition duration-500 group-hover:text-[#D4AF37]">
                  {item.number}
                </p>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="mb-6 h-px w-10 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
                  <h3 className="font-luxury text-3xl font-semibold text-[#A97908]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#657087]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#E6EDF8] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 font-luxury text-[10rem] leading-none text-white/25 md:text-[18rem]">
          &ldquo;
        </div>
        <div className="relative mx-auto max-w-[1440px]">
          <div className="mb-16 md:mb-20">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.5em] text-[#A97908] md:text-xs">
              Testimonials
            </p>
            <h2 className="font-luxury text-5xl font-semibold leading-none tracking-[-0.04em] text-[#A97908] sm:text-6xl lg:text-7xl">
              Loved by generations
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            {testimonials.map((review, index) => (
              <article
                key={review}
                className="luxury-tilt group flex min-h-[310px] flex-col justify-between rounded-[1.75rem] border border-white/70 bg-white/55 p-8 shadow-[0_20px_60px_rgba(3,19,47,0.07)] backdrop-blur-xl md:p-10"
              >
                <span className="font-luxury text-5xl leading-none text-[#D4AF37]">&ldquo;</span>
                <p className="my-7 text-base leading-8 text-[#263E66] md:text-lg">
                  {review}
                </p>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-[#D4AF37]" />
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#657087]">
                    Signature story {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .luxury-tilt {
          transform-style: preserve-3d;
          transition: transform 650ms cubic-bezier(.2,.8,.2,1), box-shadow 650ms ease, border-color 450ms ease;
          will-change: transform;
        }
        .luxury-tilt:hover {
          transform: perspective(1200px) rotateX(2.5deg) rotateY(-2.5deg) translateY(-12px) scale(1.015);
          border-color: rgba(185,145,75,.75);
          box-shadow: 0 34px 80px rgba(3,19,47,.18);
        }
        .heritage-image {
          transform: rotateY(0deg) rotateX(0deg);
          transform-style: preserve-3d;
          transition: transform 800ms cubic-bezier(.2,.8,.2,1);
        }
        .group:hover .heritage-image {
          transform: perspective(1400px) rotateY(2.5deg) rotateX(1deg) translateY(-8px);
        }
        @media (prefers-reduced-motion: reduce) {
          .luxury-tilt,
          .heritage-image {
            transition: none;
          }
          .luxury-tilt:hover,
          .group:hover .heritage-image {
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
