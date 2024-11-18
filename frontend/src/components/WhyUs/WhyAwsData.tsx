import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot,faGears, faLock } from "@fortawesome/free-solid-svg-icons";

const WhyAwsData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faRobot} style={{color: "#09b6d4",}} />
    ),
    title: "Streamlined Processes With Automation",
    paragraph:
      "Streamline complicated and expensive infra management and focus on your core business",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faGears} pulse style={{color: "#09b6d4",}} />

     
    ),
    title: "Compliance",
    paragraph:
      "Adheres to all compliance control standards such as PCI-DSS, GDPR, HIPAA, and others. ",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faLock} style={{color: "#09b6d4",}} />
     
    ),
    title: "Compact and secure strategies",
    paragraph:
      "Reliable cloud security consulting to ensure maximum data security and best practices. ",
  },
];
export default WhyAwsData;
