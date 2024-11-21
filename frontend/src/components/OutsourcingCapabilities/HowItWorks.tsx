import SectionTitle from "../Common/SectionTitle";

const HowItWorks = () => {
  return (
    <section id="features" className="flex py-16 md:py-20 lg:py-28 ">
      <div className="container ">
        <h1 className="text-center text-2xl font-extrabold text-cyan-400 dark:text-white">How It works</h1>
        <SectionTitle
          title="Build Faster & Flawless Products With Diago"
          paragraph="
                We follow a proven multi- step assembling process to provide the best development team that meets your requirements , and guide you through the augmentation process
                
             "
          center
        />

        <div className="grid justify-center  gap-y-14  ">
          <div className="skeletonStraight dark:border-white">
            <div className=" roundcard flex max-w-[600px] flex-col rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
              <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
              Discovery Phase or Project Assessment
              </h3>
              <ul className="pr-[10px] list-disc text-start text-base font-medium leading-relaxed text-body-color">
                <li>In-depth analysis of project requirements</li>
                <li>Defining the scope of the project</li>
              </ul>
              
            </div>
          </div>
          <div className="skeletonStraight dark:border-white">
            <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
              <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
              Resource Alignment
              </h3>
               <ul className="pr-[10px] list-disc text-start text-base font-medium leading-relaxed text-body-color">
                <li>Mapping developers</li>
                <li>Team selection suitable for the project</li>
              </ul>
            </div>
          </div>
          <div className="skeletonStraight dark:border-white">
          <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
            <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
            Onboarding
            </h3>
             <ul className="pr-[10px] list-disc text-start text-base font-medium leading-relaxed text-body-color">
                <li>Environment ,tools ,infrastructure setup</li>
                <li>Process & methodology definition</li>
                <li>Communication processes establishment</li>
                <li>Work Culture adoption</li>
              </ul>
          </div>
          </div>
          <div className="skeletonStraight dark:border-white">
          <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
            <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
            Delivery Management
            </h3>
            <ul className="pr-[10px] list-disc text-start text-base font-medium leading-relaxed text-body-color">
                <li>Sprints planning</li>
                <li>Team Size adjustment (scale up/ down)</li>
                <li>Knowledge accumulation & sharing</li>
                <li>Quality parameters</li>
                <li>Performance Measurement , Feedback and enhancement support</li>
              </ul>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
