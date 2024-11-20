import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'

const Transparency = () => {
  return (
    <div> <div className="w-full container flex flex-col md:flex-row justify-center items-center ">
      <div className="w-full">
      <DotLottieReact src="https://lottie.host/f403ae73-5af5-4279-a40e-94202a0b198d/bvZO7CcgGz.lottie" loop autoplay />
      </div>
      <div className='lg:w-2/4 w-full md:w-3/4 '>
      <h3 className="mb-5 mt-2 md:text-start text-center  text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
      How Do We Achieve Engagement And Transparency?
      </h3>
      <p className="pr-[10px] md:text-start text-center  text-base font-medium leading-relaxed text-body-color">
      By helping teams leverage processes and tools, we enable exceptional collaboration, the free flow of work, and continuous improvement to ensure that you get the results you need. 
      </p>
      </div>
    </div>
  </div>
  )
}

export default Transparency