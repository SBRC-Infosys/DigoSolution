import AutomaticNumbers from "@/components/AutomaticNumbers/AutomaticNumbers";
import Capabilities from "@/components/CloudServices/Capabilities";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SectionTitle from "@/components/Common/SectionTitle";
import featuresData from "@/components/Features/featuresData";
import SingleFeature from "@/components/Features/SingleFeature";
import React from "react";

const AWS = () => {
  return (
    <>
    <Breadcrumb
        pageName="AWS"
        description="AWS (Amazon Web Services) is a cloud computing platform that provides a wide range of services including computing, storage, database, analytics, and machine learning."
      />
      
   <Capabilities/>
    <AutomaticNumbers />
  </>
    
)};

export default AWS;
