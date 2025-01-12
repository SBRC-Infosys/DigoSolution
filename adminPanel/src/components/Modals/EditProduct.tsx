"use client";
import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "antd"; // Import Modal from antd
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../../../contexts/ToastProvider";
import DatePicker from "../FormElements/DatePicker/CustomDatePicker";
import { useRouter } from "next/navigation";
import queryClient from "../../../utils/reactQueryClient";
import Tiptap from "../TipTap/Tiptap";
import { CloseOutlined } from "@ant-design/icons";
import { ProductCategory } from "../Tables/ProductCategory";
import { Product } from "../Tables/TableTwo";

interface BreadcrumbProps {
  item: Product;
  pageName: string;
  endPoint: string;
  endPointForCat: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const fetchProductCategory = async()=>{
    try {
      const response = await axiosInstance.get('/product/categories');
      return response.data.categories;
    } catch (error) {
      console.log('Error while fetching product categories:',error)
    }  
  }

const EditModal = ({
  item,
  pageName,
  endPoint,
  endPointForCat,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: BreadcrumbProps) => {

  const {
    data:productCat,
    isLoading,
    error
  } = useQuery<ProductCategory[]>({
    queryKey: ['productcategories'],
    queryFn: fetchProductCategory
  });

  const [content, setContent] = useState<string>(item.description);
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState<string>(item.name);
  const [regularPrice, setRegularPrice] = useState<string>(item.regular_price.toString());
  const [salePrice, setSalePrice] = useState<string>(item.sale_price.toString());
//   const { RangePicker } = DatePicker;
  const [images, setImages] = useState<File[]>([]); // Updated to File array for types
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([item.img_url]);
  const toast = useToast();

  const [category, setCategory] = useState<string>(item.category_id.toString());

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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Hide modal
  };

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

  const handleUpdate = async () => {
    if(!title || !content || !regularPrice || !salePrice || !category){
      toast.info(`Please fill all the fields.`);
      return;
    }

    const formData = new FormData();

    formData.append("name", title);
    formData.append("description", content);
    formData.append("category_id", category); 
    formData.append("regular_price", regularPrice); 
    formData.append("sale_price", salePrice); 
    if(images.length > 0){
        formData.append("image", images[0]);
    }

    // Array.from(formData.entries()).forEach(([key,value])=>{
    //   if(value instanceof File){
    //     console.log(`${key}: ${value.name}, ${value.size} bytes`);
    //   }else{
    //     console.log(key, value);
    //   }
    // })

    try {
      const res = await axiosInstance.patch(`${endPoint}/${item.id}`, formData , {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if(res.status === 200 || res.status === 201){
        toast.success(`Product ${title} has been successfully updated.`);
        queryClient.invalidateQueries({queryKey: [`products`]});
        handleClear();
        handleOk();
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong while updating product.Try Again!')
      console.log('Error while updating the product.')
    }
  }

  // Determine modal styles based on dark mode
  const modalStyles = {
    content: {
      backgroundColor: window.document.body.classList.contains("dark")
        ? "#1A222C"
        : "#ffffff", // Dark mode background
      color: window.document.body.classList.contains("dark")
        ? "#ffffff"
        : "#000000", // Dark mode text color
    },
    header: {
      backgroundColor: window.document.body.classList.contains("dark")
        ? "#1A222C"
        : "#ffffff", // Dark mode background
    },
  };


  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Button to trigger modal */}
      {/* <button onClick={showModal} className="bg-blue-500 text-white p-2 rounded">Open Modal</button> */}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={
          <CloseOutlined
            className="text-dark dark:text-white"
            style={{ fontSize: "18px" }}
          />
        }
        styles={modalStyles}
        title={
          <h2 className="text-dark px-6 text-xl dark:text-white">{pageName}</h2>
        }
        className="min-w-[60%]"
        footer={
          <div className="modal-footer mr-6">
            <Button onClick={handleCancel} className="dark:text-white p-5">
              Cancel
            </Button>
            <Button
              className="bg-blue-600  text-white p-5"
              type="primary"
              onClick={handleUpdate}
            >
              SAVE
            </Button>
          </div>
        } // Custom footer, so no default buttons
      >
        <Form className="px-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-4 pb-4 md:flex-row ">
              <div className="px-4 pt-4 shadow-md md:w-1/2">
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
                  <div className=" mt-4 shadow-md  ">
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
              <div className=" p-2 md:w-1/2">
                <h2 className="text-md text-dark mb-2 mt-4 font-bold dark:text-white">
                  Pricing
                </h2>
                <div className="flex flex-col gap-4 px-4 py-2 pb-4 shadow-md md:flex-row">
                  <div className="md:w-1/2">
                    <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
                      Regular Price
                    </label>
                    <div className="flex flex-row rounded-md outline outline-2  outline-white dark:outline-strokedark ">
                      <div className="text-dark bg-gray px-3 py-3 dark:bg-black dark:text-white">
                        Rs
                      </div>
                      <input
                        type="number"
                        value={regularPrice}
                        placeholder="500"
                        onChange={handelRegularPriceChange}
                        className="w-full rounded border-none px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between md:w-1/2 ">
                    <h2 className="text-md  mt-3 block font-semibold text-black dark:text-white">
                      Sale Price
                    </h2>
                    <div className="flex flex-row rounded-md outline outline-2 outline-white dark:outline-strokedark">
                      <div className="text-dark bg-gray px-3 py-3 dark:bg-black dark:text-white">
                        Rs
                      </div>
                      <input
                        type="number"
                        value={salePrice}
                        placeholder="480"
                        onChange={handelSalePriceChnage}
                        className="w-full rounded border-none px-2 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                  imgUrls={imgUrls}
                />
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      <style jsx>{`
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 16px; 
        }
        .modal-footer .ant-btn {
          margin: 0; 
        }
        .ant-btn
      `}</style>
    </div>
  );
};

export default EditModal;
