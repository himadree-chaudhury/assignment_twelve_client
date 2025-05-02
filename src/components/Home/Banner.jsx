import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";

const Banner = () => {
  const bannerHero = [
    {
      title: "Find Your Perfect Match",
      image: banner1,
      text: "Discover meaningful connections with Pathway, your trusted partner in finding love.",
      buttonText: "Start Your Journey",
      url: "",
    },
    {
      title: "A Pathway to Love",
      image: banner2,
      text: "Join thousands of singles on their journey to a lifelong partnership.",
      buttonText: "Explore Biodata",
      url: "/all-biodata",
    },
    {
      title: "Celebrate Your Love Story",
      image: banner3,
      text: "From first connection to forever – Pathway makes love stories happen.",
      buttonText: "See Success Stories",
      url: "",
    },
    {
      title: "Your Partner, Your Choice",
      image: banner4,
      text: "Filter and connect with biodatas that match your preferences perfectly.",
      buttonText: "Find Matches Now",
      url: "",
    },
    {
      title: "Begin Your Forever Today",
      image: banner5,
      text: "Sign up with Pathway and take the first step toward a beautiful future.",
      buttonText: "Join Now",
      url: "/login",
    },
  ];
  return (
    <section>
      <div>
        <div className="w-full">
          {/* Swiper component */}
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[60vh]"
          >
            {/* Slides */}
            {bannerHero.map((hero) => (
              <SwiperSlide>
                <div className="relative h-full w-full bg-gradient-to-r from-transparent to-pink-400">
                  {/* Background image */}
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="h-full w-full object-cover opacity-60"
                  />
                  <div className="absolute top-1/2 left-10 max-w-xl -translate-y-1/2 transform text-white">
                    {/* Main heading for the slide */}
                    <h1>{hero.title}</h1>
                    {/* Description */}
                    <p className="text-text-secondary-dark mb-6">{hero.text}</p>
                    {/* All movies Button */}
                    <Link to={hero.url} className="btn-primary">
                      {hero.buttonText}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
