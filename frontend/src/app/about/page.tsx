import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionMissionVision from "@/components/About/AboutSectionMissionVision";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Testimonials from "@/components/Testimonials";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Digo Solution",
  description: "Unleash The Power of Cloud",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="Sure, here's a concise version:

---

At Digo Solutions, we provide comprehensive technical services and innovative cloud solutions to transform your business and boost productivity. Our expertise spans web hosting, system design, and global certification training, all aimed at delivering exceptional support to our customers.

---"
animationIcons="https://lottie.host/b82aaf29-68cd-4dac-be78-c7695be5464e/jmEk81QA8A.json"
      />
      <AboutSectionMissionVision />
      <AboutSectionOne />
      <Testimonials/>
    </>
  );
};

export default AboutPage;
