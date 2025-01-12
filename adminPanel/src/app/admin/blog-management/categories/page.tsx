import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BlogCategories from "@/components/Tables/BlogCategories";



const BlogCategory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Blogs Category" endPoint="/blogcategory/add" />
      <div className="flex flex-col gap-10">
        <BlogCategories />
      </div>
      
    </DefaultLayout>
  );
};

export default BlogCategory;
