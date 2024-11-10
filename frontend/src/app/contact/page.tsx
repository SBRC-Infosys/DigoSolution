import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Digo Solution",
  description: "Unleash The Power of Cloud",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Have questions or need assistance? We're here to help! Reach out to us and let's connect."
        animationIcons="https://lottie.host/aff8f44e-b253-44e0-b04a-354d05689664/zyF2rrvedk.json"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
