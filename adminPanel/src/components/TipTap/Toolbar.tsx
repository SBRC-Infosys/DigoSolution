import React from "react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { type Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className=" px-4 py-3 rounded-t-md flex justify-between items-start gap-5 w-full flex-wrap 
      border border-gray-700 flex-shrink-0"
      style={{ minHeight: "64px" }} // Fixed height or min-height for the toolbar
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* Bold Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-1 rounded-lg w-8 h-8 flex justify-center items-center ${
            editor.isActive("bold") ? "bg-sky-700 text-white" : "text-sky-400"
          }`}
        >
          <Bold className="w-5 h-5" />
        </button>

        {/* Italic Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-1 rounded-lg w-8 h-8 flex justify-center items-center ${
            editor.isActive("italic") ? "bg-sky-700 text-white" : "text-sky-400"
          }`}
        >
          <Italic className="w-5 h-5" />
        </button>

        {/* Underline Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`p-1 rounded-lg w-8 h-8 flex justify-center items-center ${
            editor.isActive("underline")
              ? "bg-sky-700 text-white"
              : "text-sky-400"
          }`}
        >
          <Underline className="w-5 h-5" />
        </button>

        {/* Strikethrough Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`p-1 rounded-lg w-8 h-8 flex justify-center items-center ${
            editor.isActive("strike") ? "bg-sky-700 text-white" : "text-sky-400"
          }`}
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        {/* Heading Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>

        {/* Bullet List Button */}
         <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <List className="w-5 h-5" />
        </button>

        {/* Ordered List Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        {/* Blockquote Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Quote className="w-5 h-5" />
        </button>

        {/* Undo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>

        {/* Redo Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
        
      </div>
    </div>
  );
};

export default Toolbar;
