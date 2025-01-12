import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableOurClients from "@/components/Tables/TableOurClients";
import BreadOurClients from "@/components/Breadcrumbs/BreadOurClients";
const OurClients = () => {
  return (
    <DefaultLayout>
      <BreadOurClients pageName="Our Clients" />
      <div className="flex flex-col gap-10">
        <TableOurClients/>
      </div>
    </DefaultLayout>
  );
};

export default OurClients;