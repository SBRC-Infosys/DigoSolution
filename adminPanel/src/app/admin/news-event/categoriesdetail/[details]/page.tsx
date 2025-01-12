"use client";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TiptapEditor from "@/components/TipTap/TiptapEditor";

const NewsEditor = () => {
  return (
    <DefaultLayout>
      <TiptapEditor pageName="Add News & Event" endPoint="/news-events/add" endPointForCat="/newseventscategories" refetchKey="newsevents" />
    </DefaultLayout>
  );
};

export default NewsEditor;
