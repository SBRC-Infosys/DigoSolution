
import AboutSectionOne from "@/components/About/AboutSectionOne";
import Blog from "@/components/Blog";
import Capabilities from "@/components/Capabilities/Capabilities";
import LeadingCompanies from "@/components/Capabilities/LeadingCompanies";
import AppoinmentBread from "@/components/Common/AppoinmentBread";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import WhyUs from "@/components/WhyUs/WhyUs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CloudServices | Digo Solution",
  description: "Unleash The Power of Cloud",
  // other metadata
};

const CloudServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Cloud Services"
        description="Our cloud services streamline operations, reduce costs, and boost scalability, giving your business the flexibility to grow. With expert support and tailored solutions, we help you innovate faster and stay ahead of the competition."
        animationIcons="https://lottie.host/d9a7b6c4-2831-4722-9114-626cfadada4c/LWcyZueMDJ.json"
      />

      <AboutSectionOne />
      <Capabilities />
      <LeadingCompanies />
      <WhyUs />
      <AppoinmentBread
        description="Experience Seamless Cloud Operations"
        appoinment="Book A Consulation"
        whatFor="Book A Consulation"
      />
      <Testimonials />
      <TrustedBy />
      <Blog />
    </>
  );
};

export default CloudServicesPage;
