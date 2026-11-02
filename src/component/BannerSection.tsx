"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of stories, discover new authors, and find books that inspire your imagination.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
  {
    title: "Every Book Opens a New World",
    description:
      "From exciting fiction to inspiring knowledge, your next reading adventure starts here.",
    image:
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
  },
  {
    title: "Read More. Learn More. Grow More.",
    description:
      "Borrow your favorite books and enjoy the wonderful journey of reading with BookNook.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
];

const BannerSection = () => {
  return (
     <section className="mx-auto max-w-8xl px-4 py-6">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="overflow-hidden rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex min-h-[480px] items-center bg-cover bg-center px-6 py-16 sm:px-12 lg:px-20"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-slate-950/65" />

              <div className="relative z-10 max-w-2xl text-white">
                <div className="mb-6 flex items-center gap-2 text-orange-400">
                  <BookOpen size={22} />
                  <span className="font-semibold tracking-widest">
                    WELCOME TO BOOKNOOK
                  </span>
                </div>

                <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                  {slide.description}
                </p>

                  <Link
                    href="/books"
                    className="mt-8 inline-flex items-center rounded-lg bg-orange-500 px-7 py-4 text-base font-semibold text-white transition hover:bg-orange-600"
                  >
                    Browse Books
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSection;