import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faFile,faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

const DeliveryData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faPeopleRoof} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
    ),
    title: "Dedicated Team",
    paragraph:
      "Depending on the requirement, and time scale of your project, you can extend your in-house team, build specific expertise, or speed up development through our models. We've got you covered. ",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faFile} style={{color: "#09b6d4",height:'30px', width:'30px'}} />

     
    ),
    title: "Project-Based",
    paragraph:
      "Ideal for small to medium-sized projects as requirements, specifications, and schedules are established early on. The time & cost estimates are closely followed during the development process. ",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faChartSimple} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
     
    ),
    title: "On- Demand",
    paragraph:
      "Each completed work is compensated separately and is ideal for medium- and large-scale projects that need adaptability, agile execution, and continual development without a predetermined work scope.",
  },
];
export default DeliveryData;
