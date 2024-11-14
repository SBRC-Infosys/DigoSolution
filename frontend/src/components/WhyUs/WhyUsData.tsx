import { Feature } from "@/types/feature";
import imageOne from '../../../public/images/logo/AWSCloudServices.png'
import imageTwo from '../../../public/images/logo/cloudAdoptionStrategy.png'
import imageThree from '../../../public/images/logo/cloudConsulting.png'
import imageFour from '../../../public/images/logo/cloudImmigrationAssement.png'
import imageFive from '../../../public/images/logo/cloudNativeApp.png'
import imageSix from '../../../public/images/logo/cloudOptimization.png'
import Image from "next/image";

const WhyUsData: Feature[] = [
  {
    id: 1,
    icon: (
      <Image src={imageOne} className="rounded-md" width="180" height="180"  alt="Cloud Migration"/>
  
    ),
    title: "Colud Migration",
    paragraph:
      "Digo Solution’s Cloud Consulting offers expert guidance for efficient cloud migration, optimization, and management.",
  },
  {
    id: 2,
    icon: (
      <Image src={imageTwo} className="rounded-md" width="180" height="180"  alt="DevOps Automatioo"/>

     
    ),
    title: "DevOps Automation",
    paragraph:
      "Digo Solution’s Cloud Adoption Strategy ensures a smooth cloud transition with tailored migration, integration, and optimization plans.",
  },
  {
    id: 3,
    icon: (
      <Image src={imageThree} className="rounded-md" width="180" height="180"  alt="AWS"/>
     
    ),
    title: "Security And Compilance",
    paragraph:
      "Digo Solution’s Cloud Migration Assessment evaluates your infrastructure to ensure a seamless transition to the cloud.",
  },
  {
    id: 4,
    icon: (
      <Image src={imageFour} className="rounded-md" width="180" height="180"  alt="AWS"/>
    
    ),
    title: "Cloud Strategy and Consulting",
    paragraph:
      "Digo Solution’s Managed AWS Cloud Services offer comprehensive support, including monitoring, optimization, and security.",
  },
  {
    id: 5,
    icon: (
      <Image src={imageFive} className="rounded-md" width="180" height="180"  alt="AWS"/>
     
    ),
    title: "Managed Cloud Services",
    paragraph:
      "Digo Solution’s Cloud-Native App Development builds scalable, resilient applications optimized for cloud environments.",
  },
  {
    id: 6,
    icon: ( 
      <Image src={imageSix} className="rounded-md" width="180" height="180"  alt="AWS"/>
    ),
    title: "Cloud Management and Optimization",
    paragraph:
      "Digo Solution’s Cost Optimization service helps businesses reduce cloud expenses while maximizing efficiency and performance.",
  },
];
export default WhyUsData;
