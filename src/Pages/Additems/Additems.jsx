import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { useForm } from "react-hook-form"
import { ImSpoonKnife } from 'react-icons/im';

const Additems = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)
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
          <button className='btn'>Add item <ImSpoonKnife />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Additems;