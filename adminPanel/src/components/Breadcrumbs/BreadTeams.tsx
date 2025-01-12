"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "antd";
import Imagedrag from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { ImageType } from "../Imagedrag/Imagedrag";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";
import { CloseOutlined } from "@ant-design/icons";

interface BreadcrumbProps {
  pageName: string;
}

const BreadTeams = ({ pageName }: BreadcrumbProps) => {
  // State to manage form data
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [bio, setBio] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  
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
    if(!name || !email || !phone || !designation || !bio || images.length === 0){
      toast.info("Please fill the mandatory fields.");
      return;
    }

    if(images.length > 1){
      toast.warning("Please select a single image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    formData.append("bio", bio);
    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    try {
      const res = await axiosInstance.post(`/team/add`, formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      });
      
      if (res.status === 200 || res.status === 201) {
        toast.success(`${name} has been successfully added to the team.`);
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        handleOk();
      }
    } catch (error) {
      toast.error('Failed to add in the team.Try Again!')
      console.log("Error while adding to the team:", error);
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
        title={
          <h2 className="text-dark px-3 text-xl dark:text-white">{pageName}</h2>
        }
        footer={
          <div className="modal-footer px-1">
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
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-2 p-4">
            <label className="block text-sm font-medium text-black dark:text-white">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="text"
              placeholder="sample123@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="block text-sm font-medium text-black dark:text-white">
              Phone
            </label>
            <input
              type="text"
              placeholder="98********"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="block text-sm font-medium text-black dark:text-white">
              Designation
            </label>
            <input
              type="text"
              placeholder="Manager"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-5.5 px-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white">
                Bio
              </label>
              <textarea
                placeholder="Biography"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="px-4">
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
        .ant-btn
      `}</style>
    </div>
  );
};

export default BreadTeams;
