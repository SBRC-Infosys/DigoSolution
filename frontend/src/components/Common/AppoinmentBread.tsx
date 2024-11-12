import React from "react";
import background from '../../../public/images/backgroundImg/bgTwo.jpg';

const AppoinmentBread = ({
  description,
  appoinment,
}: {
  description: string;
  appoinment: string;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${background.src})` }}
      className="relative h-64 w-full bg-cover bg-center "
    >
        
      <div className="flex flex-wrap items-center justify-center h-full  ">
        <div className="py-10 px-4 md:w-8/12 lg:w-7/12 flex items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-white sm:text-3xl ">
            {description}
          </h1>
        </div>

        <div className="w-full px-4 flex justify-center md:w-4/12 lg:w-5/12">
          <button className="px-8 py-3 text-base font-semibold text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-800 hover:text-white-600 transition duration-300 ease-in-out">
            {appoinment}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentBread;
