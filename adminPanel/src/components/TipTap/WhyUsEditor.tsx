"use client";
import React, { useRef, useState } from "react";
import { Button, Form } from "antd";
import Tiptap from "./Tiptap";
import { useToast } from "../../../contexts/ToastProvider";
import axiosInstance from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import queryClient from "../../../utils/reactQueryClient";

interface BreadcrumbProps {
  pageName: string;
}

const WhyUsEditor = ({ pageName }: BreadcrumbProps) => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClear = () => {
    setContent("");
    setTitle("");
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post(
        `/whychooseus/add`,
        { title: title, description: content },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        handleClear();
        router.back(); // Fixed: Add parentheses to call the function
        queryClient.invalidateQueries({ queryKey: ["chooseus"] });
        toast.success("Successfully added the why choose us item!");
      }
    } catch (error) {
      toast.error("Something went wrong while submitting the form!");
      console.error("Error while submitting the form why choose us:", error);
    }
  };

  return (
    <Form>
      <label className="mb-3 block text-3xl font-semibold text-black dark:text-white">
        {pageName}
      </label>
      <div className="mb-4 gap-4">
        <div className="mb-4.5">
          {/* Typo fixed: Removed the dot from className */}
          <label className="text-md mb-3 mt-3 block text-lg font-bold text-black dark:text-white">
            Title
          </label>
          <input
            type="text"
            value={title}
            placeholder="Why we are better"
            onChange={handleTitleChange}
            className="w-full rounded px-5 py-3 text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>
      <h1 className="mb-2 text-lg font-semibold text-dark dark:text-white">
        Description
      </h1>
      <Tiptap
        content={content}
        onChange={(newContent: string) => setContent(newContent)}
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex items-center justify-center rounded border bg-white p-2 text-center font-medium text-black hover:bg-opacity-90 lg:px-6 xl:px-8"
        >
          Clear
        </button>
        <Button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded bg-primary p-2 py-5 text-center font-medium text-white hover:bg-opacity-90 hover:text-white lg:px-6 xl:px-8"
        >
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default WhyUsEditor;
