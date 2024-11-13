import { Feature } from "@/types/feature";

const CapabilitiesFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full aniCard rounded-xl bg-slate-50 p-8 dark:bg-black dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon }
        </div>
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CapabilitiesFeatures;
