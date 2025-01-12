import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductEditor from '@/components/TipTap/ProductEditor';

const ProductAdd = () => {
  return (
    <div> 
    <DefaultLayout>
    <ProductEditor pageName="Add Product" />
  </DefaultLayout></div>
  )
}

export default ProductAdd