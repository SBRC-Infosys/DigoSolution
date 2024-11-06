import AutomaticNumbers from "@/components/AutomaticNumbers/AutomaticNumbers";
import Capabilities from "@/components/CloudServices/Capabilities";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";

const AWS = () => {
  return (
    <>
    <Breadcrumb
        pageName="AWS"
        description="AWS (Amazon Web Services) is a cloud computing platform that provides a wide range of services including computing, storage, database, analytics, and machine learning."
animationIcons="https://lottie.host/449b8c66-d701-4541-8859-5f1823cdd268/P39VwcK6di.json"/>
      
   <Capabilities/>
    <AutomaticNumbers />
  </>
    
)};

export default AWS;
