"use client";

import { useEffect, useState } from "react";

type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
};

interface Props {
  banners: HeroBanner[];
}

export default function HeroSlider({ banners }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) {
    return null;
  }

  const banner = banners[currentIndex];

  return (
    <div className="luxury-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <section
        className="
          relative
          overflow-hidden
          rounded-[2rem]
          min-h-[450px] md:min-h-[550px] 
          shadow-xl
        "
      >
        {/* Background Image */}
        <img
          src={banner.image_url}
          alt={banner.title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* Gradient Overlay - Darker and wider on the left for better text contrast */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r from-black/90 via-black/50 to-transparent
          "
        />

        {/* Content Container - Fixed Alignment */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
          "
        >
          <div
            className="
              w-full
              max-w-3xl
              px-12 md:px-24 /* Dramatically increased left padding */
              text-white
              flex
              flex-col
              items-start /* Ensures exact left alignment */
            "
          >
            {/* Top Label */}
            <p
              className="
                uppercase
                tracking-[0.4em]
                text-xs md:text-sm
                mb-5
                font-medium
                text-white/90
              "
            >
              Luxury Silk Sarees
            </p>

            {/* Main Title */}
            <h1
              className="
                font-luxury font-serif
                text-5xl
                md:text-7xl
                leading-tight
                mb-6
                tracking-wide
              "
            >
              {banner.title}
            </h1>

            {/* Subtitle/Description */}
            {banner.subtitle && (
              <p
                className="
                  text-base md:text-lg
                  text-white/80
                  max-w-md
                  leading-relaxed
                  mb-10
                  font-light
                "
              >
                {banner.subtitle}
              </p>
            )}

            {/* CTA Button - Luxury Styling */}
            {banner.button_text && banner.button_link && (
              <a
                href={banner.button_link}
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-10
                  py-4
                  border
                  border-white
                  bg-white
                  text-black
                  text-xs md:text-sm
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  transition-all
                  duration-500
                  hover:bg-transparent
                  hover:text-white
                "
              >
                {banner.button_text}
              </a>
            )}
          </div>
        </div>

        {/* Slider Navigation Dots */}
        <div
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            flex
            gap-4
          "
        >
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                h-2
                w-2
                rounded-full
                transition-all
                duration-500
                ${
                  currentIndex === index
                    ? "bg-white scale-150"
                    : "bg-white/40 hover:bg-white/70"
                }
              `}
            />
          ))}
        </div>
      </section>
    </div>
  );
}