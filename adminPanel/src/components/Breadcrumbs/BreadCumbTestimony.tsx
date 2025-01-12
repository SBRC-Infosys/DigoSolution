"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";
import axiosInstance from "../../../utils/axiosInstance";
import Tiptap from "../TipTap/Tiptap";

interface BreadcrumbProps {
  pageName: string;
}
// platform_name, content

const BreadTestimonial = ({ pageName }: BreadcrumbProps) => {
  const [author_name,setAuthor_name] = useState<string>("");
  const [content,setContent] = useState<string>("");
  const [designation,setDesignation] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearImageRef = useRef<() => void | null>(null);
  const toast = useToast();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAdd = async () => {
    if(!author_name||  !content || !designation){
      toast.info(`Please fill the mandatory fields.`);
      return;
    }
    
   
    try {
      const res = await axiosInstance.post(`/testimonials/add`, {
        author_name: author_name,
        designation:designation,
        content: content
      } , {
        headers: {
          'Content-Type': "application/json"
        }
      });
      if(res.status === 200 || res.status === 201){
        toast.success(`${author_name} testimonial has been successfully added.`);
        queryClient.invalidateQueries({queryKey: ['tetstimonials']});
        handleOk();
      }
    } catch (error) {
      console.log("Error while adding to social-links:",error)
    }
  };

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
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <Button
        className="bg-blue-600 px-8 py-5 font-semibold"
        type="primary"
        onClick={showModal}
      >
        ADD
      </Button>
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
        width={`35%`}
        title={
          <h2 className="text-dark px-3 text-xl dark:text-white">{pageName}</h2>
        }
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
              onClick={handleAdd}
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

export default BreadTestimonial;
