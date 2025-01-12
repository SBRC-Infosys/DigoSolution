
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableNine from "@/components/Tables/TableNine";
import BreadForm from "@/components/Breadcrumbs/BreadFrom";
const ContactForm = () => {
  return (
    <DefaultLayout>
      <BreadForm pageName="Contact Form" endPoint="/contact"/>
      <div className="flex flex-col gap-10">
        <TableNine/>
      </div>
    </DefaultLayout>
  );
};

export default ContactForm;