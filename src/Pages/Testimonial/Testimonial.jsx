import React, { useEffect } from "react";
import Sectiontitle from "../../Layout/Sectiontitle/Sectiontitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import { FaQuoteRight } from "react-icons/fa6";

import "@smastrom/react-rating/style.css";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { useState } from "react";
import axiosPublic from "../axiosPublic/axiosPublic";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  // const allaxiospublic = axiosPublic()

  useEffect(() => {
    fetch('https://bistro-boss-server-a7ed.onrender.com/review')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="my-10">
      <Sectiontitle
        title={"TESTIMONIALS"}
        subtitle={"---What Our Clients Say---"}
      ></Sectiontitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {[...reviews] // নতুন অ্যারে বানাচ্ছি, যাতে সরাসরি sort করা যায়
          .sort((a, b) => b._id.localeCompare(a._id)) // ID অনুসারে সর্বশেষ রিভিউগুলো আনছি
          .slice(0, 5).map((review) => (
            <SwiperSlide key={review._id}>
              <div className="mx-24 flex flex-col items-center justify-center my-16">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review.rating}
                  readOnly
                />
                <div>
                  <FaQuoteRight size={150} />
                </div>

                <p className="my-10">{review.details}</p>
                <h3 className="text-4xl text-orange-400 text-center">
                  {review.name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
