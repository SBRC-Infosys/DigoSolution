import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompassDrafting, faMobileScreenButton, faLayerGroup, faInfinity } from "@fortawesome/free-solid-svg-icons";

const WhyDevOpsData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faCompassDrafting} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
    ),
    title: "Design & Architecting",
    paragraph:
      "Improve business agility through the integration of development, testing, and operations departments into cross-functional teams ",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faMobileScreenButton}   style={{color: "#09b6d4",height:'30px', width:'30px'}} />

     
    ),
    title: "Application Modernization",
    paragraph:
      "We re-platform applications by containerizing applications and services and modernizing databases to efficient serverless architectures ",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faLayerGroup} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
     
    ),
    title: "Project Recovery Consulting",
    paragraph:
      "Save your failing projects as our skilled experts will provide knowledgeable DevOps support that answers real problems ",
  },
  {
    id: 4,
    icon: (
      <FontAwesomeIcon icon={faInfinity} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
     
    ),
    title: "DevOps Consulting",
    paragraph:
      "Our team will help you choose, install and configure the right tools for an efficient DevOps environment",
  },
];
export default WhyDevOpsData;
