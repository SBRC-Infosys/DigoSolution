"use client";

import { useState } from "react";
import { Button, Modal } from "antd";
import { useToast } from "../../../contexts/ToastProvider";
import axiosInstance from "../../../utils/axiosInstance";
import { CloseOutlined } from "@ant-design/icons";
import { ProductCategory } from "../Tables/ProductCategory";

interface BreadcrumbProps {
  category: ProductCategory;
  pageName: string;
  endPoint: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch : ()=> void;
}

interface formType {
    id: number | null,
    name: string,
    description? : string
}


const EditModal = ({category, pageName,endPoint,isModalOpen, setIsModalOpen, refetch }: BreadcrumbProps) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const {id,name,...remained} = category;
  const [formData,setFormData] = useState<formType>(remained.description ? {id,name,description:remained?.description}: {id,name} );
  const toast = useToast();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name,value} = e.target;
      // console.log(name,":",value)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  }

  const handleAdd = async () => {
    // console.log('endpoint:',endPoint);
    // console.log('formdata:',formData);
  
    try {
      const response = await axiosInstance.patch(`${endPoint}/${category.id}`, formData , {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log('API response:', response);
      toast.success(`${pageName} has been updated successfully!`);
      refetch();
    } catch (error) {
      console.error('API error:', error);
      toast.error(`${pageName} has not been updated. Try Again!`);
    } finally {
      setIsModalOpen(false);
      // setFormData(initialForm);
    }
  };
  

    // Determine modal styles based on dark mode
    const modalStyles = {
      content: {
        backgroundColor: window.document.body.classList.contains('dark') ? '#1A222C' : '#ffffff', // Dark mode background
        color: window.document.body.classList.contains('dark') ? '#ffffff' : '#000000', // Dark mode text color
      },
      header:{
        backgroundColor: window.document.body.classList.contains('dark') ? '#1A222C' : '#ffffff', // Dark mode background
        color: window.document.body.classList.contains('dark') ? '#ffffff' : '#000000', // Dark mode text color
      }
    };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined className="text-dark dark:text-white" style={{fontSize: "18px" }} />}
        styles={modalStyles}
        title={<h2 className="text-dark dark:text-white text-xl">{pageName}</h2>}
        footer={
          <div className="modal-footer">
            <Button onClick={handleCancel} className="dark:text-white">Cancel</Button>
            <Button
              className="bg-blue-600  text-white"
              type="primary"
              onClick={handleAdd}
            >
              SAVE
            </Button>
          </div>
        }
      >
        <div className="rounded-sm  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark relative">
          
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* {pageName!=="Category" && <SelectGroupTwo />} */}
           {
            formData.description && (
              <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={6}
                placeholder="Description"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
            )
           }
          </div>
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
