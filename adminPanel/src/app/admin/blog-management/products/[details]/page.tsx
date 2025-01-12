"use client";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TiptapEditor from "@/components/TipTap/TiptapEditor";

const BlogsEditor = () => {
  return (
    <DefaultLayout>
      <TiptapEditor pageName="Add Blogs" endPoint="/blog/add" endPointForCat="/blogcategory" refetchKey="blogs" />
    </DefaultLayout>
  );
};

export default BlogsEditor;
