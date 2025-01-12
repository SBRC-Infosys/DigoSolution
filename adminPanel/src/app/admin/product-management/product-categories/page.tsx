import React from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductCategory from '@/components/Tables/ProductCategory';
import ProductCategoryBreadcrumb from '@/components/Breadcrumbs/ProductCategoryBreadcrumb';

const ProductCategories = () => {
  return (
    <div>
        <DefaultLayout>
      <ProductCategoryBreadcrumb pageName="Products Category" endPoint="/product/add-category" />
      <div className="flex flex-col gap-10">
        <ProductCategory />
      </div>
      
    </DefaultLayout>
    
    </div>
  )
}

export default ProductCategories