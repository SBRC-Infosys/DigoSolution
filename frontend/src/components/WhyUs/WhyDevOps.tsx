import SectionTitle from "../Common/SectionTitle";
import WhyDevOpsData from "./WhyDevOpsData";
import WhyUsFeatures from "./WhyUsFeatures";

const WhyDevOps = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="What You Get With Our DevOps Experts?"
          paragraph="Powered By experience on AWS products and solutions, Adex’s offering and services help enterprises across industries to optimize their cloud infrastructure.  "
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-4">
          {WhyDevOpsData.map((feature) => (
            <WhyUsFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDevOps;
