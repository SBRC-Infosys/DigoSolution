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
      />

      <Contact />
    </>
  );
};

export default ContactPage;
