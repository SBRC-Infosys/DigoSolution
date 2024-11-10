import { BlogFilters } from '@/api/blogs';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

type BlogListFilterProps = {
  onChange: (filters: BlogFilters) => void;
};

export default function BlogListFilter({
  onChange,
}: BlogListFilterProps) {
  const [search, setSearch] = useState<BlogFilters['search']>();
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [ debouncedSearch]);

  return (
    <div className="flex flex-col gap-8   items-center">
      <h2 className='font-medium text-4xl'>Explore</h2>
      <input className='text-center p-4 rounded-full  w-1/2 mb-8  outline-none outline-blue-600 border-solid dark:border-white dark:border-solid dark:outline-white'
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Blogs"
      />
    </div>
  );
}
