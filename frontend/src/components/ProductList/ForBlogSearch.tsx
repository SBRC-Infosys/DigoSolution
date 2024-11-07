import { ProductFilters } from '@/api/products';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

type ProductListFiltersProps = {
  onChange: (filters: ProductFilters) => void;
};

export default function ProductListFilters({
  onChange,
}: ProductListFiltersProps) {
  // const [search, setSearch] = useState<ProductFilters['search']>();
  // const debouncedSearch = useDebounce(search);

  const [category, setCategory] = useState<ProductFilters['category']>();
  // const [maxPrice, setMaxPrice] = useState<ProductFilters['maxPrice']>();

  useEffect(() => {
    onChange({ category, maxPrice, search: debouncedSearch });
  }, [category, debouncedSearch, maxPrice]);

  return (
    <div className="flex flex-row gap-2">
      {/* Category Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setCategory(undefined)}
          className={`px-4 py-2 ${!category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setCategory('first')}
          className={`px-4 py-2 ${category === 'first' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          First
        </button>
        <button
          onClick={() => setCategory('second')}
          className={`px-4 py-2 ${category === 'second' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Second
        </button>
        <button
          onClick={() => setCategory('third')}
          className={`px-4 py-2 ${category === 'third' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Third
        </button>
      </div>

      {/* Optional: Price Filter */}
      {/* <div className="flex gap-2">
        <button
          onClick={() => setMaxPrice(100)}
          className={`px-4 py-2 ${maxPrice === 100 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          $100
        </button>
        <button
          onClick={() => setMaxPrice(500)}
          className={`px-4 py-2 ${maxPrice === 500 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          $500
        </button>
        <button
          onClick={() => setMaxPrice(1000)}
          className={`px-4 py-2 ${maxPrice === 1000 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          $1000
        </button>
      </div> */}
    </div>
  );
}
