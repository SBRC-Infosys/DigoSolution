"use client";

import { useRef, useState } from "react";
import { Button, Modal } from "antd";

import { CloseOutlined } from "@ant-design/icons";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import Imagedrag, { ImageType } from "../Imagedrag/Imagedrag";
import axiosInstance from "../../../utils/axiosInstance";
import { useToast } from "../../../contexts/ToastProvider";
import queryClient from "../../../utils/reactQueryClient";

interface GalleryType {
  title: string;
  url?: string;
}
interface BreadcrumbProps {
  pageName: string;
}

const typeOptions = [
  { label: "Image", value: "image" },
  { label: "Video", value: "video" },
];

const initialFormValues:GalleryType = {
  title: "",
}

const BreadMedia = ({ pageName }: BreadcrumbProps) => {
  const [formValues,setFormValues] = useState<GalleryType>(initialFormValues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState<string>("image");
  const [images, setImages] = useState<File[]>([]);
  const [localImages, setLocalImages] = useState<ImageType[]>([]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAdd = async () => {
    if(!formValues.title || (!formValues.url && images.length === 0)){
      toast.info(`Please fill the mandatory fields.`);
      return;
    }
    if(images.length > 1){
      toast.warning(`Please select single image.`);
      return;
    }

    const formData = new FormData();
    formData.append("title", formValues.title);
    if (type === "image" && images.length > 0) {
      formData.append("image", images[0]);
    } else if (type === "video") {
      formData.append("url", formValues.url || "");
    }

    try {
      const res = await axiosInstance.post(`/gallery/add`,formData , {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      });

      if(res.status === 200 || res.status === 201){
        toast.success(`Successfully added to the gallery.`);
        queryClient.invalidateQueries({queryKey: ['gallery']});
        handleOk();
      }
    } catch (error) {
      console.log("Error while adding to gallery:",error)
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
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formValues.title}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="p-4">
            <SelectGroupTwo
              ref={selectRef}
              label="Category"
              selectedOption={type}
              onOptionChange={setType}
              options={typeOptions}
            />
          </div>
          {
            type === "video" ? (
              <div className="flex flex-col gap-5.5 p-4">
              <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Video
              </label>
              <input
                type="text"
                name="url"
                placeholder="Video Link"
                value={formValues.url || ""}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            </div>
            ) : (
              <div className="p-5">
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
            )
          }
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
        .ant-btn;
      `}</style>
    </div>
  );
};

export default BreadMedia;
