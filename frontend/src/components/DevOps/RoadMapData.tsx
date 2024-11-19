import { Roadmap } from "@/types/roadmap";

const RoadMapData: Roadmap[] = [
    {
        id:1,
        title:'Plan',
        icon: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/plan.png" width="40" height="40"  alt="AWS"/>
          ),
          arrow: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/arrow1.png" width="40" height="40"  alt="AWS"/>
          ),
          list: [
            "Analyze the current software development cycle, available IT resources, and your IT infrastructure",
            "Map business assumptions, and identify IT potential and limitations",
            "Create a plan for implementing DevOps",
          ],
    },
    {
        id:2,
        title:'Roadmap',
        icon: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/roadmap.png" width="40" height="40"  alt="AWS"/>
          ),
          arrow: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/arrow2.png" width="40" height="40"  alt="AWS"/>
          ),
          list: [
            "Design the containerization approach (based on Kubernetes or Apache Mesos)",
            "Design the CI/CD approach, and define and configure CI/CD tools (e.g., Jenkins, GoCD)",
            "Recommend and suggest on the test automation approach (usually based on Selenium and Appium) and integration of continuous testing into the CI/CD pipeline",
            "Design integration of IaaC and configuration management tools (Ansible, Chef, and Puppet) with CI/CD tools (GoCD, Jenkins, Bamboo)",
            "Design an automated monitoring solution (based on Zabbix or Nagios)",
            "Locate DevOps-specific challenges (e.g., the lack of necessary competencies, legacy applications difficult to containerize) and elaborate on their solutions"
          ],
    },
    {
        id:4,
        title:'Support',
        icon: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/support.png" width="40" height="40"  alt="AWS"/>
          ),
          arrow: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/arrow4.png" width="40" height="40"  alt="AWS"/>
          ),
          list: [
            "Mentor your DevOps practitioners to achieve the set DevOps implementation objectives.",
            "Maintain the operability of the software infrastructure, and ensure a proper load distribution within your IT environment.",
            
          ],
    },
    {
        id:3,
        title:'Execute',
        icon: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/execute.png" width="40" height="40"  alt="AWS"/>
          ),
          arrow: (
            <img src="https://ds0xrsm6llh5h.cloudfront.net/frontend/assets/icons/arrow3.png" width="40" height="40"  alt="AWS"/>
          ),
          list: [
            "Upskill your IT system administrators, project managers, program managers, delivery managers, developers, software test engineers, and other DevOps practitioners in the required DevOps tools and processes",
            "Introducing the IaaC approach.",
            "Assist in the deployment and configuration of CI/CD and test automation tools",
          ],
    },
    
]

export default RoadMapData;