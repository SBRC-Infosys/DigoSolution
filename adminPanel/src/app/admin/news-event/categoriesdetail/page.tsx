
import TableOne from "@/components/Tables/TableOne";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";


const NewsDetails = () => {
  return (
    <DefaultLayout>
      <Breadcrumbs2 pageName="News & Events" linkUrl="/admin/news-event/categoriesdetail/details"  />
      <div className="flex flex-col gap-10">
        <TableOne/>
      </div>
      
    </DefaultLayout>
  );
};

export default NewsDetails;
