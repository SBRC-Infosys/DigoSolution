import SectionTitle from "../Common/SectionTitle";
import WhyUsFeatures from "../WhyUs/WhyUsFeatures";
import ModelData from "./ModelData";;


const Model = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Engagement Models"
          paragraph="Decide which model best suits your project "
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {ModelData.map((feature) => (
            <WhyUsFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Model;
