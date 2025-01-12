
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableEleven from "@/components/Tables/TableEleven";
import BreadSiteConfig from "@/components/Breadcrumbs/BreadSiteConfig";
const SiteConfiguration = () => {
  return (
    <DefaultLayout>
      <BreadSiteConfig pageName="Site Configuration"/>
      <div className="flex flex-col gap-10">
        <TableEleven/>
      </div>
    </DefaultLayout>
  );
};

export default SiteConfiguration;