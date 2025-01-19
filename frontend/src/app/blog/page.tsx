import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog Page | Digo Solution",
  description: "Unleash The Power of Cloude",
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="Blogs"
        description="Stay informed and inspired with our latest posts and expert perspectives."
        animationIcons="https://lottie.host/222c6c07-e5a1-4ebc-a491-eb77d2827db3/azlvLyJ7wX.json"
      />

      <section className="pb-[120px] pt-[120px]">
        <BlogContent />
      </section>
    </>
  );
};

export default Blog;
