"use client"
import React from "react";
import background from "../../../public/images/backgroundImg/bgTwo.jpg";
import {Modal } from "antd";

const AppoinmentBread = ({
  description,
  appoinment,
  whatFor,
}: {
  description: string;
  appoinment: string;
  whatFor: string;
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const showLoading = () => {
    setOpen(true);
  };

  return (
    <div
      style={{ backgroundImage: `url(${background.src})` }}
      className="relative h-40 w-full bg-cover bg-center "
    >
      <div className="flex h-full flex-wrap items-center justify-center  ">
        <div className="flex  items-center justify-center px-4 text-center md:w-8/12 md:py-10 lg:w-7/12">
          <h1 className="text-2xl font-bold text-white sm:text-3xl ">
            {description}
          </h1>
        </div>

        <div className="flex w-full justify-center px-4 md:w-4/12 lg:w-5/12">
          <button
            onClick={showLoading}
            className="glow-box hover:text-white-600 w-64 rounded-full border border-blue-600 bg-blue-600 px-8 py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-800"
          >
            {appoinment}
          </button>
          <Modal
           className=" dark:bg-gray-dark"
           data-wow-delay=".15s
           "
            footer={
              <div className="w-full px-4">
                <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                  {whatFor}
                </button>
              </div>
            }
            
            open={open}
            onCancel={() => setOpen(false)}
          >
            <div  className=" dark:bg-gray-dark">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                {whatFor} ? Open a Ticket
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
              </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentBread;
