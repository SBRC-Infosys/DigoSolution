import blogData from '@/components/Blog/blogData';
import { products } from './data/products';

export type ProductFilters = {
  category?: 'containerization' | 'infrastructure' | 'ci/cd' | 'monitoring' | 'cloud-platform' | 'database' | 'coding';
  maxPrice?: number;
  search?: string;
};

export const fetchProducts = async (options?: ProductFilters) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let filteredProducts = products;
  let filteredBlogs = blogData;

  if (options?.category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === options.category;
    });
  }

  if (options?.maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price <= (options.maxPrice as number);
    });
  }

  if (options?.search) {
    filteredBlogs = filteredBlogs.filter((product) => {
      return product.title.toLowerCase().includes(options.search!.toLowerCase());
    });
  }

  return filteredProducts;
};
