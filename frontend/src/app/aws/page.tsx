import AutomaticNumbers from "@/components/AutomaticNumbers/AutomaticNumbers";
import AwsCapabilities from "@/components/Capabilities/AwsCapabilities";
import Certificates from "@/components/AWSComp/Certificates";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import CloudManagement from "@/components/AWSComp/CloudManagement";
import WhyAws from "@/components/WhyUs/WhyAws";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import Blog from "@/components/Blog";

const AWS = () => {
  return (
    <>
      <Breadcrumb
        pageName="AWS"
        description="AWS (Amazon Web Services) is a cloud computing platform that provides a wide range of services including computing, storage, database, analytics, and machine learning."
        animationIcons="https://lottie.host/449b8c66-d701-4541-8859-5f1823cdd268/P39VwcK6di.json"
      />
      <AwsCapabilities/>
      <AutomaticNumbers />
      <Certificates/>
      <CloudManagement/>
      <WhyAws/>
      <Testimonials />
      <TrustedBy />
      <Blog />
    </>
  );
};

export default AWS;
