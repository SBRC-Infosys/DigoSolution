import { Feature } from "@/types/feature";

const CapabilitiesFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full aniCard rounded-xl bg-slate-50 p-12 dark:bg-black flex flex-col items-center ">
        <div className="mb-4 h-[70px] w-[70px] rounded-md">
          {icon }
        </div>
        <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
          {title}
        </h3>
    </div>
  );
};

export default CapabilitiesFeatures;
