'use client'

import AppoinmentBread from "@/components/Common/AppoinmentBread";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Technologies from "@/components/Common/Technologies";
import DeliveryModels from "@/components/OutsourcingCapabilities/DeliveryModels";
import HowItWorks from "@/components/OutsourcingCapabilities/HowItWorks";
import ITCapabilities from "@/components/OutsourcingCapabilities/ITCapabilities";
import Testimonials from "@/components/Testimonials";
import TrustedBy from "@/components/TrustedBy";
import React from "react";

const ItOutsourcing = () => {
  return (
    <>
      <Breadcrumb
        pageName="It Outsourcing"
        description="
                            
                            Finding remote tech team has never been easier. Whether you are looking for a developer, project
                            manager, or engineers - set up a team at a fraction of the time and resources.
                        
                        "
        animationIcons="https://lottie.host/20157507-17db-437f-9db5-a6c27416316c/tRnd5k4dcj.json"
      />
      <ITCapabilities/>
      <AppoinmentBread description="Low Cost, High Scale Development" appoinment=" Your Requirement"/>
      <HowItWorks/>
      <Technologies/>
      <TrustedBy/>
      <DeliveryModels/>
      <Testimonials/>
    </>
  );
};

export default ItOutsourcing;
