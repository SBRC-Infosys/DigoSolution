import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import TableFive from '@/components/Tables/TableFive';
import BreadMedia from '@/components/Breadcrumbs/BreadMedia';

const Gallery = () => {
  return (
    <div>
        <DefaultLayout>
    <BreadMedia pageName="Add To Gallery"/>
    <div className="flex flex-col gap-10">
      <TableFive/>
    </div>
  </DefaultLayout></div>
  )
}

export default Gallery