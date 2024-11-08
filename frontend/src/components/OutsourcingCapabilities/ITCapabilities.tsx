
import SectionTitle from "../Common/SectionTitle";


import ITCapabilitiesData from "./ITCapabilitiesData";
import ITCapabilitiesFeatures from "./ITCapabilitiesFeatures";


const ITCapabilities = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Our Capabilities"
          paragraph="
                At Diago, we understand the requirements of our clients well – as it
                varies from one another and from time to time – hence we offer a range
                of staff augmentation services that can be tailored to your needs.
                
             "
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {ITCapabilitiesData.map((feature) => (
            <ITCapabilitiesFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ITCapabilities;
