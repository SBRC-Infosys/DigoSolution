"use client";
import React, { useRef, useState } from "react";
import { Button, DatePicker, Form } from "antd";
import Tiptap from "./Tiptap";
import Link from "next/link";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ProductCategory } from "../Tables/ProductCategory";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";
import { useRouter } from "next/navigation";

interface BreadcrumbProps {
  pageName: string;
}

const fetchProductCategory = async()=>{
  try {
    const response = await axiosInstance.get('/product/categories');
    return response.data.categories;
  } catch (error) {
    console.log('Error while fetching product categories:',error)
  }  
}

const ProductEditor = ({ pageName }: BreadcrumbProps) => {
  const {
    data:productCat,
    isLoading,
    error
  } = useQuery<ProductCategory[]>({
    queryKey: ['productcategories'],
    queryFn: fetchProductCategory
  });

  const [content, setContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState<string>("");
  const [regularPrice, setRegularPrice] = useState<string>("");
  const [salePrice, setSalePrice] = useState<string>("");
  const { RangePicker } = DatePicker;
  const [images, setImages] = useState<File[]>([]); // Updated to File array for types
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const toast = useToast();
  const router = useRouter();

  const [category, setCategory] = useState<string>("");

  const clearImageRef = useRef<() => void | null>(null);
  const selectCategoryRef = useRef<{ clearCategory: () => void } | null>(null);

  const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handelRegularPriceChange =(e:React.ChangeEvent<HTMLInputElement>) =>{
    setRegularPrice(e.target.value);
  }

  const handelSalePriceChnage = (e:React.ChangeEvent<HTMLInputElement>) =>
  {
    setSalePrice(e.target.value);
  }

  const handleClear = () => {
    setContent("");
    setSelectedDate("");
    setTitle("");
    setSalePrice("");
    setRegularPrice("");
    setImages([]);
    setLocalImages([]);

    if (clearImageRef.current) {
      clearImageRef.current();
    }

    if (selectCategoryRef.current) {
      selectCategoryRef.current.clearCategory();
    }
  };

  const selectRef = useRef<{ clearSelection: () => void }>(null);

  // const today = (current: number) => {
   
  //   return current && current < new Date().setHours(0, 0, 0, 0);
  // };

   // Define the options
   const categoryOptions = productCat?.map(ele=>(
    {
      value: ele.id, 
      label: ele.name,
    }
  )) || [];

  const handleAdd = async () => {
    if(!title || !content || !regularPrice || !category || images.length === 0){
      toast.info(`Please fill all the fields.`);
      return;
    }

    const formData = new FormData();

    formData.append("name", title);
    formData.append("description", content);
    formData.append("category_id", category); 
    formData.append("regular_price", regularPrice); 
    formData.append("sale_price", salePrice); 
    formData.append("image", images[0]);

    // Array.from(formData.entries()).forEach(([key,value])=>{
    //   if(value instanceof File){
    //     console.log(`${key}: ${value.name}, ${value.size} bytes`);
    //   }else{
    //     console.log(key, value);
    //   }
    // })

    try {
      const res = await axiosInstance.post(`/product/add`, formData , {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if(res.status === 200 || res.status === 201){
        toast.success(`Product ${title} has been successfully added.`);
        queryClient.invalidateQueries({queryKey: [`products`]});
        handleClear();
        router.back();
      }
    } catch (error) {
      toast.error('Something went wrong while adding product.Try Again!')
      console.log('Error while adding the product.')
    }
  }

  return (
    <Form>
      <label className="mb-3 block text-3xl font-semibold text-black dark:text-white">
        {pageName}
      </label>
      <div className="flex flex-col md:flex-row gap-4 pb-4 ">
        <div className="md:w-1/2 px-4 pt-4 shadow-md">
          <div className="mb-4.5">
            <label className="text-md mb-3  block font-semibold text-black dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter the product name"
              onChange={handleTitleChange}
              className="w-full rounded border-none px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
             <div className=" shadow-md mt-4  ">
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
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Description
            </label>
            <Tiptap
              content={content}
              onChange={(newContent: string) => setContent(newContent)}
            />
          </div>

         
        </div>
        <div className=" md:w-1/2 p-2">
        <h2 className="text-md mb-2 mt-4 font-bold text-dark dark:text-white">Pricing</h2>
          <div className="flex flex-col md:flex-row gap-4 px-4 py-2 shadow-md pb-4">
            <div className="md:w-1/2">
              <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
                Regular Price
              </label>
              <div className="flex flex-row rounded-md outline outline-2  outline-white dark:outline-strokedark ">
               <div className="bg-gray dark:bg-black px-5 py-3 text-dark dark:text-white">Rs</div>
                <input
                  type="number"
                  value={regularPrice}
                  placeholder="500"
                  onChange={handelRegularPriceChange}
                  className="w-full rounded border-none px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="flex md:w-1/2 flex-col justify-between ">
              <h2 className="text-md  mt-3 block font-semibold text-black dark:text-white">
                Sale Price
              </h2>
              <div className="flex flex-row rounded-md outline outline-2 outline-white dark:outline-strokedark">
               
              <div className="bg-gray dark:bg-black px-5 py-3 text-dark dark:text-white">Rs</div>
                <input
                  type="number"
                  value={salePrice}
                  placeholder="480"
                  onChange={handelSalePriceChnage}
                  className="w-full rounded border-none px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {/* <RangePicker disabled={today} className="ml-2 bg-gray  w-3/4" /> */}
              </div>
              
            </div>
            
          </div>
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

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center rounded border bg-white p-2 text-center font-medium text-black hover:bg-opacity-90 lg:px-6 xl:px-8"
        >
          Clear
        </button>
        <button
          onClick={handleAdd}
          className="inline-flex items-center justify-center rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 hover:text-white lg:px-6 xl:px-8"
        >
          Add Product
        </button>
      </div>
    </Form>
  );
};

export default ProductEditor;
