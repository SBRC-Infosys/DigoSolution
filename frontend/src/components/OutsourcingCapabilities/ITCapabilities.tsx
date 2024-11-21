import SectionTitle from "../Common/SectionTitle";

import ITCapabilitiesData from "./ITCapabilitiesData";
import ITCapabilitiesFeatures from "./ITCapabilitiesFeatures";

const ITCapabilities = () => {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Scope Of IT Outsourcing Services"
          paragraph="
                At Adex, we understand the requirements of our clients well – as it varies from one another and from time to time – hence we offer a range of staff augmentation services that can be tailored to your needs. From an on-demand sole developer to a full scale end-to-end development team, you can build your teams & your MVPs with us. 
                
             "
          center
        />

        <div className=" flex flex-wrap gap-y-12 justify-center items-center ">
          {ITCapabilitiesData.map((feature) => (
            <ITCapabilitiesFeatures key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ITCapabilities;
