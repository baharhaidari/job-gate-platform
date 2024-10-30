import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaQuoteRight } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      text: "This platform has completely transformed my job search experience. I found my dream job in just a week! The comprehensive filtering options allowed me to zero in on positions that were perfectly suited to my skills and career goals. The platform's ease of use and intuitive design made the process seamless and stress-free. I can't imagine going back to any other job search method.",
      name: "John Doe",
      title: "Software Engineer",
    },
    {
      text: "The user interface is incredibly intuitive and easy to navigate. Highly recommend it! I have used various job search platforms in the past, but none compare to the usability and efficiency of this one. The design is clean, modern, and very responsive, making it easy to apply to jobs on any device. The way the information is presented makes it simple to understand, which has significantly reduced my job search time.",
      name: "Jane Smith",
      title: "Product Designer",
    },
    {
      text: "A great platform with lots of opportunities! I was able to land a great part-time job while studying. The search features are so well thought out, allowing me to find flexible roles that fit perfectly with my class schedule. The support team was also very responsive and helpful when I had questions. This platform is ideal for students looking to gain work experience without compromising their studies.",
      name: "Mike Johnson",
      title: "Student",
    },
    {
      text: "The best job search platform I've ever used. The filtering options are incredibly useful. I was able to refine my search results to only show jobs that matched my exact criteria, saving me countless hours. The job alerts feature also kept me informed about new opportunities as soon as they were posted. I highly recommend this platform to anyone serious about their career search.",
      name: "Emily Davis",
      title: "Marketing Manager",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-20 gap-14">
      <h1 className="heading text-slate-700 font-semibold capitalize">
        What our <span className="text-green-700">users say</span>
      </h1>

      <Swiper
        spaceBetween={40}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="w-full "
        breakpoints={{
          // When the screen width is >= 1024px, display 2 slides
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // When the screen width is < 1024px, display 1 slide
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center h-full mb-20"
          >
            <div className="bg-slate-200 p-7 border border-gray-200 rounded-lg shadow-lg w-full">
              <p className="text__desc text-gray-600 italic leading-relaxed min-h-48">
                "{testimonial.text}"
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-base">{testimonial.title}</p>
                </div>

                <span className="text-4xl text-green-700">
                  <FaQuoteRight />
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
