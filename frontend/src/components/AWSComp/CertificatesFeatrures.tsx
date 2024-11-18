import { ICONS } from "@/types/icon";


const CertificatesFeatures = ({ feature }: { feature: ICONS }) => {
  const { icon } = feature;
  return (
        <div className="mb-2 rounded-md ">
          {icon }
        </div>
  );
};

export default CertificatesFeatures;
