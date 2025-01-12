import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableEight from '@/components/Tables/TableEight';
import BreadTeams from '@/components/Breadcrumbs/BreadTeams';

const OurTeams = () => {
  return (
    <div>
        <DefaultLayout>
    <BreadTeams pageName="Our Teams"/>
    <div className="flex flex-col gap-10">
      <TableEight/>
    </div>
  </DefaultLayout></div>
  )
}

export default OurTeams