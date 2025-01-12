"use client";
import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "antd"; // Import Modal from antd
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { NewsEventCategory } from "../Tables/TableThree";
import Spinner from "../Spinner";
import { useToast } from "../../../contexts/ToastProvider";
import DatePicker from "../FormElements/DatePicker/CustomDatePicker";
import { useRouter } from "next/navigation";
import queryClient from "../../../utils/reactQueryClient";
import Tiptap from "../TipTap/Tiptap";
import { CloseOutlined } from "@ant-design/icons";
import { BlogType } from "../Tables/Blogs";
import Image from "next/image";
import { BlogCategory } from "../Tables/BlogCategories";

interface BreadcrumbProps {
  item: BlogType;
  pageName: string;
  endPoint: string;
  endPointForCat: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const fetchNewsEventsCategory = async (endPointForCat: string) => {
  try {
    const res = await axiosInstance.get(endPointForCat);
    return res.data.data;
  } catch (error) {
    console.log("Error while fetching the news events category:", error);
  }
};

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
    data: newsEventsCat,
    isLoading,
    error,
  } = useQuery<NewsEventCategory[] | BlogCategory[]>({
    queryKey: [endPointForCat],
    queryFn: () => fetchNewsEventsCategory(endPointForCat),
  });

  const [content, setContent] = useState<string>(item.content);
  const [selectedDate, setSelectedDate] = useState<string>(item.published_at);
  const [title, setTitle] = useState<string>(item.title);
  const [category, setCategory] = useState<string>(item.category_id.toString()); // Added state for category
  const [images, setImages] = useState<File[]>([]); // Updated to File array for types
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const [imgUrls,setImgUrls] = useState<string[]>([item.img_url]);
  const toast = useToast();

  const clearImageRef = useRef<() => void | null>(null);
  const selectCategoryRef = useRef<{ clearCategory: () => void } | null>(null); // Ref for SelectGroupTwo


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Hide modal
  };

  // Define the options
  const categoryOptions =
    newsEventsCat?.map((ele) => ({
      value: ele.id,
      label: ele.name,
    })) || [];

  const handleDateChange = (date: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("title:",title);
    console.log("content:",content);
    console.log("category:",category);
    console.log("selectedDate:",selectedDate);

    if (
      !title ||
      !content ||
      !category ||
      !selectedDate 
    ) {
      toast.info("Please fill out all fields.");
      return;
    }

    let formattedDate;

    // If the date is in ISO format (like 2024-10-18T12:30:00.000Z), directly format it for MySQL (YYYY-MM-DD HH:MM:SS)
    if (!selectedDate.includes("/")) {
      const selectedDateTime = new Date(selectedDate);
      if (isNaN(selectedDateTime.getTime())) {
        toast.info("Please provide a valid date.");
        return;
      }
      // Format to MySQL datetime format (YYYY-MM-DD HH:MM:SS)
      formattedDate = selectedDateTime.toISOString().slice(0, 19).replace("T", " ");
    } else {
      // If the date is in DD/MM/YYYY format, first parse and then format
      const [day, month, year] = selectedDate.split("/").map(Number);
      const selectedDateTime = new Date(year, month - 1, day);
      if (isNaN(selectedDateTime.getTime())) {
        toast.info("Please provide a valid date.");
        return;
      }
      // Format to MySQL datetime format (YYYY-MM-DD HH:MM:SS)
      formattedDate = selectedDateTime.toISOString().slice(0, 19).replace("T", " ");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", category);
    formData.append("author_id", "2"); // Default author_id for testing
    formData.append("published_at", formattedDate);
    if(images.length > 0){
      formData.append("image", images[0]);
    }

    try {
      const response = await axiosInstance.patch(`${endPoint}/${item.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(`${pageName} has been updated successfully!`);
        handleClear(); // Clear form after submission
        refetch();
        handleCancel(); // Close modal on success
      } else {
        toast.error(`Something went wrong while updating the ${pageName}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again.",
      );
    }
  };

  const today = new Date().toISOString().split("T")[0];

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

  //   if (isLoading) return <Spinner />;
  //   if (error) return <p>Failed to load categories</p>;

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
          <h2 className="text-dark text-xl dark:text-white px-6">{pageName}</h2>
        }
        className="min-w-[50%]"
        footer={
          <div className="modal-footer">
            <Button onClick={handleCancel} className="dark:text-white">
              Cancel
            </Button>
            <Button
              className="bg-blue-600  text-white"
              type="primary"
              onClick={handleSubmit}
            >
              SAVE
            </Button>
          </div>
        } 
      >
        <Form className="px-6">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <div className="px-4 shadow-md md:w-1/2">
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
                  label="Category"
                  selectedOption={category}
                  onOptionChange={setCategory}
                  options={categoryOptions}
                />
              </div>

              <div className="flex overflow-hidden rounded p-2 md:w-1/2">
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

            <h1 className="text-dark mb-4 text-base font-bold dark:text-white">
              Description
            </h1>
            <Tiptap
              content={content}
              onChange={(newContent: string) => setContent(newContent)}
            />
          </div>
        </Form>
      </Modal>

      <style jsx>{`
        .modal-footer {
          display: flex;
          justify-content: center;
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
