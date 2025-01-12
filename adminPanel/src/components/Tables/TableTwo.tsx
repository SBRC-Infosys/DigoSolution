"use client";
import Image from "next/image";
import { Pagination } from "antd";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from "../../../utils/axiosInstance";
import Spinner from "../Spinner";
import { useState } from "react";
import { useToast } from "../../../contexts/ToastProvider";
import EditModal from "../Modals/EditProduct";

interface ProductCat {
  id: number,
  name: string
};

export interface Product{
  id: number;
  category_id: number;
  name: string;
  description: string;
  regular_price: number;
  sale_price: number;
  img_url: string;
}

export const fetchProducts = async () => {
  const response = await axiosInstance.get('/product'); 
  return response.data.products;
};

const fetchProductCategory = async () => {
  const response = await axiosInstance.get('/product/categories'); 
  return response.data.categories;
};


const TableTwo = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8; 

    const toast = useToast();

    const {data: productData,isLoading,error,refetch} = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts
    });

    const {data: productCategory,isLoading:categoryLoading,error: categoryErr} = useQuery<ProductCat[]>({
        queryKey: ['productCategory'],
        queryFn: fetchProductCategory
    });

    const [item, setItem] = useState<Product>();
    const [openModal, setOpenModal] = useState<boolean>(false);

   // Change page function
   const onPageChange = (page: number) => {
        setCurrentPage(page);
   };

   // Slice the data for pagination
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const paginatedProducts = productData?.slice(startIndex, endIndex);

   const handleModalBox = (Item: Product) => {
    setItem(Item);
    setOpenModal(true);
  };

   const handleDelete = async (id: number) => {
    console.log('delete clicked')
    try {
      const response = await axiosInstance.delete(`/product/${id}`);
      if (response.status === 200 || response.status === 201) {
        toast.success("Item deleted successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Problem while deleting item. Try Again!");
      console.error("Error while deleting product item:", error);
    }
  };


   if(isLoading || categoryLoading) return <Spinner />

   return (
     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
       
       {/* Table Header */}
       <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
         <div className="col-span-3 flex items-center">
           <p className="font-medium">Product Name</p>
         </div>
         <div className="col-span-2 hidden items-center sm:flex">
           <p className="font-medium">Category</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className="font-medium">Regular Price</p>
         </div>
         <div className="col-span-1 flex items-center">
           <p className="font-medium">Sale Price</p>
         </div>
         <div className="col-span-1 flex items-center pl-4">
           <p className="font-medium">Action</p>
         </div>
       </div>

       {/* Table Rows */}
       {paginatedProducts?.map((product, key) => (
         <div
           className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
           key={key}
         >
           <div className="col-span-3 flex items-center">
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
               <div className="h-12.5 w-15 rounded-md">
                 <Image
                   src={product.img_url}
                   width={60}
                   height={50}
                   alt="Product"
                 />
               </div>
               <p className="text-sm text-black dark:text-white">
                 {product.name}
               </p>
             </div>
           </div>
           <div className="col-span-2 hidden items-center sm:flex">
             <p className="text-sm text-black dark:text-white">
               {productCategory?.find(ele=>ele.id === product.category_id)?.name}
             </p>
           </div>
           <div className="col-span-1 flex items-center">
             <p className="text-sm text-black dark:text-white">
               Rs {product.regular_price}
             </p>
           </div>
           <div className="col-span-1 flex items-center">
             <p className="text-sm text-black dark:text-white">
               Rs {product.sale_price ?? `---`}
             </p>
           </div>
           <div className="col-span-1 flex items-center justify-start space-x-3.5">
           <button className="hover:text-primary" onClick={()=>handleDelete(product.id)}>
               <svg
                 className="fill-current"
                 width="18"
                 height="18"
                 viewBox="0 0 18 18"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                   fill=""
                 />
               </svg>
             </button>

             <button className="hover:text-primary" onClick={()=>handleModalBox(product)}>
               <svg
                 className="fill-current"
                 width="18"
                 height="18"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
               >
                 <path
                   d="M14.06 2.94a1.5 1.5 0 012.12 0l4.88 4.88a1.5 1.5 0 010 2.12l-10 10a1.5 1.5 0 01-.71.39l-5 1a1.5 1.5 0 01-1.77-1.77l1-5a1.5 1.5 0 01.39-.71l10-10zM17 8l-2-2-9.5 9.5-.72 3.58 3.58-.72L17 8zm4.94-4.94a3.5 3.5 0 00-4.95 0l-1.07 1.07 4.88 4.88 1.07-1.07a3.5 3.5 0 000-4.95z"
                   fill="currentColor"
                 />
               </svg>
             </button>
             
           </div>
         </div>
       ))}
       
       {/* Pagination */}
       <Pagination align="center" className="pt-6 pb-6" 
         defaultCurrent={1} 
         current={currentPage}
         pageSize={itemsPerPage}
         total={productData?.length || 0}
         onChange={onPageChange}
       />
        {openModal && item && (
        <EditModal
          item={item}
          endPoint="/product"
          pageName="Product"
          isModalOpen={openModal}
          setIsModalOpen={setOpenModal}
          refetch={refetch} 
          endPointForCat={'/productCategory'}        />
      )}
     </div>
   );
};

export default TableTwo;
