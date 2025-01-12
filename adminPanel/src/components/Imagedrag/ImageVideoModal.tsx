"use client";
import React, { useRef, useState } from "react";

interface MediaType {
  name: string;
  url: string;
  type: "image" | "video";
}

const ImageVideoModal = () => {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileInputRef.current?.click();
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const fileType = files[i].type.split("/")[0];
      if (fileType !== "image" && fileType !== "video") continue;
      if (!media.some((e) => e.name === files[i].name)) {
        setMedia((prevMedia) => [
          ...prevMedia,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            type: fileType,
          },
        ]);
      }
    }
  };

  const deleteMedia = (index:number) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
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
      const fileType = files[i].type.split("/")[0];
      if (fileType !== "image" && fileType !== "video") continue;
      if (!media.some((e) => e.name === files[i].name)) {
        setMedia((prevMedia) => [
          ...prevMedia,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            type: fileType,
          },
        ]);
      }
    }
  };

  return (
    <div className="card w-full overflow-hidden rounded">
      <div>
        <p className="font-bold text-sky-600">Images & Videos</p>
      </div>
      <div
        className="drag-area mt-2 flex h-[150px] select-none items-center justify-center rounded border-2 border-dashed border-sky-600 bg-white text-sky-500"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <span className="ml-1 cursor-pointer text-sky-900 transition duration-300 hover:opacity-55">
            Drop files here
          </span>
        ) : (
          <>
            Drag & Drop image or video here or{" "}
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
          accept="image/*, video/*" 
        />
      </div>
      <div className="container mt-2 flex h-auto max-h-[200px] w-full flex-wrap items-start justify-start overflow-y-auto">
        {media.map((file, index) => (
          <div
            className="media-item relative mb-1 mr-1 h-[60px] w-[60px]"
            key={index}
          >
            <span
              className="absolute right-[7px] top-[5px] flex h-[15px] w-[15px] pb-1 cursor-pointer items-center justify-center rounded bg-white text-[20px] text-[#fe0000]"
              onClick={() => deleteMedia(index)}
            >
              &times;
            </span>
            {file.type === "image" ? (
              <img
                className="z-[999] h-full w-full rounded"
                src={file.url}
                alt={file.name}
              />
            ) : (
              <video
                className="z-[999] h-full w-full rounded"
                src={file.url}
                aria-label={file.name}
                controls
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageVideoModal;
