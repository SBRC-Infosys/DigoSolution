"use client";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

// Define the type for image objects
export interface ImageType {
  name: string;
  url: string;
}

interface ImagedragProps {
  clearImages: () => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  localImages: ImageType[];
  setLocalImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  imgUrls?: string[];  // Image URLs from the server
}

const Imagedrag: React.FC<ImagedragProps> = ({ clearImages, images, setImages, localImages, setLocalImages, imgUrls }) => {

  // Handle dropped or selected files
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validImages: ImageType[] = acceptedFiles
      .filter((file) => file.type.split("/")[0] === "image")
      .map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    const validFiles = acceptedFiles.filter((file) => file.type.split("/")[0] === "image");

    // Update images for form handling
    setImages((prevImages) => [...prevImages, ...validFiles]);

    // Update local images for display
    setLocalImages((prevImages) => [...prevImages, ...validImages]);
  }, [setImages]);

  // Configure react-dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  // Function to delete an image
  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setLocalImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Clear images when `clearImages` is triggered
  useEffect(() => {
    clearImages();
    setImages([]);
    setLocalImages([]);
  }, [setImages]);

  return (
    <div className="card w-full overflow-hidden rounded p-4 shadow-md dark:border-form-strokedark dark:bg-form-input">
      <div>
        <p className="font-bold text-sky-600">Images</p>
      </div>

      {/* Dropzone area */}
      <div
        {...getRootProps({
          className:
            "drag-area mt-2 flex h-[150px] select-none items-center justify-center rounded border-2 border-dashed border-sky-600 bg-white dark:border-form-strokedark dark:bg-black text-sky-500",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <span className="ml-1 cursor-pointer text-sky-900 transition duration-300 hover:opacity-55">
            Drop images here
          </span>
        ) : (
          <>
            Drag & Drop images here or{" "}
            <span className="ml-1 cursor-pointer text-sky-900 transition duration-300 hover:opacity-55">
              Browse
            </span>
          </>
        )}
      </div>

      {/* Display uploaded or server-side images */}
      <div className="container mt-2 flex h-auto max-h-[200px] w-full flex-wrap items-start justify-start overflow-y-auto">
        {
          images.length > 0 ? (
            localImages.map((image, index) => (
              <div
                className="image relative mb-1 mr-1 h-[60px] w-[60px]"
                key={index}
              >
                <span
                  className="absolute right-[7px] top-[5px] flex h-[15px] w-[15px] pb-1 cursor-pointer items-center justify-center rounded bg-white text-[20px] text-[#fe0000]"
                  onClick={() => deleteImage(index)}
                >
                  &times;
                </span>
                <Image
                  className="z-[999] h-full w-full rounded"
                  src={image.url}
                  alt={image.name}
                  width={50}
                  height={50}
                  loading="lazy"
                  layout="intrinsic"
                />
              </div>
            ))
          ) : (
            imgUrls?.map((url, index) => (
              <div
                className="image relative mb-1 mr-1 h-[60px] w-[60px]"
                key={index}
              >
                
                <Image
                  className="z-[999] h-full w-full rounded"
                  src={url}
                  alt={`uploaded-image-${index}`}
                  width={50}
                  height={50}
                  loading="lazy"
                  layout="intrinsic"
                />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Imagedrag;
