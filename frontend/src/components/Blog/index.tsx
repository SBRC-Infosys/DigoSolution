"use client";

import { Carousel } from "antd";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import { fetchBlogs } from "@/pages/api/blogs";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Blog = () => {
  const {
    data: blogData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs(),
  });

  if (isFetching) {
    return null;
  }

  if (error) {
    return <div>Error loading blogs data.</div>;
  }
  return (
    <section
      id="blog"
      className="bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Discover our latest blogs for fresh insights and updates on the latest trends and topics. Stay ahead with expert tips and in-depth articles crafted for your success."
          center
        />

        <div>
          <Carousel
            arrows
            infinite
            autoplay
            className="custom-carousel"
            dots={false}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1440,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {Array.isArray(blogData.data) && blogData.data.length > 0 ? (
              blogData.data.map((blog) => (
                <div key={blog.id} className="w-full p-8">
                  <SingleBlog blog={blog} />
                </div>
              ))
            ) : (
              <div className="">No blogs available</div>
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Blog;
