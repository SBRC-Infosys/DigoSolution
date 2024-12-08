import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AutomaticNumbers from "@/components/AutomaticNumbers/AutomaticNumbers";
import Blog from "@/components/Blog";

import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";

import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import TrustedBy from "@/components/TrustedBy";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";

export const metadata: Metadata = {
  title: "Digo Solution",
  description: "Unleash The Power of Cloud",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Video />
      <AutomaticNumbers />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <TrustedBy />
      <Blog />
      <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
              <div
                className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                data-wow-delay=".15s
              "
              >
                <Contact />
              </div>
            </div>
            <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
              <NewsLatterBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
