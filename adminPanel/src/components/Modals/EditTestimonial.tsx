"use client";

import { useState } from "react";
import { Button, Modal } from "antd";
import { useToast } from "../../../contexts/ToastProvider";
import axiosInstance from "../../../utils/axiosInstance";
import { CloseOutlined } from "@ant-design/icons";
import { ProductCategory } from "../Tables/ProductCategory";
import Tiptap from "../TipTap/Tiptap";
import { TestimonialsType } from "@/types/testimonials";

interface BreadcrumbProps {
  item: TestimonialsType;
  pageName: string;
  endPoint: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

interface formType {
  id: number | null;
  name: string;
  description?: string;
}

const EditModal = ({
  item,
  pageName,
  endPoint,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: BreadcrumbProps) => {
  const [author_name, setAuthor_name] = useState<string>(item.author_name);
  const [content, setContent] = useState<string>(item.content);
  const [designation, setDesignation] = useState<string>(item.designation);
  const toast = useToast();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    // console.log('endpoint:',endPoint);
    // console.log('formdata:',formData);

    try {
      const response = await axiosInstance.patch(
        `${endPoint}/${item.id}`,
        {
            author_name,
            designation,
            content
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      // console.log('API response:', response);
      toast.success(`${pageName} has been updated successfully!`);
      refetch();
    } catch (error) {
      console.error("API error:", error);
      toast.error(`${pageName} has not been updated. Try Again!`);
    } finally {
      setIsModalOpen(false);
      // setFormData(initialForm);
    }
  };

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
      color: window.document.body.classList.contains("dark")
        ? "#ffffff"
        : "#000000", // Dark mode text color
    },
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          <h2 className="text-dark text-xl dark:text-white">{pageName}</h2>
        }
        width={`35%`}
        footer={
            <div className="modal-footer px-3">
            <Button
              onClick={handleCancel}
              className="px-6 py-5 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600  px-6 py-5 text-white"
              type="primary"
              onClick={handleUpdate}
            >
              SAVE
            </Button>
          </div>
        }
      >
        <div className="mx-3 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-4 flex gap-4">
        <div className="w-full p-4 shadow-md">
          <div className="mb-4.5 ">
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Aurthor Name
            </label>
            <input
              type="text"
              value={author_name}
              placeholder="John Doe"
              onChange={(e)=>setAuthor_name(e.target.value)}
              className="w-full rounded  px-5 py-3 text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="text-md mb-3 mt-3 block font-semibold text-black transition  focus:border-primary active:border-primary dark:border-form-strokedark dark:text-white dark:focus:border-primary">
              Designation
            </label>
            <input
              type="text"
              value={designation}
              placeholder="Manager"
              onChange={(e)=>setDesignation(e.target.value)}
              className="w-full rounded  px-5 py-3 text-black  transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
    
      </div>
      <h1 className="mb-2 text-lg font-semibold">Description</h1>
      <Tiptap
        content={content}
        onChange={(newContent: string) => setContent(newContent)}
      />
         
        </div>
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
