import { ProductFilters } from "@/api/products";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProductListFiltersProps = {
  onChange: (filters: ProductFilters) => void;
};

export default function ProductListFilters({
  onChange,
}: ProductListFiltersProps) {
  const [category, setCategory] = useState<ProductFilters["category"]>();

  useEffect(() => {
    onChange({ category });
  }, [category]);

  return (
  
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setCategory(undefined)}
          className={`px-6 py-4 ${!category ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2  rounded-md font-semibold w-full sm:w-auto`}
        >
          
          All
        </button>
        <button
          onClick={() => setCategory("containerization")}
          className={`px-6 py-4 ${category === "containerization" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md  font-semibold w-full sm:w-auto `}
        >
          <Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/containerization.svg"
            alt="containerization"
            
          />
          Containerization
        </button>
        <button
          onClick={() => setCategory("infrastructure")}
          className={`px-6 py-4 ${category === "infrastructure" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold w-full sm:w-auto` }
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/infrastructure.svg"
            alt="infrastructure"
            
          />
          Infrastructure
        </button>
        <button
          onClick={() => setCategory("ci/cd")}
          className={`px-6 py-4 ${category === "ci/cd" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold  w-full sm:w-auto`}
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/cicd.svg"
            alt="cicd"
            
          />
          CI/CD
        </button>
        <button
          onClick={() => setCategory("monitoring")}
          className={`px-6 py-4 ${category == "monitoring" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold  w-full sm:w-auto`}
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/monitoring.svg"
            alt="monitoring"
            
          />
          Monitoring
        </button>
        <button
          onClick={() => setCategory("cloud-platform")}
          className={`px-6 py-4 ${category === "cloud-platform" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold w-full sm:w-auto `}
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/cloudPlatform.svg"
            alt="cloudplatform"
            
          />
          Cloud Platform
        </button>
        <button
          onClick={() => setCategory("database")}
          className={`px-6 py-4 ${category === "database" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold w-full sm:w-auto `}
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/database.svg"
            alt="database"
            
          />
          Database
        </button>
        <button
          onClick={() => setCategory("coding")}
          className={`px-6 py-4 ${category === "coding" ? "bg-blue-500 text-white" : "bg-teal-300 dark:bg-inherit dark:text-white"} dark:border-white dark:border-2 flex flex-row gap-3   rounded-md font-semibold w-full sm:w-auto `}
        ><Image width={20} height={20}
            src="https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/coding.svg"
            alt="coding"
            
          />
          Coding
        </button>
      </div>
   
  );
}
