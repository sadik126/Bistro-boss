import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosPublic from '../axiosPublic/axiosPublic';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';
import { ImSpoonKnife } from 'react-icons/im';

const image_api = import.meta.env.VITE_IMAGE_KEY;
const imageurl = `https://api.imgbb.com/1/upload?&key=${image_api}`;

const Edititems = () => {
    const { name, category, price, recipe, _id, image } = useLoaderData()

    const { register, handleSubmit, reset } = useForm()
    const axiospublic = axiosPublic()
    const axiossecuredata = Useaxiossecure()


    const onSubmit = async (data) => {
        let updatedImage = image;
        if (data.image.length > 0) {
            const imagefile = { image: data.image[0] }
            const res = await axiospublic.post(imageurl, imagefile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                updatedImage = res.data.data.display_url;

            }
        }


        const item = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: updatedImage
        }
        console.log(item)
        const menures = await axiossecuredata.patch(`/menu/${_id}`, item)
        console.log(menures.data)
        if (menures.data.modifiedCount > 0) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: `${data.name} updated on menu successfully`,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload(); // Page will refresh after success message
            });
        }
        reset();
        // console.log(res.data)
    }


    // console.log(item)
    return (
        <>
            <Sectiontitle title="Edit Items" subtitle="Edit Items" />
            <div className='p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Reciepe name*</span>

                        </div>
                        <input defaultValue={name} type="text" {...register("name", { required: true })} placeholder="reciepe name" className="input input-bordered w-full" />

                    </label>

                    <div className='flex gap-5 my-10 justify-between'>
                        <div className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>

                            </div>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-ghost w-full max-w-xs">
                                <option disabled selected>Pick the best category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drink">Drink</option>
                            </select>

                        </div>


                        <label className="form-control w-3/4">
                            <div className="label">
                                <span className="label-text">Price*</span>

                            </div>
                            <input defaultValue={price} type="text" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />

                        </label>

                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Reciepe details*</span>

                        </div>
                        <textarea defaultValue={recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                    </label>


                    {image && (
                        <div className="my-4">
                            <p className="text-gray-600">Current Image:</p>
                            <img src={image} alt="Current" className="w-32 h-32 object-cover rounded" />
                        </div>
                    )}
                    <label className='form-control'>
                        <input {...register("image")} type="file" className="file-input file-input-ghost w-full max-w-xs" />
                    </label>



                    {/* <input type="submit" /> */}
                    <button className='btn bg-gradient-to-r from-slate-900 to-orange-300 text-white'>Edit item <ImSpoonKnife />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Edititems;