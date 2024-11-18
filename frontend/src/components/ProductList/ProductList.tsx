import { Product } from '@/types/product';

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex flex-row flex-wrap gap-1 justify-center text-center items-center mt-8 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex w-[120px] h-[120px] flex-col gap-4 rounded-md bg-grayscale-700 p-4 "
        >
          <img src={product.image} alt={product.name} className="rounded-md  " />
        </div>
      ))}
    </div>
  );
}
