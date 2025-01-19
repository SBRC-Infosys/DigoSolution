"use client";
import React from "react";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import BlogList from "@/components/ProductList/BlogList";
import { BlogFilters, fetchBlogs } from "@/pages/api/blogs";
import BlogListFilter from "@/components/ProductList/BlogListFilter";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Common/Pagination";

const BlogContent = () => {
  const [search, setSearch] = useState<BlogFilters["search"]>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [id, setId] = useState<BlogFilters["id"]>(); //for conditional id passing

  const { data: blogData, isFetching } = useQuery({
    queryKey: ["blogs", { page, limit, search, id }],
    queryFn: () =>
      fetchBlogs({
        page,
        limit,
        search,
        id,
      }),
  });

  const { data, totalPages, totalBlogs } = blogData || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <BlogListFilter onChange={(filters) => setSearch(filters.search)} />

      <div>
        {isFetching ? (
          <Spin
            style={{
              fontSize: 48,
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        ) : data && data.length > 0 ? (
          <>
            <BlogList blogs={data} />
            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <h1 className="my-8 text-center text-4xl font-extrabold text-red-500">
            😭No related Data found
          </h1>
        )}
      </div>
    </div>
  );
};

export default BlogContent;
