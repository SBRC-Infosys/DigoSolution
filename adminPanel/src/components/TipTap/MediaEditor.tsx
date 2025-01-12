"use client";
import React, { useRef, useState } from "react";
import { Button, Form } from "antd";
import Tiptap from "./Tiptap";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageName: string;
}

const MediaEditor = ({ pageName }: BreadcrumbProps) => {
  const [content, setContent] = useState<string>("");
  // const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState<string>("");
  const [buttonName, setButtonName] = useState<string>("");
  const [buttonUrl, setButtonUrl] = useState<string>("");

  const [images, setImages] = useState<File[]>([]);
  const [localImages, setLocalImages] = useState<ImageType[]>([]);

  const clearImageRef = useRef<() => void | null>(null);
  const toast = useToast();
  const router = useRouter();

  // const handleDateChange = (e) => {
  //   setSelectedDate(e.target.value);
  // };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleButtonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonName(e.target.value);
  };
  const handleButtonUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonUrl(e.target.value);
  };
  const handleClear = () => {
    setContent("");
    setTitle("");
    setButtonName("");
    setButtonUrl("");
    setImages([]);
    setLocalImages([]);

    if (clearImageRef.current) {
      clearImageRef.current();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    // debugger;

    if (
      !title ||
      !content ||
      !buttonName ||
      !buttonUrl ||
      images.length === 0
    ) {
      toast.info(`Please fill all the fields.`);
      return;
    }else if(images.length > 1){
      toast.warning('Please select only one image');
      setImages([]);
      setLocalImages([]);
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", content);
    formData.append("action_button_url", buttonUrl);
    formData.append("button_name", buttonName);

    // Append each image file to formData
    // images.forEach((image) => {
      formData.append("image", images[0]);
    // });

    // Array.from(formData.entries()).forEach(([key, value]) => {
    //   if (value instanceof File) {
    //     console.log(`${key}: ${value.name}, ${value.size} bytes`);
    //   } else {
    //     console.log(key, value);
    //   }
    // });

    try {
      const res = await axiosInstance.post(`/banner/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200 || res.status === 201) {
        toast.success(`Slider has been successfully added.`);
        queryClient.invalidateQueries({ queryKey: [`bannerImg`] });
        handleClear();
        router.back();
      } else {
        toast.error("Failed to add the slider. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong while adding slider.Try Again!");
      console.log("Error while adding the slider.");
    }
  };

  return (
    <form method="post" encType="multipart/form-data" onSubmit={handleAdd}>
      <label className="mb-3 block text-3xl font-semibold text-black dark:text-white">
        {pageName}
      </label>
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="p-4 shadow-md md:w-1/2">
          {/* <div className="flex flex-col justify-between">
            <h2 className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Select a Date
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="date-input mb-2 p-4 font-semibold"
              min={today}
            />
          </div> */}

          <div className="mb-4.5 ">
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter the title"
              onChange={handleTitleChange}
              className="w-full rounded  px-5 py-3 text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="text-md mb-3 mt-3 block font-semibold text-black transition focus:border-primary  active:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary">
              Button Name
            </label>
            <input
              type="text"
              value={buttonName}
              placeholder="Enter the button name"
              onChange={handleButtonNameChange}
              className="w-full rounded  px-5 py-3 text-black  transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Button Url
            </label>
            <input
              type="text"
              value={buttonUrl}
              placeholder="Enter the action button url"
              onChange={handleButtonUrlChange}
              className="w-full rounded  px-5 py-3 text-black   transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="flex md:w-1/2">
          <Imagedrag
            clearImages={() => {
              if (clearImageRef.current) clearImageRef.current();
            }}
            images={images}
            setImages={setImages}
            localImages={localImages}
            setLocalImages={setLocalImages}
          />
        </div>
      </div>
      <h1 className="text-dark mb-2 text-lg font-semibold dark:text-white">
        Description
      </h1>
      <Tiptap
        content={content}
        onChange={(newContent: string) => setContent(newContent)}
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center rounded border bg-white p-2 text-center font-medium text-black hover:bg-opacity-90 lg:px-6 xl:px-8"
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-primary text-white hover:bg-opacity-90 hover:text-white lg:px-6 xl:px-8"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MediaEditor;
