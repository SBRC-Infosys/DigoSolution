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
import { SLIDER } from "@/types/slider";

interface BreadcrumbProps {
  item: SLIDER;
  pageName: string;
  endPoint: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const EditModal = ({
  item,
  pageName,
  endPoint,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: BreadcrumbProps) => {

  const [content, setContent] = useState<string>(item.description);
  const [title, setTitle] = useState<string>(item.title);
  const [buttonName, setButtonName] = useState<string>(item.button_name);
  const [buttonUrl, setButtonUrl] = useState<string>(item.action_button_url);
//   const { RangePicker } = DatePicker;
  const [images, setImages] = useState<File[]>([]); // Updated to File array for types
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([item.img_url]);
  const toast = useToast();

  const clearImageRef = useRef<() => void | null>(null);
  const selectCategoryRef = useRef<{ clearCategory: () => void } | null>(null);

  const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleButtonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonName(e.target.value);
  };
  const handleButtonUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonUrl(e.target.value);
  }; 


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Hide modal
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

    if (selectCategoryRef.current) {
      selectCategoryRef.current.clearCategory();
    }
  };

  const selectRef = useRef<{ clearSelection: () => void }>(null);

  // const today = (current: number) => {
   
  //   return current && current < new Date().setHours(0, 0, 0, 0);
  // };


  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // debugger;

    if (
      !title ||
      !content ||
      !buttonName ||
      !buttonUrl
    ) {
      toast.info(`Please fill all the fields.`);
      return;
    }
    if(images.length > 1){
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
    if(images.length === 1){
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
        toast.success(`anner ${title} has been successfully updated.`);
        queryClient.invalidateQueries({queryKey: [`bannerImg`]});
        handleClear();
        handleOk();
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong while updating banner.Try Again!')
      console.log('Error while updating the banner.')
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
        <form method="post" encType="multipart/form-data" onSubmit={handleUpdate}>
     
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
            imgUrls={imgUrls}
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

      
    </form>
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
