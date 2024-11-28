import { ProductFilters } from "@/api/products";
import { useEffect, useState } from "react";

type ProductListFiltersProps = {
  onChange: (filters: ProductFilters) => void;
};

export default function ProductListFilters({ onChange }: ProductListFiltersProps) {
  const [category, setCategory] = useState<ProductFilters["category"]>();

  const categories: { value: ProductFilters["category"]; label: string; icon: string | null }[] = [
    { value: undefined, label: "All", icon: null },
    { value: "containerization", label: "Containerization", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/containerization.svg" },
    { value: "infrastructure", label: "Infrastructure", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/infrastructure.svg" },
    { value: "ci/cd", label: "CI/CD", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/cicd.svg" },
    { value: "monitoring", label: "Monitoring", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/monitoring.svg" },
    { value: "cloud-platform", label: "Cloud Platform", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/cloudPlatform.svg" },
    { value: "database", label: "Database", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/database.svg" },
    { value: "coding", label: "Coding", icon: "https://ds0xrsm6llh5h.cloudfront.net/frontend/media/devops/image/coding.svg" },
  ];

  useEffect(() => {
    onChange({ category });
  }, [category, onChange]);

  return (
    <>
      <div className="sm:flex hidden flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value || "all"}
            onClick={() => setCategory(cat.value)}
            className={`px-6 py-4 ${
              category === cat.value
                ? "bg-blue-500 text-white"
                : "bg-teal-300 dark:bg-inherit dark:text-white"
            } flex w-full flex-row gap-3 rounded-md font-semibold dark:border-2 dark:border-white sm:w-auto`}
          >
            {cat.icon && (
              <img
                width={20}
                height={20}
                src={cat.icon}
                alt={cat.label.toLowerCase()}
              />
            )}
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-4 sm:hidden">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ProductFilters["category"] || undefined)}
          className="w-full font-bold text-base flex justify-center border rounded-md dark:bg-black p-4 dark:border-white dark:text-white"
        >
          {categories.map((cat) => (
            <option key={cat.value || "all"} value={cat.value || ""}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
