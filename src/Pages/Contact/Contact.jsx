import React from 'react';
import Cover from '../Cover/Cover';
import menuImg from "../../assets/shop/banner2.jpg";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
    return (
        <div>
            <Cover
                img={menuImg}
                title={"Our Menu"}
                para="Would you like to try a dish?"

            ></Cover>


            <div className="min-h-screen bg-gray-100 py-10 px-5">
                {/* Location Section */}
                <div className="text-center mb-10">
                    <p className="text-yellow-600 font-semibold">---Visit Us---</p>
                    <h2 className="text-3xl font-bold mt-2">OUR LOCATION</h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow-lg rounded-lg text-center p-6">
                        <div className="bg-yellow-600 text-white p-4 rounded-t-lg">
                            <FaPhoneAlt className="text-2xl mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4">PHONE</h3>
                        <p className="text-gray-600">+38 (012) 34 56 789</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg text-center p-6">
                        <div className="bg-yellow-600 text-white p-4 rounded-t-lg">
                            <FaMapMarkerAlt className="text-2xl mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4">ADDRESS</h3>
                        <p className="text-gray-600">+38 (012) 34 56 789</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg text-center p-6">
                        <div className="bg-yellow-600 text-white p-4 rounded-t-lg">
                            <FaClock className="text-2xl mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4">WORKING HOURS</h3>
                        <p className="text-gray-600">Mon - Fri: 08:00 - 22:00</p>
                        <p className="text-gray-600">Sat - Sun: 15:00 - 22:00</p>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="text-center mt-14">
                    <p className="text-yellow-600 font-semibold">---Send Us a Message---</p>
                    <h2 className="text-3xl font-bold mt-2">CONTACT FORM</h2>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium">Name*</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Email*</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 p-3 border rounded-md"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-medium">Phone*</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="w-full mt-1 p-3 border rounded-md"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-medium">Message*</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message here"
                                className="w-full mt-1 p-3 border rounded-md"
                            ></textarea>
                        </div>

                        {/* reCAPTCHA & Submit */}
                        <div className="md:col-span-2 flex flex-col items-center">
                            <div className="mb-4">
                                <input type="checkbox" id="recaptcha" />
                                <label htmlFor="recaptcha" className="ml-2 text-gray-600">
                                    I'm not a robot
                                </label>
                            </div>
                            <button className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 flex items-center gap-2">
                                Send Message 🚀
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Contact;