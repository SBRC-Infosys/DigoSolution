"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SectionTitle from "../Common/SectionTitle";


const CloudManagement = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Cloud Cost Management - CloudEx "
          paragraph=""
          center
        />

        <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-col-reverse  lg:flex-row">
          <div className="flex flex-col gap-5 text-lg font-medium">
            <p className="mb-4 text-base !leading-relaxed text-body-color md:text-lg">Operate effectively with visibility and control over cloud costs or, Make your operation efficient with cloud cost management tool, Cloudex </p>
            <p className="mb-4 text-base !leading-relaxed text-body-color md:text-lg">Cloudex helps optimize your cloud costs through adopting best practices as you analyze, control and track your current cloud allocation and make spending decisions.
            </p>
            <p className="mb-4 text-base !leading-relaxed text-body-color md:text-lg">Save time, reduce effort, save up to 30% on your cloud spend. </p>
            <button className="rounded-full btn btn2 w-1/2 glow-box">Get Started</button>
          </div>
         
          <DotLottieReact src="https://lottie.host/5c56c7b8-4941-4b89-b3eb-2a70361eb68d/oH70XGREOz.json" loop autoplay />

          
        </div>
      </div>
    </section>
  );
};

export default CloudManagement;