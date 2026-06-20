/* eslint-disable @next/next/no-img-element */
import Navbar from "@/user/frontend/components/Navbar";
import Footer from "@/user/frontend/components/Footer";
import { getActiveGalleryItems } from "@/user/backend/gallery/getActiveGalleryItems";
import HeroSlider from "@/user/frontend/components/HeroSlider";
import { getActiveHeroBanners } from "@/user/backend/hero-banners/getActiveHeroBanners";
import Link from "next/link";


export default async function Home() {
  
const banners =
  await getActiveHeroBanners();

const galleryItems =
  await getActiveGalleryItems();

  const collections = [
    "Kanchipuram Silk",
    "Banarasi Silk",
    "Soft Silk",
    "Bridal Silk",
    "Wedding Collection",
    "Festive Collection",
  ];


const collectionImages = {
  "Kanchipuram Silk":
    galleryItems.find(
      (item) =>
        item.category ===
        "kanchipuram"
    )?.image_url,

  "Banarasi Silk":
    galleryItems.find(
      (item) =>
        item.category ===
        "banarasi"
    )?.image_url,

  "Soft Silk":
    galleryItems.find(
      (item) =>
        item.category ===
        "soft-silk"
    )?.image_url,

  "Bridal Silk":
    galleryItems.find(
      (item) =>
        item.category ===
        "bridal"
    )?.image_url,

  "Wedding Collection":
    galleryItems.find(
      (item) =>
        item.category ===
        "wedding"
    )?.image_url,

  "Festive Collection":
    galleryItems.find(
      (item) =>
        item.category ===
        "festive"
    )?.image_url,
};

const houseOfSignatureImage =
  galleryItems.find(
    (item) =>
      item.category ===
      "house-of-signature"
  )?.image_url;


  return (
    <main className="bg-[#F8F6F2] min-h-screen">
      <Navbar />

      {/* HERO SLIDER */}
      <section className="pt-20">
        <HeroSlider banners={banners} />
      </section>

      {/* COLLECTIONS */}
      <section className="luxury-section">
        <div className="luxury-container">
          <div className="text-center mb-24">
            <h2
              className="
                font-luxury
                text-5xl
                md:text-6xl
                leading-none
                tracking-[-1px]
                text-[#1A1A1A]
                -translate-y-8
              "
            >
              Shop By Collection
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (

<Link
  key={collection}
  href={`/collections?category=${collection
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
>
  <div
    className="
      bg-white
      border
      border-[#E7E0D4]
      rounded-[16px]
      overflow-hidden
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-xl
      cursor-pointer
    "
  >

{collectionImages[
  collection as keyof typeof collectionImages
] ? (
  <img
    src={
      collectionImages[
        collection as keyof typeof collectionImages
      ]
    }
    alt={collection}
    className="
      h-[220px]
      w-full
      object-cover
    "
  />
) : (
  <div
    className="
      h-[220px]
      w-full
      bg-[#F3EFE8]
      flex
      items-center
      justify-center
      text-gray-400
    "
  >
    No Image
  </div>
  
)}

                <div
                  className="
                    h-[70px]
                    flex
                    items-center
                    justify-center
                    px-6
                  "
                >
                  <h3
                    className="
                      font-luxury
                      text-[20px]
                      text-center
                      leading-none
                    "
                  >
                    {collection}
                  </h3>
                </div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSE OF SIGNATURE */}
      <section className="luxury-section">
        <div className="luxury-container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-[24px] shadow-xl">
              
{houseOfSignatureImage ? (
  <img
    src={houseOfSignatureImage}
    alt="House Of Signature"
    className="
      w-full
      h-[520px]
      object-cover
    "
  />
) : (
  <div
    className="
      w-full
      h-[520px]
      bg-[#F3EFE8]
      flex
      items-center
      justify-center
      text-gray-400
    "
  >
    No Image
  </div>
)}

            </div>

            <div>
              <p className="uppercase tracking-[8px] text-[#B8860B] text-sm mb-4">
                Our Heritage
              </p>

              {/* GUARANTEED SPACE: House Of Signature */}
              <h2 className="section-title" style={{ marginBottom: "48px" }}>
                House Of
                <br />
                Signature
              </h2>

              <p className="text-gray-600 text-lg leading-8 mb-6">
                Rooted in generations of craftsmanship,
                every Signature saree is a celebration
                of India&apos;s rich weaving heritage.
              </p>

              <p className="text-gray-600 text-lg leading-8 mb-10">
                From bridal masterpieces to heirloom-worthy
                silk creations, each saree is designed to
                be treasured across generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE HERITAGE STRIP */}
      <section className="py-16">
        <div className="luxury-container">
          <div
            className="
              border-y
              border-[#E7E0D4]
              py-12
            "
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              <div>
                <h3 className="font-luxury text-4xl md:text-5xl mb-2">
                  25+
                </h3>
                <p className="text-gray-600">
                  Years of Heritage
                </p>
              </div>

              <div>
                <h3 className="font-luxury text-4xl md:text-5xl mb-2">
                  5000+
                </h3>
                <p className="text-gray-600">
                  Happy Clients
                </p>
              </div>

              <div>
                <h3 className="font-luxury text-4xl md:text-5xl mb-2">
                  100%
                </h3>
                <p className="text-gray-600">
                  Pure Silk
                </p>
              </div>

              <div>
                <h3 className="font-luxury text-4xl md:text-5xl mb-2">
                  Global
                </h3>
                <p className="text-gray-600">
                  Worldwide Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SIGNATURE */}
      <section className="luxury-section bg-white">
        <div className="luxury-container">
          {/* GUARANTEED SPACE: The Signature Difference */}
          <div className="text-center" style={{ marginBottom: "80px" }}>
            <p className="uppercase tracking-[8px] text-[#B8860B] text-sm mb-3">
              Why Choose Us
            </p>

            <h2
              className="
                font-luxury
                text-5xl
                md:text-6xl
                text-[#111111]
              "
            >
              The Signature Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Pure Silk",
                text: "Authentic premium silk sourced from renowned weaving traditions.",
              },
              {
                title: "Handcrafted",
                text: "Every saree is woven with exceptional artistry and precision.",
              },
              {
                title: "Bridal Luxury",
                text: "Exclusive collections designed for unforgettable celebrations.",
              },
              {
                title: "Worldwide",
                text: "Luxury silk sarees delivered to customers around the globe.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  bg-[#F8F6F2]
                  p-10
                  rounded-[24px]
                  border
                  border-[#E7E0D4]
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    bg-[#B8860B]/10
                    mb-6
                  "
                />

                <h3
                  className="
                    font-luxury
                    text-2xl
                    mb-4
                  "
                >
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="luxury-section bg-white">
        <div className="luxury-container">
          {/* GUARANTEED SPACE: Loved By Generations */}
          <div className="text-center" style={{ marginBottom: "80px" }}>
            <p className="uppercase tracking-[8px] text-[#B8860B] text-sm mb-3">
              Testimonials
            </p>

            <h2 className="font-luxury text-5xl md:text-6xl">
              Loved By Generations
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                review:
                  "Absolutely breathtaking craftsmanship and unmatched elegance. The saree became the highlight of our wedding celebration.",
                name: "Signature Bride",
              },
              {
                review:
                  "Exceptional quality, luxurious silk and timeless artistry. A piece that will remain in our family for generations.",
                name: "Happy Client",
              },
              {
                review:
                  "From the weaving to the finishing details, every aspect reflects true luxury and heritage.",
                name: "Signature Customer",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  bg-[#F8F6F2]
                  p-10
                  rounded-[24px]
                  border
                  border-[#E7E0D4]
                "
              >
                <p className="text-gray-600 leading-8 mb-8">
                  &quot;{item.review}&quot;
                </p>

                <h4 className="font-medium text-[#111111]">
                  {item.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}