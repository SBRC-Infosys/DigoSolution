
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import TableFour from "@/components/Tables/TableFour";
const Slider = () => {
  return (
    <DefaultLayout>
      <Breadcrumbs2 pageName="Slider Management" linkUrl="/admin/media-management/slider/details" />
      <div className="flex flex-col gap-10">
        <TableFour/>
      </div>
    </DefaultLayout>
  );
};

export default Slider;