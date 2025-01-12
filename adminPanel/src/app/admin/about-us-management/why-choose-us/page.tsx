import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTen from "@/components/Tables/TableTen";

const NewsCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumbs2 pageName="Why Choose Us" linkUrl="/admin/about-us-management/why-choose-us/details" />
      <div className="flex flex-col gap-10">
        <TableTen/>
      </div>
    </DefaultLayout>
  );
};

export default NewsCategory;
