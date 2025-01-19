"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { Carousel } from "antd";
import background from "../../../public/images/backgroundImg/bgFour.jpg";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOurClients } from "@/pages/api/ourclients";

export type ourclientsType = {
  ClientID: number;
  CompanyName: string;
  Logo: string;
};

const TrustedBy = () => {
  const {
    data: brandsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchOurClients,
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading brands data.</div>;
  }

  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <h1 className="my-8 text-center text-4xl font-medium">
              Trusted By
            </h1>
            <div
              style={{ backgroundImage: `url(${background.src})` }}
              className=" h-50 w-full rounded-sm bg-cover bg-center  px-8 py-8  sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
            >
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
                {brandsData.map((brand: ourclientsType) => (
                  <div key={brand.ClientID}>
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

const SingleBrand = ({ brand }: { brand: ourclientsType }) => {
  const { Logo, CompanyName } = brand;

  return (
    <div className="flex items-center justify-center px-3 py-[15px]">
      <a
        href={"#"}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-20 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        <div className="relative mb-2 h-10 w-full">
          <Image
            src={Logo}
            alt={CompanyName}
            layout="fill"
            objectFit="contain"
            className="dark:block"
          />
        </div>
        <div className="text-center text-sm font-semibold text-dark">
          {CompanyName}
        </div>
      </a>
    </div>
  );
};
