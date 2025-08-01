import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createCourseSchema } from "../../../utils/zodSchema";

export default function ManageCreateCoursePage() {
  const categories = useLoaderData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(createCourseSchema),
  });

  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            New Course
          </h1>
          <p className="text-[#838C9D] mt-[1]">Create new future for company</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="#"
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Import from BWA
          </Link>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]"
      >
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">
            Course Name
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/note-favorite-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <input
              {...register("name")}
              type="text"
              name="title"
              id="title"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Write better name for your course"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.name?.message}
          </span>
        </div>
        <div className="relative flex flex-col gap-[10px]">
          <label htmlFor="thumbnail" className="font-semibold">
            Add a Thumbnail
          </label>
          <div
            id="thumbnail-preview-container"
            className="relative flex shrink-0 w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden"
          >
            <button
              type="button"
              id="trigger-input"
              onClick={() => inputFileRef?.current?.click()}
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-3 z-0"
            >
              <img
                src="/assets/images/icons/gallery-add-black.svg"
                className="w-6 h-6"
                alt="icon"
              />
              <span className="text-[#838C9D]">Add an attachment</span>
            </button>
            <img
              id="thumbnail-preview"
              src={file !== null ? URL.createObjectURL(file) : ""}
              className={`w-full h-full object-cover ${
                file !== null ? "block" : "hidden"
              }`}
              alt="thumbnail"
            />
            <button
              type="button"
              id="delete-preview"
              className="absolute right-[10px] bottom-[10px] w-12 h-12 rounded-full z-10 hidden"
            >
              <img src="/assets/images/icons/delete.svg" alt="delete" />
            </button>
          </div>
          <input
            {...register("thumbnail")}
            ref={inputFileRef}
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setValue("thumbnail", e.target.files[0]);
              }
            }}
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            className="absolute bottom-0 left-1/4 -z-10"
          />
          <span className="error-message text-[#FF435A]">
            {errors?.thumbnail?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="tagline" className="font-semibold">
            Course Tagline
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/bill-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <input
              {...register("tagline")}
              type="text"
              name="tagline"
              id="tagline"
              className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Write tagline for better copy"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.tagline?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="category" className="font-semibold">
            Select Category
          </label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/bill-black.svg"
              className="w-6 h-6"
              alt="icon"
            />
            <select
              {...register("categoryId")}
              name="category"
              id="category"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
            >
              <option value="" hidden>
                Choose one category
              </option>
              {categories?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <img
              src="/assets/images/icons/arrow-down.svg"
              className="w-6 h-6"
              alt="icon"
            />
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.categoryId?.message}
          </span>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="desc" className="font-semibold">
            Description
          </label>
          <div className="flex w-full rounded-[20px] border border-[#CFDBEF] gap-3 p-5  transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img
              src="/assets/images/icons/note-black.png"
              className="w-6 h-6"
              alt="icon"
            />
            <textarea
              {...register("description")}
              name="desc"
              id="desc"
              rows="5"
              className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              placeholder="Explain what this course about"
            ></textarea>
          </div>
          <span className="error-message text-[#FF435A]">
            {errors?.description?.message}
          </span>
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            type="button"
            className="w-full rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Create Now
          </button>
        </div>
      </form>
    </>
  );
}
