"use client";
import { fetchUsers, UserFilters } from "@/pages/api/authors";
import { fetchBlogCategories } from "@/pages/api/blogs";
import { Blog } from "@/types/blog";
import { truncateText } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const { title, img_url, content, author_id, published_at, category_id } =
    blog;
  const [search, setSearch] = useState<UserFilters["search"]>(author_id);
  const { data: author, isFetching } = useQuery({
    queryKey: ["users", { search }],
    queryFn: () => fetchUsers({ search }),
  });

  const { data: category, isFetching: fetcingCat } = useQuery({
    queryKey: ["blogcategory", { search: category_id }],
    queryFn: () => fetchBlogCategories({ search: category_id }),
  });

  if (isFetching || fetcingCat) {
    return (
      <Spin
        style={{
          fontSize: 48,
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
        }}
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    );
  }

  return (
    <>
      <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={{
            pathname: "/blog-details",
            query: {
              title,
              img_url,
              content,
              author: author[0]?.username,
              authorRole: author[0]?.role,
              published_at,
              categoryName: category?.name,
              categoryDescription: category?.description,
            },
          }}
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
            {category?.name}
          </span>
          <Image src={img_url} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <h3>
            <Link
              href={{
                pathname: "/blog-details",
                query: {
                  title,
                  img_url,
                  content,
                  author: author[0]?.username,
                  authorRole: author[0]?.role,
                  published_at,
                  categoryName: category?.name,
                  categoryDescription: category?.description,
                },
              }}
              className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
            >
              {title}
            </Link>
          </h3>
          <p
            className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10"
            dangerouslySetInnerHTML={{ __html: truncateText(content, 20) }}
          ></p>
          <div className="flex items-center">
            {author && author.length > 0 && (
              <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                {/* <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={author[0]?.image} alt="author" fill />
                </div>
              </div> */}
                <div className="w-full">
                  <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                    By {author[0]?.username}
                  </h4>
                  <p className="text-xs text-body-color">{author[0]?.role}</p>
                </div>
              </div>
            )}
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {new Date(published_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
