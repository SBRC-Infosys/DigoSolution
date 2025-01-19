"use client";
import { ContactFormData, submitContactForm } from "@/pages/api/contact";
import { FormEvent, useState } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    subject: "",
    message: "",
  });

  const success = () => toast("Successfully Recorded");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await submitContactForm(formData);
      success();
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to submit contact form");
    }
  };

  return (
    <div className="container py-12">
      <ToastContainer />

      <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        Need Help? Open a Ticket
      </h2>
      <p className="mb-12 text-base font-medium text-body-color">
        Our support team will get back to you ASAP via email.
      </p>
      <form onSubmit={handleSubmit}>
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
                value={formData.name}
                onChange={handleChange}
                type="text"
                name="name"
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
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="mb-8">
              <label
                htmlFor="phone"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Phone Number
              </label>
              <input
                value={formData.phone}
                onChange={handleChange}
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none [appearance:textfield] focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="mb-8">
              <label
                htmlFor="subject"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Subject
              </label>
              <input
                value={formData.subject}
                onChange={handleChange}
                type="text"
                name="subject"
                placeholder="Subject for the ticket"
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
                value={formData.message}
                onChange={handleChange}
                name="message"
                rows={5}
                placeholder="Enter your Message"
                className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
              ></textarea>
            </div>
          </div>
          <div className="w-full px-4">
            <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
              Submit Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
