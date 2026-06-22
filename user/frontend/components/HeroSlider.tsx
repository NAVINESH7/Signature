/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";

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
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((previous) =>
        previous === banners.length - 1 ? 0 : previous + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[currentIndex];

  const showPrevious = () => {
    setCurrentIndex((previous) =>
      previous === 0 ? banners.length - 1 : previous - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((previous) =>
      previous === banners.length - 1 ? 0 : previous + 1
    );
  };

  return (
    <section className="bg-[#FFF9EC] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <div className="hero-perspective mx-auto max-w-[1600px]">
        <div className="hero-shell group relative min-h-[580px] overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/35 bg-[#03132F] shadow-[0_35px_100px_rgba(3,19,47,0.3)] sm:min-h-[650px] lg:min-h-[720px] lg:rounded-[2.5rem]">
          <img
            key={`image-${banner.id}`}
            src={banner.image_url}
            alt={banner.title}
            className="hero-image-enter absolute inset-0 h-full w-full object-cover object-center transition duration-[1800ms] ease-out group-hover:scale-[1.035]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#03132F]/95 via-[#061B42]/72 to-[#061B42]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03132F]/70 via-transparent to-[#03132F]/15" />
          <div className="pointer-events-none absolute -left-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#D4AF37]/25 blur-[100px]" />

          <div className="absolute inset-0 z-10 flex items-center px-7 py-20 sm:px-12 md:px-16 lg:px-24 xl:px-32">
            <div key={`content-${banner.id}`} className="hero-copy-enter w-full max-w-3xl text-left text-white">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-10 bg-[#E7C85C] sm:w-16" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.42em] text-[#F3DC8B] sm:text-[11px]">
                  Luxury silk sarees
                </p>
              </div>

              <h1 className="max-w-3xl font-luxury text-5xl font-semibold leading-[0.88] tracking-[-0.04em] text-[#F3DC8B] drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
                {banner.title}
              </h1>

              {banner.subtitle && (
                <p className="mt-8 max-w-xl text-sm font-light leading-7 text-[#FFF9EC]/85 sm:text-base sm:leading-8 md:text-lg">
                  {banner.subtitle}
                </p>
              )}

              {banner.button_text && banner.button_link && (
                <a
                  href={banner.button_link}
                  className="group/button mt-10 inline-flex items-center gap-5 rounded-full border border-[#F3DC8B]/70 bg-[#D4AF37] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#03132F] shadow-[0_14px_40px_rgba(0,0,0,0.25)] transition duration-500 hover:-translate-y-1 hover:border-[#F3DC8B] hover:bg-[#F3DC8B] hover:shadow-[0_20px_55px_rgba(212,175,55,0.32)] sm:px-9 sm:py-5 sm:text-xs"
                >
                  {banner.button_text}
                  <ArrowDownRight
                    size={17}
                    className="transition duration-500 group-hover/button:-rotate-45"
                  />
                </a>
              )}
            </div>
          </div>

          <div className="absolute bottom-7 left-7 right-7 z-20 flex items-end justify-between sm:bottom-10 sm:left-12 sm:right-12 lg:left-24 lg:right-24">
            <div className="flex items-center gap-3">
              {banners.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[2px] transition-all duration-500 ${
                    currentIndex === index
                      ? "w-12 bg-[#F3DC8B]"
                      : "w-5 bg-white/35 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {banners.length > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F3DC8B]/35 bg-[#03132F]/35 text-[#FFF9EC] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#F3DC8B] hover:bg-[#D4AF37] hover:text-[#03132F] sm:h-12 sm:w-12"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next slide"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F3DC8B]/35 bg-[#03132F]/35 text-[#FFF9EC] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#F3DC8B] hover:bg-[#D4AF37] hover:text-[#03132F] sm:h-12 sm:w-12"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>

          <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-white/55 xl:flex">
            <span>Signature</span>
            <span className="h-px w-12 bg-white/30" />
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-perspective {
          perspective: 1800px;
        }
        .hero-shell {
          transform: rotateX(0deg) translateZ(0);
          transform-style: preserve-3d;
          transition: transform 900ms cubic-bezier(.2,.8,.2,1), box-shadow 900ms ease;
        }
        .hero-shell:hover {
          transform: rotateX(.5deg) translateY(-4px);
            box-shadow: 0 46px 120px rgba(3,19,47,.38);
        }
        .hero-image-enter {
          animation: heroImageReveal 1100ms cubic-bezier(.2,.8,.2,1) both;
        }
        .hero-copy-enter {
          animation: heroCopyReveal 850ms 120ms cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes heroImageReveal {
          from { opacity: .35; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes heroCopyReveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-shell,
          .hero-image-enter,
          .hero-copy-enter {
            animation: none;
            transition: none;
          }
          .hero-shell:hover { transform: none; }
        }
      `}</style>
    </section>
  );
}
