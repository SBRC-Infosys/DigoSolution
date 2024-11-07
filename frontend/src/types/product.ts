export type Product = {
  id: number;
  name: string;
  category: 'containerization' | 'infrastructure' | 'ci/cd' | 'monitoring' | 'cloud-platform' | 'database' | 'coding';
  price: number;
  image: string;
};
