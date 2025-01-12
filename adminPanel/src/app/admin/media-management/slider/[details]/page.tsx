"use client";

import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MediaEditor from "@/components/TipTap/MediaEditor";

const MediaManagement = () => {
  return (
    <DefaultLayout>
      <MediaEditor pageName="Add Sliders" />
    </DefaultLayout>
  );
};

export default MediaManagement;
