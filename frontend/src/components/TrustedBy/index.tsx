import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import { Carousel } from "antd";
import background from '../../../public/images/backgroundImg/bgFour.jpg';

const TrustedBy = () => {

  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
          <h1 className="text-4xl font-medium text-center my-8">Trusted By</h1>
            <div style={{ backgroundImage: `url(${background.src})`}} className=" h-50 w-full bg-cover bg-center rounded-sm  px-8 py-8  sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              <Carousel
                autoplay
                dots={false}
                slidesToShow={6}
                slidesToScroll={1}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
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
                ]}
              >
                {brandsData.map((brand) => (
                  <div key={brand.id}>
                    <SingleBrand brand={brand} />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="flex items-center justify-center px-3 py-[15px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image src={imageLight} alt={name} fill className="hidden dark:block" />
        <Image src={image} alt={name} fill className="block dark:hidden" />
      </a>
    </div>
  );
};
