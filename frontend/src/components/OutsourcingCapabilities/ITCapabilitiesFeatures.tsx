import { Feature } from "@/types/feature";

const ITCapabilitiesFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="flex justify-center rounded-md ">
          {icon }
        </div>
        <h3 className="mb-5 mt-2 text-center text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-center text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default ITCapabilitiesFeatures;
