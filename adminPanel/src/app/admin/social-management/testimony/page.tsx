import React from "react";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import TableSeven from "@/components/Tables/TableSeven";
import BreadTestimonial from "@/components/Breadcrumbs/BreadCumbTestimony";

const Testimony = () => {
  return (
    <div>
      <DefaultLayout>
        <BreadTestimonial pageName="Testimonials" />
        <div className="flex flex-col gap-10">
          <TableSeven />
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Testimony;
