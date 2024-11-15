import { Feature } from "@/types/feature";
import imageOne from '../../../public/images/logo/AWSCloudServices.png'
import imageTwo from '../../../public/images/logo/cloudAdoptionStrategy.png'
import imageThree from '../../../public/images/logo/cloudConsulting.png'
import imageFour from '../../../public/images/logo/cloudImmigrationAssement.png'
import imageFive from '../../../public/images/logo/cloudNativeApp.png'
import imageSix from '../../../public/images/logo/cloudOptimization.png'
import Image from "next/image";

const AwsCapaData: Feature[] = [
  {
    id: 1,
    icon: (
      <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/CloudManagement.svg" className="rounded-md" width="180" height="180"  alt="Cloud Migration"/>
  
    ),
    title: "Colud Consulting",
    paragraph:
      "Digo Solution’s Cloud Consulting offers expert guidance for efficient cloud migration, optimization, and management.",
  },
  {
    id: 2,
    icon: (
      <Image src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/CloudMigration.svg" className="rounded-md" width="180" height="180"  alt="DevOps Automatioo"/>

     
    ),
    title: "Cloud Migration Assessment",
    paragraph:
      "Digo Solution’s Cloud Adoption Strategy ensures a smooth cloud transition with tailored migration, integration, and optimization plans.",
  },
  {
    id: 3,
    icon: (
      <Image src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/CloudStrategy&Consulting.svg" className="rounded-md" width="180" height="180"  alt="AWS"/>
     
    ),
    title: "Cloud Adoption Strategy",
    paragraph:
      "Digo Solution’s Cloud Migration Assessment evaluates your infrastructure to ensure a seamless transition to the cloud.",
  },
  {
    id: 4,
    icon: (
      <Image src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/DevOpsAutomation.svg" className="rounded-md" width="180" height="180"  alt="AWS"/>
    
    ),
    title: "Cost Optimization",
    paragraph:
      "Digo Solution’s Managed AWS Cloud Services offer comprehensive support, including monitoring, optimization, and security.",
  },
  {
    id: 5,
    icon: (
      <Image src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/ManagedCloudServices.svg" className="rounded-md" width="180" height="180"  alt="AWS"/>
     
    ),
    title: "Managed AWS Cloud service",
    paragraph:
      "Digo Solution’s Cloud-Native App Development builds scalable, resilient applications optimized for cloud environments.",
  },
  {
    id: 6,
    icon: ( 
      <Image src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/Security&Compliance.svg" className="rounded-md" width="180" height="180"  alt="AWS"/>
    ),
    title: "Cloud - Native App Development",
    paragraph:
      "Digo Solution’s Cost Optimization service helps businesses reduce cloud expenses while maximizing efficiency and performance.",
  },
];
export default AwsCapaData;
