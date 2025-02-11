import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { useForm } from "react-hook-form"
import { ImSpoonKnife } from 'react-icons/im';
import axiosPublic from '../axiosPublic/axiosPublic';
import Useaxiossecure, { axiosSecure } from '../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';



const image_api = import.meta.env.VITE_IMAGE_KEY;
const imageurl = `https://api.imgbb.com/1/upload?&key=${image_api}`;
const Additems = () => {
  const { register, handleSubmit, reset } = useForm()
  const axiospublic = axiosPublic()
  const axiossecuredata = Useaxiossecure()
  const onSubmit = async (data) => {
    const imagefile = { image: data.image[0] }
    const res = await axiospublic.post(imageurl, imagefile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.data.success) {
      const item = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url
      }
      console.log(item)
      const menures = await axiossecuredata.post('/menu', item)
      console.log(menures.data)
      if (menures.data.insertedId) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} added on menu successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data)
  }
  return (
    <div>
      <Sectiontitle subtitle={"---What's new?---"} title={"ADD AN ITEM"}></Sectiontitle>
      <div className='p-5'>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Reciepe name*</span>

            </div>
            <input type="text" {...register("name", { required: true })} placeholder="reciepe name" className="input input-bordered w-full" />

          </label>

          <div className='flex gap-5 my-10 justify-between'>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>

              </div>
              <select {...register("category", { required: true })} className="select select-ghost w-full max-w-xs">
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
              <input type="text" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />

            </label>

          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Reciepe details*</span>

            </div>
            <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

          </label>
          <label className='form-control'>
            <input {...register("image", { required: true })} type="file" className="file-input file-input-ghost w-full max-w-xs" />
          </label>



          {/* <input type="submit" /> */}
          <button className='btn bg-gradient-to-r from-slate-900 to-orange-300 text-white'>Add item <ImSpoonKnife />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Additems;