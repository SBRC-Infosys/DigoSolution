
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumbs2 from "@/components/Breadcrumbs2/Breadcrumbs2";
import Blogs from "@/components/Tables/Blogs";
const BlogDetails = () => {
  return (
    <DefaultLayout>
      <Breadcrumbs2 pageName="Blogs Management" linkUrl="/admin/blog-management/products/details" />
      <div className="flex flex-col gap-10">
        <Blogs/>
      </div>
    </DefaultLayout>
  );
};

export default BlogDetails;
