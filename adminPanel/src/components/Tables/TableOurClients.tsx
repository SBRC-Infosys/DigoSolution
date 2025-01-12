"use client";
import Image from "next/image";
import { SLIDER } from "@/types/slider";
import { Pagination } from "antd";
import axiosInstance from "../../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ClientTypes } from "@/types/ourClients";
import Link from "next/link";
import Spinner from "../Spinner";
import { useState } from "react";
import { useToast } from "../../../contexts/ToastProvider";
import EditModal from "../Modals/EditOurClients";

const fetchOurClients = async () => {
  try {
    const res = await axiosInstance.get(`/clients`);
    return res.data.data;
  } catch (error) {
    console.error("Error while fetching our clients:", error);
  }
};

const TableOurClients: React.FC = () => {
  const {
    data: ourClients,
    isLoading,
    error,
    refetch
  } = useQuery<ClientTypes[]>({
    queryKey: ["ourClients"],
    queryFn: fetchOurClients,
  });

  const [item, setItem] = useState<ClientTypes>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; 

   // Change page function
   const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Slice the data for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = ourClients?.slice(startIndex, endIndex);

  const handleModalBox = (categoryItem: ClientTypes) => {
    setItem(categoryItem);
    setOpenModal(true);
  }

  const handleDelete = async (id:number) => {
    try {
      const response = await axiosInstance.delete(`/social-links/delete/${id}`);
      if(response.status === 200 || response.status === 201){
        toast.success('Item deleted successfully!');
        refetch();
      }
    } catch (error) {
      toast.error('Problem while deleting item. Try Again!');
      console.error('Error while deleting banner gallery:',error);
    }
  }


  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                SN
              </h5>
            </div>
            <div className="p-2.5 xl:p-4">
              <h5 className="text-center text-sm font-medium uppercase xsm:text-base">
                Company Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Logo
              </h5>
            </div>
            
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {paginatedData?.map((item, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === paginatedData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {item.ClientID}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {item.CompanyName}
                </p>
              </div>
              <div className="flex items-center justify-center py-4 ">
                <Image src={item?.Logo} width={60} height={50} alt="Brand" />
              </div>

              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                <div className="flex items-center justify-center space-x-3.5">
                 
                  <button className="hover:text-primary" onClick={()=>handleDelete(item.ClientID)}>
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
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill=""
                      />
                    </svg>
                  </button>
                  <button className="hover:text-primary" onClick={()=> handleModalBox(item)}>
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
              </td>
            </div>
          ))}
        </div>
        <Pagination
          align="center"
          className="pb-6 pt-6"
          defaultCurrent={1}
          current={currentPage}
          pageSize={itemsPerPage}
          total={ourClients?.length || 0}
          onChange={onPageChange}
        />
      </div>
      {openModal && item && (
        <EditModal
          item={item}
          endPoint="/our-clients/update"
          pageName="Our Clients"
          isModalOpen={openModal}
          setIsModalOpen={setOpenModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default TableOurClients;
