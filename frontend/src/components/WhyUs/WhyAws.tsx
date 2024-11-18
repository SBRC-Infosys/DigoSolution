import SectionTitle from "../Common/SectionTitle";
import WhyAwsData from "./WhyAwsData";
import WhyUsFeatures from "./WhyUsFeatures";

const WhyAws = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Achieve Your Business Goals With Digo & AWS"
          paragraph="Digo is an AWS Consulting Partner and has been a pioneer in Amazon Web Service deployments. Our team of AWS experts has deep experience helping companies leverage Amazon Web Services.  "
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {WhyAwsData.map((feature) => (
            <WhyUsFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAws;
