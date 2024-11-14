import React from "react";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";

const LeadingCompanies = () => {
  return (
    <section id="features" className="pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <SectionTitle
          title="Leading Cloud Solution Partner"
          paragraph="Adoption of cloud can help you to reduce operational expenses, unlock new possibilities, and realize your strategic IT objectives faster. "
          center
        />

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-1 md:grid-cols-2 ">
          <div className="aniCard w-full rounded-xl bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
            <div className="wow fadeInUp" data-wow-delay=".15s">
              <div className="mb-10 flex   items-center justify-start ">
                <img
                  className="h-[80px] w-[110px] rounded-md bg-black dark:bg-inherit"
                  src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/cloud_service/image/amazon.png "
                  alt=""
                />
                <div className="mx-4 h-[100px] border-l-2 border-gray-300 dark:border-gray-600"></div>
                <h3 className=" text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Amazon Web Service
                </h3>
              </div>

              <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                A comprehensive cloud solution that offers more than 175
                fully-featured services. Our AWS experts can help you build
                solutions on AWS which will enable you to lower your cost,
                innovate faster.
              </p>
            </div>
          </div>
          <div className="aniCard w-full rounded-xl bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
            <div className="wow fadeInUp" data-wow-delay=".15s">
              <div className="mb-10 flex items-center justify-start ">
                <img
                  className="h-[80px] w-[120px] object-contain rounded-md "
                  src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/cloud_service/image/azure.png  "
                  alt=""
                />
                <div className="mx-4 h-[100px] border-l-2 border-gray-300 dark:border-gray-600"></div>
                <h3 className=" text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Microsoft Azure
                </h3>
              </div>

              <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                Microsoft Azure provides access to over 200 services and the
                choice to use the technologies you want and have already
                invested in. As a cloud partner, we have the expertise to
                provide solutions to your business needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadingCompanies;
