import { BlogFilters } from "@/pages/api/blogs";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

type BlogListFilterProps = {
  onChange: (filters: BlogFilters) => void;
};

export default function BlogListFilter({ onChange }: BlogListFilterProps) {
  const [search, setSearch] = useState<BlogFilters["search"]>();
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col items-center   gap-8">
      <h2 className="text-4xl font-medium">Explore</h2>
      <input
        className="mb-8 w-1/2 rounded-full  border-solid p-4  text-center outline-none outline-blue-600 dark:border-solid dark:border-white dark:outline-white"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Blogs"
      />
    </div>
  );
}
