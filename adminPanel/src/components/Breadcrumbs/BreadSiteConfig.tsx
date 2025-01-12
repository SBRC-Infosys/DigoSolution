"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "antd";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import { CloseOutlined } from "@ant-design/icons";
import axiosInstance from "../../../utils/axiosInstance";
import queryClient from "../../../utils/reactQueryClient";
import { useToast } from "../../../contexts/ToastProvider";

interface BreadcrumbProps {
  pageName: string;
}

const BreadSiteConfig = ({ pageName }: BreadcrumbProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [localImages, setLocalImages] = useState<ImageType[]>([]);

  const [companyName,setCompanyName] = useState<string>("");
  const [address,setAddress] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [phone,setPhone] = useState<string>("");

  const clearImageRef = useRef<() => void | null>(null);
  const toast = useToast();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClear = () => {
   setCompanyName("");
   setEmail("");
   setAddress("");
   setPhone("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAdd = async () => {
    if(!companyName || !email || !phone || !address || images.length === 0){
      toast.info("Please fill the mandatory fields.");
      return;
    }

    if(images.length > 1){
      toast.warning("Please select a single image.");
      return;
    }

    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    try {
      const res = await axiosInstance.post(`/company/add`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      });
      
      if (res.status === 200 || res.status === 201) {
        toast.success(`Company has been successfully added.`);
        queryClient.invalidateQueries({ queryKey: ['company'] });
        handleClear();
        handleCancel();
      }
    } catch (error) {
      toast.error('Failed to add in the company.Try Again!')
      console.log("Error while adding company details:", error);
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
        onCancel={handleCancel}
        closeIcon={
          <CloseOutlined
            className="text-dark dark:text-white"
            style={{ fontSize: "18px" }}
          />
        }
        styles={modalStyles}
        title={
          <h2 className="text-dark px-3 text-xl dark:text-white">{pageName}</h2>
        }
        className="w-[35%]"
        footer={
          <div className="modal-footer px-1">
            <Button
              onClick={handleCancel}
              className="px-6 py-5 dark:text-white"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 px-6 py-5 text-white"
              type="primary"
              onClick={handleAdd} // Adjust this to your actual function
            >
              SAVE
            </Button>
          </div>
        }
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col lg:flex-row gap-5.5 p-4 ">
            {/* First Column */}
            <div className="w-full lg:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Site Name
              </label>
              <input
                type="text"
                placeholder="XYZ Company Pvt Ltd"
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
                className="w-full mb-3 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                placeholder="Koteshwor, Kathmandu"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                className="w-full mb-3 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              
            </div>
             {/* Other Inputs */}
          <div className="">

          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone
              </label>
              <input
                type="text"
                placeholder="98********"
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className="w-full mb-3 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            {/* <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">
              Slug
            </label>
            <input
              type="text"
              placeholder="nice-day-for-fishing"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">
              Footer Message
            </label>
            <textarea
              placeholder="@UK-LINKNEPAL All right reserved"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            /> */}
          </div>

            
          </div>
            <div className="w-full">
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
      `}</style>
    </div>
  );
};

export default BreadSiteConfig;
