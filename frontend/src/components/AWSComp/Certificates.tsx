import SectionTitle from "../Common/SectionTitle";
import CertificateData from "./CertificatesData";
import CertificatesFeatures from "./CertificatesFeatrures";

const Certificates = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Accreditation and Certifications"
          paragraph=""
          center
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-14 md:grid-cols-6">
          {CertificateData.map((feature) => (
            <CertificatesFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
