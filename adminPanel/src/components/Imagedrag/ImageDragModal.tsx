"use client";
import React, { useRef, useState } from "react";

interface ImageType {
  name: string;
  url: string;
}

const ImageDragModal = () => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const deleteImage = (index:number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };


//   clearImages(() => setImages([]));

  return (
    <div className="card w-full overflow-hidden rounded   ">
      <div >
        <p className="font-bold text-sky-600">Images</p>
      </div>
      <div
        className="drag-area mt-2 flex h-[150px] select-none items-center justify-center rounded border-2 border-dashed border-sky-600 bg-white text-sky-500"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className="ml-1 cursor-pointer text-sky-900 transition duration-300 hover:opacity-55">
            Drop images here
          </span>
        ) : (
          <>
            Drag & Drop image here or{" "}
            <span
              className="ml-1 cursor-pointer text-sky-900 transition duration-300 hover:opacity-55"
              role="button"
              onClick={selectFiles}
            >
              Browse
            </span>
          </>
        )}
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileSelect}
        />
      </div>
      <div className="container mt-2 flex h-auto max-h-[200px] w-full flex-wrap items-start justify-start overflow-y-auto">
        {images.map((images, index) => (
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
            <img
              className="z-[999] h-full w-full rounded"
              src={images.url}
              alt={images.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDragModal;
