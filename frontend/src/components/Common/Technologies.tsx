import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ProductFilters } from "@/api/products";
import ProductListFilters from "@/components/ProductList/ProductListFilters";
import ProductList from "@/components/ProductList/ProductList";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Technologies = () => {
    const [category, setCategory] = useState<ProductFilters["category"]>();
    const { data, isFetching } = useQuery({
      queryKey: ["products", { category }],
      queryFn: () => fetchProducts({ category }),
    });
  return (
    <div className="container flex flex-col gap-2 ">
        <div className="my-10 flex  flex-col gap-4 text-center">
          <h1 className="text-4xl font-bold ">Technologies We Use</h1>
          <p> Automate & Measure Your Delivery Process </p>
        </div>
        <ProductListFilters
          onChange={(filters) => {
            setCategory(filters.category);
          }}
        />
        <div>
          {isFetching ? (
            <Spin
              style={{
                fontSize: 48,
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
              }}
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 48, display: "flex" }}
                  spin
                />
              }
            />
          ) : (
            data && <ProductList products={data} />
          )}
        </div>
      </div>
  )
}

export default Technologies