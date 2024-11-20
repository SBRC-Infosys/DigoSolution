import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding,faUserSecret,faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";

const WhyUsData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faBuilding} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
    ),
    title: "Streamline Business",
    paragraph:
      "Digo incorporates the cloud in its business operating platform solutions for mid-sized and larger enterprises as we streamline business processes, from manual activities to disaster recovery scenarios. ",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faUserSecret}  style={{color: "#09b6d4",height:'30px', width:'30px'}} />

     
    ),
    title: "Security & Compliance",
    paragraph:
      "Our technical specialists review your existing IT infrastructure to design appropriate IT strategies that are applicable to your organization ",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faHandHoldingHand} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
     
    ),
    title: "On- Demand Training",
    paragraph:
      "As an AWS Partner with skilled & certified AWS experts, we help our clients by delivering on-demand training and knowledge sharing to solve the unique challenges they face.",
  },
];
export default WhyUsData;
