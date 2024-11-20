import { Feature } from "@/types/feature";

const WhyUsFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full onHoverColor border hover:border-none dark:border-dark rounded-xl bg-slate-50  p-8 dark:bg-black flex flex-col  ">
        <div className="mb-2 h-[30px] w-[30px] rounded-md object-cover">
          {icon }
        </div>
        <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
          {title}
        </h3>
        <p className="pr-[10px] text-start text-base font-medium leading-relaxed text-body-color">
          {paragraph}
        </p>
    </div>
  );
};

export default WhyUsFeatures;
