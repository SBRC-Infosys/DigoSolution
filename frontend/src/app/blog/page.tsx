
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
       <BlogContent/>

        {/* Pagination */}
        <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
          <div className="w-full px-4">
            <ul className="flex items-center justify-center pt-8">
              <li className="mx-1">
                <a
                  href="#0"
                  className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                >
                  Prev
                </a>
              </li>
              {/* Page Numbers */}
              {[1, 2, 3].map((page) => (
                <li key={page} className="mx-1">
                  <a
                    href={`#${page}`}
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    {page}
                  </a>
                </li>
              ))}
              <li className="mx-1">
                <span className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color">
                  ...
                </span>
              </li>
              <li className="mx-1">
                <a
                  href="#12"
                  className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                >
                  12
                </a>
              </li>
              <li className="mx-1">
                <a
                  href="#0"
                  className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
