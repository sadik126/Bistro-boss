import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from "react-icons/fa";
import StarRatings from 'react-star-ratings';

import Swal from 'sweetalert2';
import axiosPublic from '../../Pages/axiosPublic/axiosPublic';
import { AuthContext } from '../../Pages/Authprovider/Authprovider';


const Review = () => {
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, reset } = useForm()
    const allaxiospublic = axiosPublic()
    const { user } = useContext(AuthContext)


    const onSubmit = async (data) => {
        console.log(data)
        const review = {
            name: user.displayName,
            reciepe_name: data.recipe_name,
            suggestion: data.suggestion,
            details: data.details,
            rating: rating
        }
        const reviewData = await allaxiospublic.post('/review', review)
        console.log(reviewData)
        if (reviewData.data.insertedId) {
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Thanks for your review`,
                showConfirmButton: false,
                timer: 1500,
            });
        }

    }

    console.log(rating)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <p className="text-center text-yellow-600 italic">---Sharing is Caring!!---</p>
                <h2 className="text-center text-2xl font-semibold my-4">GIVE A REVIEW...</h2>
                <hr className="my-4" />
                <h3 className="text-center text-xl font-medium mb-4">RATE US!</h3>
                <div className="flex justify-center mb-6">
                    <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        changeRating={setRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="5px"
                    />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block font-medium">Which recipe you liked most?</label>
                        <input
                            type="text"
                            {...register("recipe_name", { required: true })}
                            placeholder="Recipe you liked most"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Do you have any suggestions for us?</label>
                        <input
                            type="text"
                            {...register("suggestion", { required: true })}
                            placeholder="Suggestion"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Kindly express your care in a short way.</label>
                        <textarea
                            placeholder="Review in detail"
                            {...register("details", { required: true })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                    </div>
                    <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-yellow-700 transition">
                        Send Review 🚀
                    </button>
                </form>
            </div>
        </div>)
};

export default Review;