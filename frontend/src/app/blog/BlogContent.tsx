"use client";
import React from "react";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import BlogList from "@/components/ProductList/BlogList";
import { BlogFilters, fetchBlogs } from "@/api/blogs";
import BlogListFilter from "@/components/ProductList/BlogListFilter";
import { Spin } from "antd";
import { useQuery } from "@tanstack/react-query";

const BlogContent = () => {
  const [search, setSearch] = useState<BlogFilters["search"]>();
  const { data, isFetching } = useQuery({
    queryKey: ["blogs", { search }],
    queryFn: () => fetchBlogs({ search }),
  });
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
        ) : (
          data && data.length > 0 ? (<BlogList blogs={data} />) : (<h1 className="font-extrabold text-4xl text-center my-8 text-red-500">😭No related Data found</h1>)
        )}
      </div>
    </div>
  );
};

export default BlogContent;
