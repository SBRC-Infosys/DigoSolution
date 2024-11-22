'use client'
import Breadcrumb from "@/components/Common/Breadcrumb";
import React, { useState } from "react";
import Advantage from "@/components/DevOps/Advantage";
import RoadMap from "@/components/DevOps/RoadMap";
import WhyDevOps from "@/components/WhyUs/WhyDevOps";
import Transparency from "@/components/DevOps/Transparency";
import Model from "@/components/DevOps/Model";
import AppoinmentBread from "@/components/Common/AppoinmentBread";
import AutomaticNumbers from "@/components/AutomaticNumbers/AutomaticNumbers";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import Technologies from "@/components/Common/Technologies";

const DevOps = () => {
 
 
  return (
    <>
      <Breadcrumb
        pageName="DevOps"
        description="
                            Looking to embrace DevOps practices & services like agility, automation? Turn to Digo Solution to
                            successfully implement and manage DevOps practice - our experts can help you.
                        "
        animationIcons="https://lottie.host/42fb0ebe-20f3-4472-91fc-1daced1ead4c/ekdk4Wevyh.json"
      />
      <WhyDevOps/>
      <Transparency/>
      <RoadMap/>
      <Technologies/>
      <Model/>
      <AppoinmentBread  description="Start Your DevOps Journey With Us" appoinment="Shedule A Call"/>
      <Advantage/>
      <AutomaticNumbers/>
      <Testimonials/>
      <TrustedBy/>
      <Blog/>
      
    </>
  );
};

export default DevOps;
