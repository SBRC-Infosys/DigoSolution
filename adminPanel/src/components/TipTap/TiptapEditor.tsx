"use client";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "antd";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import Tiptap from "./Tiptap";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { NewsEventCategory } from "../Tables/TableThree";
import Spinner from "../Spinner";
import { useToast } from "../../../contexts/ToastProvider";
import DatePicker from "../FormElements/DatePicker/CustomDatePicker";
import { useRouter } from "next/navigation";
import queryClient from "../../../utils/reactQueryClient";
import { getCookie } from "cookies-next";

interface BreadcrumbProps {
  pageName: string;
  endPoint: string;
  endPointForCat: string;
  refetchKey: string;
}

const fetchNewsEventsCategory = async(endPointForCat:string)=>{
  try {
    const res = await axiosInstance.get(endPointForCat);
    return res.data.data;
  } catch (error) {
    console.log('Error while fetching the news events category:',error)
  }
}

const TiptapEditor = ({ pageName, endPoint,endPointForCat, refetchKey }: BreadcrumbProps) => {
  const {
    data:newsEventsCat,
    isLoading,
    error
  } = useQuery<NewsEventCategory[]>({
    queryKey: ['newseventscat'],
    queryFn: ()=>fetchNewsEventsCategory(endPointForCat)
  });

  const [content, setContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>(""); 
  const [authorId, setAuthorId] = useState<string>("");
  const [images, setImages] = useState<File[]>([]); // Updated to File array for types
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const toast = useToast();
  const router = useRouter();

  const clearImageRef = useRef<() => void | null>(null);
  const selectCategoryRef = useRef<{ clearCategory: () => void } | null>(null); // Ref for SelectGroupTwo

  // Define the options
  const categoryOptions = newsEventsCat?.map(ele=>(
    {
      value: ele.id, 
      label: ele.name,
    }
  )) || [];

  const selectRef = useRef<{ clearSelection: () => void }>(null);

  // Fetch user id from cookies on component mount
  useEffect(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      const user = JSON.parse(userCookie as string);
      setAuthorId(user.id);
    }
  }, []);

  // Handlers
  const handleDateChange = (date:string) => {
    setSelectedDate(date);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClear = () => {
    setContent("");
    setSelectedDate("");
    setTitle("");

    if (clearImageRef.current) {
      clearImageRef.current();
    }

    if (selectCategoryRef.current) {
      selectCategoryRef.current.clearCategory();
    }
  };

  const resetForm = () => {
    // Reset the form fields
    setContent("");       // Clear TipTap content
    setTitle("");         // Clear title
    setCategory("");      // Clear category selection
    setSelectedDate("");  // Clear date selection
    setImages([]);        // Clear images array
    setLocalImages([]);
  
    // Clear images from the image drag component
    if (clearImageRef.current) {
      clearImageRef.current();
    }
  
    // Clear category selection
    if (selectCategoryRef.current) {
      selectCategoryRef.current.clearCategory();
    }
  };
  
  // console.log('image:',images[0])

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (
      !title ||
      !content ||
      !category ||
      !selectedDate ||
      images.length === 0
    ) {
      toast.info("Please fill out all fields.");
      return;
    }

     // Format the selected date
     const [day, month, year] = selectedDate.split('/').map(Number);
     const selectedDateTime = new Date(year, month - 1, day);
     if (isNaN(selectedDateTime.getTime())) {
         toast.info("Please provide a valid date.");
         return;
     }
     const formattedDate = selectedDateTime.toISOString().slice(0, 19).replace('T', ' ');

    //  console.log("formatted date:",formattedDate)

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category); 
    //assigning default author_id for the moment for checking until project is completed
    formData.append("author_id",authorId);
    formData.append("published_at", formattedDate);

    // Append each image file to formData
    // images.forEach((image) => {
      // formData.append("image", images[0]);
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
      const response = await axiosInstance.post(endPoint, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      if (response.status === 200 || response.status === 201) {
        toast.success(`${pageName} has been added successfully!`);
        resetForm();
        queryClient.invalidateQueries({queryKey: [refetchKey]})
        router.back();
      } else {
        toast.error(`Something went wrong while adding the ${pageName}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('An error occurred while submitting the form. Please try again.');
    }
    
    
    
  };

  // console.log('images:',images)

  const today = new Date().toISOString().split("T")[0];

  if (isLoading) {
    return <Spinner />;
  }
  
  if (error) {
    return <p>Failed to load categories</p>;
  }

  // console.log("selecteddate:",selectedDate)

  return (
    <Form>
      <label className="mb-3 block text-3xl font-semibold text-black dark:text-white">
        {pageName}
      </label>

      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className=" md:w-1/2 px-4 shadow-md">

        <div className="mb-4.5">
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter the title ..."
              onChange={handleTitleChange}
              className="w-full rounded px-5 py-3 text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <DatePicker
            selectedDate={selectedDate}
            onChange={handleDateChange}
            min={today}
          />

          <SelectGroupTwo
            ref={selectRef}
            label="Category"
            selectedOption={category}
            onOptionChange={setCategory}
            options={categoryOptions}
            className="custom-classname"
            selectClassName="custom-select-class"
          />        

        </div>

        <div className="flex md:w-1/2 overflow-hidden rounded p-2">
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

      <h1 className="mb-4 text-base font-bold text-dark dark:text-white">Description</h1>
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
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 hover:text-white lg:px-6 xl:px-8"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

export default TiptapEditor;
