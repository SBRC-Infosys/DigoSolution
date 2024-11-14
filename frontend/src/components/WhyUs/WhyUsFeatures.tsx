import { Feature } from "@/types/feature";

const WhyUsFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full aniCard rounded-xl bg-slate-50 p-12 dark:bg-black flex flex-col items-center ">
        <div className="mb-10 h-[70px] w-[70px] rounded-md">
          {icon }
        </div>
        <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
          {title}
        </h3>
        <p className="pr-[10px] text-center text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
    </div>
  );
};

export default WhyUsFeatures;
