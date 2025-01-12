import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import TableTwo from '@/components/Tables/TableTwo';

const ProductDetails = () => {
  return (
    <div>
        <DefaultLayout>
    <Breadcrumbs2 pageName="Products" linkUrl="/admin/product-management/product-details/details"  />
    <div className="flex flex-col gap-10">
      <TableTwo/>
    </div>
  </DefaultLayout></div>
  )
}

export default ProductDetails