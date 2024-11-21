import { Feature } from "@/types/feature";

const ITCapabilitiesFeatures = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
      <div className=" w-full lg:w-1/3 flex md:w-2/3  ">
        <div className=" flex lg:justify-center ">
        <h3 className="border-l-8 text-cyan-600 dark:text-white border-solid dark:border-cyan-400 pl-4 text-3xl  font-extrabold">
          <span>
          {title}
          </span>
        </h3>
        </div>
      </div>
  );
};

export default ITCapabilitiesFeatures;
