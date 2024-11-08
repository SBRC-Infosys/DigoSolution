import Breadcrumb from "@/components/Common/Breadcrumb";
import ITCapabilities from "@/components/OutsourcingCapabilities/ITCapabilities";
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
    </>
  );
};

export default ItOutsourcing;
