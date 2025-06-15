import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { categories } from "../data/categories";
import { Link } from "react-router-dom";

const banners = [
  {
    title: "From Pop Ballads to Emo Encores",
    subtitle: "Get Into It",
    button: "Get Into Live Music",
    image:
      "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Paint The Town Rainbow",
    subtitle: "Get Into Pride",
    button: "Get Into Pride Celebrations",
    image:
      "https://images.pexels.com/photos/399610/pexels-photo-399610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

function Home() {
  return (
    <div className="bg-white">
      {/* Carousel Section */}
      <section className="max-w-7xl mx-auto py-6 px-4">
        <Swiper
          slidesPerView={1}
          loop
          aria-label="Eventify banners"
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden" style={{ height: "350px" }}>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 200, maxHeight: 400 }}
                />
                <div className="absolute inset-0 bg-opacity-40 flex flex-col items-start justify-center p-8">
                  <h3 className="text-sm font-semibold  text-white">
                    {banner.subtitle}
                  </h3>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-xl">
                    {banner.title}
                  </h2>
                  <button className="bg-white text-black font-medium px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white transition">
                    {banner.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6">
          {categories.map((cat) => (
            <Link
              to={`/categories/${cat.name.toLowerCase()}`}
              key={cat.name}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-16 h-16 border rounded-full flex items-center justify-center text-orange-600 border-orange-200 group-hover:bg-orange-50 transition">
                {cat.icon}
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
