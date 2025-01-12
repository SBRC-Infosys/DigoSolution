"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";
import { GalleryType } from "@/types/gallery";
import { ClientTypes } from "@/types/ourClients";

interface BreadcrumbProps {
    item: ClientTypes;
    pageName: string;
    endPoint: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => void;
}


const EditModal = ({ item,
    pageName,
    endPoint,
    isModalOpen,
    setIsModalOpen,
    refetch, }: BreadcrumbProps) => {
  const [companyName,setcompanyName] = useState<string>(item.CompanyName);
  const [images, setImages] = useState<File[]>([]);
  const [localImages, setLocalImages] = useState<ImageType[]>([]);
  const [imgUrls, setImgUrls] = useState<string[]>([item.Logo]);

  const selectRef = useRef<{ clearSelection: () => void }>(null);
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
    if(!companyName){
        toast.info(`Please fill the mandatory fields.`);
        return;
      }
      if(images.length > 1){
        toast.warning(`Please select single image.`);
        return;
      }
      const formData = new FormData();
      formData.append("company_name", companyName);
      if (images.length > 0) {
        formData.append("Logo", images[0]);
      }
      try {
        const res = await axiosInstance.patch(`${endPoint}/${item.ClientID}`,formData , {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        });
        if(res.status === 200 || res.status === 201){
          toast.success(`${companyName} has been successfully updated.`);
          queryClient.invalidateQueries({queryKey: ['socialLink']});
          handleOk();
        }
      } catch (error) {
        console.log("Error while updating to social-links:",error)
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
        footer={
          <div className="modal-footer px-6">
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
        <form encType="multipart/form-data" className=" mx-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-5.5 p-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                value={companyName}
                onChange={(e)=>setcompanyName(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          {/* <div className="flex flex-col gap-5.5 p-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Platform Url
              </label>
              <input
                type="text"
                placeholder="Platform Url / Link"
                name="url"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div> */}
          <div className="p-4">
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
