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

export const metadata: Metadata = {
  title: "Digo Solution",
  description: "Unleash The Power of Cloud",
  
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AutomaticNumbers/>
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials/>
      <TrustedBy />
      <Blog />
      <Contact />
    </>
  );
}
