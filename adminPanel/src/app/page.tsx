
import { Metadata } from "next";
import LayoutPage from "./(pages)/Layout/page";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title:
    "Digo Solution",
  description: "For All Your Needs Unleash The Power of Cloud",
};

export default function Home() {
  return (
    <>
        {/* <LayoutPage /> */}

        <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
     
    </>
  );
}
