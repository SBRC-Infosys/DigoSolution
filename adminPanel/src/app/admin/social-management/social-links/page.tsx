import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import TableSix from "@/components/Tables/TableSix";
import BreadSocial from "@/components/Breadcrumbs/BreadSocial";
const SocialLinks = () => {
  return (
    <DefaultLayout>
      <BreadSocial pageName="Social Links" />
      <div className="flex flex-col gap-10">
        <TableSix/>
      </div>
    </DefaultLayout>
  );
};

export default SocialLinks;