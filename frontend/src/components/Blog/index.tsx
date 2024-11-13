import { Carousel } from "antd";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";


const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="Discover our latest blogs for fresh insights and updates on the latest trends and topics. Stay ahead with expert tips and in-depth articles crafted for your success."
          center
        />

        <div>
          <Carousel
          arrows
          infinite
          autoplay
          className="custom-carousel"
          dots={false}
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}>
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full p-8">
              <SingleBlog blog={blog} />
            </div>
          ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Blog;
