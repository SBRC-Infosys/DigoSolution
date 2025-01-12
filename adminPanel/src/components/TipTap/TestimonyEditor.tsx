"use client";
import React, { useRef, useState } from "react";
import { Form } from "antd";
import Tiptap from "./Tiptap";
import Link from "next/link";
import Imagedrag from "../Imagedrag/Imagedrag";

interface BreadcrumbProps {
  pageName: string;
}

const TestimonyEditor = ({ pageName }: BreadcrumbProps) => {
  const [content, setContent] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState<string>("");
  const [buttonName, setButtonName] = useState<string>("");
  const [buttonUrl, setButtonUrl] = useState<string>("");

  const clearImageRef = useRef<() => void | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleButtonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonName(e.target.value);
  };
  const handleButtonUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonUrl(e.target.value);
  };
  const handleClear = () => {
    setContent("");
    ``;
    setTitle("");
    setButtonName("");
    setButtonUrl("");

    if (clearImageRef.current) {
      clearImageRef.current();
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Form>
      <label className="mb-3 block text-3xl font-semibold text-black dark:text-white">
        {pageName}
      </label>
      <div className="mb-4 flex gap-4">
        <div className="left w-1/2 p-4 shadow-md">
          <div className="mb-4.5 ">
            <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">
              Aurthor Name
            </label>
            <input
              type="text"
              value={title}
              placeholder="John Doe"
              onChange={handleTitleChange}
              className="w-full rounded  px-5 py-3 text-black transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="text-md mb-3 mt-3 block font-semibold text-black transition  focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:text-white dark:focus:border-primary">
              Designation
            </label>
            <input
              type="text"
              value={buttonName}
              placeholder="Manager"
              onChange={handleButtonNameChange}
              className="w-full rounded  px-5 py-3 text-black  transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        {/* <div className="w-1/2 flex">
          <Imagedrag
            clearImages={(clearFn) => (clearImageRef.current = clearFn)}
          />
        </div> */}
      </div>
      <h1 className="mb-2 text-lg font-semibold">Description</h1>
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
        <Link
          href="#"
          className="inline-flex items-center justify-center rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 hover:text-white lg:px-6 xl:px-8"
        >
          Submit
        </Link>
      </div>
    </Form>
  );
};

export default TestimonyEditor;
