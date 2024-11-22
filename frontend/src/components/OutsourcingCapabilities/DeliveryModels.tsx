import SectionTitle from "../Common/SectionTitle";
import WhyUsFeatures from "../WhyUs/WhyUsFeatures";
import DeliveryData from "./DeliveryData";

const DeliveryModels = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Get Most Of The Robust Delivery Models"
          paragraph="Depending on the requirements, resources, and timescales of your projects, you may pick from our extensive options, which include short-term development and support as well as long-term development and support. "
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {DeliveryData.map((feature) => (
            <WhyUsFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryModels;
