"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Underline,
      BulletList,
      OrderedList,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: content,
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border border-gray-700 text-gray-400 dark:text-white w-full gap-3 font-medium text-[16px] pt-4 rounded-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });
  
  return (
    <div className="prose dark:prose-dark max-w-none w-full mb-4 text-dark dark:text-white bg-white dark:border-form-strokedark dark:bg-form-input">
      <Toolbar editor={editor} />
      <EditorContent
        style={{ whiteSpace: "pre-line", width: "100%" }} // Ensures full width
        editor={editor}
      />
      {/* Custom CSS for formatted text, headings, blockquotes, and lists */}
      <style jsx global>{`
        .ProseMirror strong,
        .ProseMirror em,
        .ProseMirror u,
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror blockquote,
        .ProseMirror ul,
        .ProseMirror ol {
          color: inherit !important; /* Ensure text color remains consistent */
        }
  
        .dark .ProseMirror strong,
        .dark .ProseMirror em,
        .dark .ProseMirror u,
        .dark .ProseMirror h1,
        .dark .ProseMirror h2,
        .dark .ProseMirror h3,
        .dark .ProseMirror blockquote,
        .dark .ProseMirror ul,
        .dark .ProseMirror ol {
          color: white !important; /* Force white color in dark mode */
        }
  
        /* Optional: You can also customize blockquote styles */
        .ProseMirror blockquote {
          border-left: 4px solid #ccc; /* Custom styling for blockquotes */
          padding-left: 10px;
          margin-left: 0;
          color: inherit;
        }
        
        .dark .ProseMirror blockquote {
          border-left: 4px solid #555; /* Dark mode blockquote border */
        }
      `}</style>
    </div>
  );
};  

export default Tiptap;
