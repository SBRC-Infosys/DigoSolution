"use client";
import React, { useRef, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import Tiptap from "../TipTap/Tiptap";
import axiosInstance from "../../../utils/axiosInstance";
import { useToast } from "../../../contexts/ToastProvider";
import { CloseOutlined } from "@ant-design/icons";

interface TypeWhyChooseUs {
  id: number | null;
  title: string;
  description: string;
}

interface BreadcrumbProps {
  item: TypeWhyChooseUs;
  pageName: string;
  endPoint: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

const EditModal = ({
  item,
  pageName,
  endPoint,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: BreadcrumbProps) => {
  const [formValues, setFormValues] = useState({
    id: item.id,
    title: item.title,
    description: item.description,
  });

  const clearImageRef = useRef<() => void>(null);
  const toast = useToast();

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Generic handler for form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleContentChange = (newContent: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      description: newContent,
    }));
  };

  const handleClear = () => {
    setFormValues({
      id: null,
      title: "",
      description: "",
    });

    if (clearImageRef.current) {
      clearImageRef.current();
    }
  };

  const handleUpdate = async () => {
    // console.log('endpoint:',endPoint);
    // console.log('formdata:',formValues);

    try {
      const response = await axiosInstance.patch(
        `${endPoint}/${item.id}`,
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // console.log('API response:', response);
        refetch();
        toast.success(`${pageName} has been updated successfully!`);
      }
    } catch (error) {
      console.error("API error:", error);
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
    <>
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
          width={700}
          footer={
            <div className="modal-footer">
              <Button onClick={handleCancel} className="dark:text-white">
                Cancel
              </Button>
              <Button
                className="bg-blue-600  text-white"
                type="primary"
                onClick={handleUpdate}
              >
                SAVE
              </Button>
            </div>
          }
        >
          <div className="rounded-sm border px-10 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Form>
              <div className="mb-4 gap-4">
                <div className="mb-4.5">
                  <label className="text-md mb-3 mt-3 block text-lg font-bold text-black dark:text-white">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={formValues.title}
                    placeholder="Why we are better"
                    onChange={handleChange}
                    className="w-full rounded px-5 py-3 transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-dark dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <h1 className="mb-2 text-lg font-semibold dark:text-white">Description</h1>
              <Tiptap
                content={formValues.description}
                onChange={handleContentChange}
              />

            </Form>
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
    </>
  );
};

export default EditModal;
