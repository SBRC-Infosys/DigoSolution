"use client";
import { useRouter } from 'next/navigation'
import { Button } from "antd";

interface BreadcrumbProps {
  pageName: string;
  linkUrl: string;
}

const Breadcrumbs2 = ({ pageName, linkUrl }: BreadcrumbProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(linkUrl); 
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <Button
        className="bg-blue-600 px-8 py-5 font-semibold"
        type="primary"
        onClick={handleNavigation}
      >
        ADD
      </Button>
    </div>
  );
};

export default Breadcrumbs2;
