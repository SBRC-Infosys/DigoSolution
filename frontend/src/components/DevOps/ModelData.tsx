import { Feature } from "@/types/feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faPeopleLine, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";

const ModelData: Feature[] = [
  {
    id: 1,
    icon: (
      <FontAwesomeIcon icon={faPeopleRoof} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
    ),
    title: "Dedicated Team",
    paragraph:
      "We remotely connect with our clients to build your business softwares and solutions.",
  },
  {
    id: 2,
    icon: (
      <FontAwesomeIcon icon={faPeopleGroup} style={{color: "#09b6d4",height:'30px', width:'30px'}} />

     
    ),
    title: "On Demand",
    paragraph:
      "We provide you hand -picker DevOps experts part-time as a solution according to your project needs.",
  },
  {
    id: 3,
    icon: (
      <FontAwesomeIcon icon={faPeopleLine} style={{color: "#09b6d4",height:'30px', width:'30px'}} />
     
    ),
    title: "Managed",
    paragraph:
      "wning entire DevOps, managing daily operations, Incident response, automations & ensuring systems are operational.",
  },
];
export default ModelData;
