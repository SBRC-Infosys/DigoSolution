"use client";

import { useState } from "react";
import { Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { contactForm } from "../Tables/TableNine";
import { useToast } from "../../../contexts/ToastProvider";
import axiosInstance from "../../../utils/axiosInstance";

interface BreadcrumbProps {
  item: contactForm;
  pageName: string;
  endPoint: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch : ()=> void;
}

const EditContactForm = ({ item, pageName, endPoint,isModalOpen, setIsModalOpen, refetch }: BreadcrumbProps) => {
  const [formValues,setFormValues] = useState<contactForm>(item);
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
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
}

  const handleAdd = async () => {
    // console.log('endpoint:',endPoint);
    // console.log('formdata:',formValues);
  
    try {
      const {created_at, updated_at, ...formValue} = formValues;
      const response = await axiosInstance.patch(`${endPoint}/${item.id}`, formValue , {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if(response.status === 200 || response.status === 201){
         // console.log('API response:', response);
         refetch();
         toast.success(`${pageName} has been updated successfully!`);
      }
    } catch (error) {
      console.error('API error:', error);
      toast.error(`${pageName} has not been updated. Try Again!`);
    } finally {
      setIsModalOpen(false);
      handleOk();
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
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
         <div className="flex flex-row gap-5.5 p-4 ">
            <div className="w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John doe"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-1/2">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mobile number
              </label>
              <input
                type="Number"
                placeholder="+977-9808412346"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
         </div>
          </div>
        
             <div className="px-4 pb-4">
             <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">
                Subject
              </label>
              <input
                type="text"
                placeholder="Something is wrong"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">
                Message
              </label>
              <textarea
               
                placeholder="Please fix this"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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

export default EditContactForm;
