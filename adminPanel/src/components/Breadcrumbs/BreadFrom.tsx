"use client";

import { useState } from "react";
import { Button, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useToast } from "../../../contexts/ToastProvider";
import axiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../utils/reactQueryClient";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  subject: string;
}

interface BreadcrumbProps {
  pageName: string;
  endPoint: string;
}

const initialValues: ContactForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
  subject: "",
};

const BreadFrom = ({ pageName, endPoint }: BreadcrumbProps) => {
  const [formValues, setFormValues] = useState<ContactForm>(initialValues);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show and hide modal handlers
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function for adding contact data via POST request
  const addFunc = async () => {
    const response = await axiosInstance.post(endPoint, formValues, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  // Mutation using useMutation hook to handle the POST request
  const mutation = useMutation({
    mutationFn: addFunc, // mutation function should be provided as a property
    onSuccess: (response: { status: number }) => {
      if (response.status === 200 || response.status === 201) {
        toast.success(`${pageName} has been created successfully!`);
        
        // Invalidate the 'contacts' query to refetch updated data
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
      }
    },
    onError: () => {
      toast.error(`${pageName} has not been created. Try Again!`);
    },
    onSettled: () => {
      setIsModalOpen(false);
      
    },
  });
  

  // Submit handler for the form
  const handleAdd = () => {
    mutation.mutate(); // Trigger the mutation to add new data
  };

  // Dynamic styles for modal based on dark/light mode
  const modalStyles = {
    content: {
      backgroundColor: document.body.classList.contains('dark') ? '#1A222C' : '#ffffff',
      color: document.body.classList.contains('dark') ? '#ffffff' : '#000000',
    },
    header: {
      backgroundColor: document.body.classList.contains('dark') ? '#1A222C' : '#ffffff',
    },
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <Button className="bg-blue-600 px-8 py-5 font-semibold" type="primary" onClick={showModal}>
        ADD
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={<CloseOutlined className="text-dark dark:text-white" style={{ fontSize: "18px" }} />}
        styles={modalStyles}
        title={<h2 className="text-dark dark:text-white text-xl">{pageName}</h2>}
        footer={
          <div className="modal-footer">
            <Button onClick={handleCancel} className="dark:text-white">Cancel</Button>
            <Button className="bg-blue-600 text-white" type="primary" onClick={handleAdd}>
              SAVE
            </Button>
          </div>
        }
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-row gap-5.5 p-4">
            <div className="w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mobile number
              </label>
              <input
                type="number"
                placeholder="+977-9808412346"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="px-4 pb-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">Subject</label>
            <input
              type="text"
              placeholder="Something is wrong"
              name="subject"
              value={formValues.subject}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <label className="mb-3 mt-4 block text-sm font-medium text-black dark:text-white">Message</label>
            <textarea
              placeholder="Please fix this"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
      `}</style>
    </div>
  );
};

export default BreadFrom;
function handleOk() {
  throw new Error("Function not implemented.");
}

