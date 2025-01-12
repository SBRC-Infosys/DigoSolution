import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import TableThree from "@/components/Tables/TableThree";



import DefaultLayout from "@/components/Layouts/DefaultLayout";



const NewsCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="News & Events Category" endPoint="/newseventscategories/add" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
      
    </DefaultLayout>
  );
};

export default NewsCategory;
