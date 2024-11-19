import SectionTitle from "../Common/SectionTitle";

const Advantage = () => {
  return (
    <section id="features" className="flex py-16 md:py-20 lg:py-28 ">
      <div className="container ">
        <SectionTitle
          title="Digo Advantage"
          paragraph="
                One of the key advantages of our company lies in its potential for innovation and growth within the rapidly evolving technology industry. Our Company is specialized in providing information technology products, services, and solutions, and they enjoy several distinct benefits:
                
             "
          center
        />

        <div className="grid justify-center  gap-y-14  ">
          <div className="skeleton dark:border-white">
            <div className=" roundcard flex max-w-[600px] flex-col rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
              <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
                Global Operations
              </h3>
              <p className="pr-[10px] text-start text-base font-medium leading-relaxed text-body-color">
                Our worldwide presence provides services to our global customers
                with highly scalable support they need.
              </p>
            </div>
          </div>
          <div className="skeleton dark:border-white">
            <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
              <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
                Global Operations
              </h3>
              <p className="pr-[10px] text-start text-base font-medium leading-relaxed text-body-color">
                Our worldwide presence provides services to our global customers
                with highly scalable support they need.
              </p>
            </div>
          </div>
          <div className="skeleton dark:border-white">
          <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
            <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
              Global Operations
            </h3>
            <p className="pr-[10px] text-start text-base font-medium leading-relaxed text-body-color">
              Our worldwide presence provides services to our global customers
              with highly scalable support they need.
            </p>
          </div>
          </div>
          <div className="skeleton dark:border-white">
          <div className=" roundcard flex max-w-[600px] flex-col  rounded-xl border border-black bg-slate-50 p-8 dark:bg-black  ">
            <h3 className="mb-5 text-lg font-bold text-cyan-500 ">
              Global Operations
            </h3>
            <p className="pr-[10px] text-start text-base font-medium leading-relaxed text-body-color">
              Our worldwide presence provides services to our global customers
              with highly scalable support they need.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Advantage;
