import React, { useState, useEffect } from "react";
import RoadMapData from "./RoadMapData";
import SectionTitle from "../Common/SectionTitle";

const RoadMap = () => {
  const [selectedId, setSelectedId] = useState<number | null>(RoadMapData[0]?.id || null);

  const handleClick = (id: number) => {
    setSelectedId(id); 
  };

  return (
    <div className="container my-16">
    <SectionTitle
          title="Streamline Your Operations"
          paragraph=" "
          center
        />
    <div className=" flex-col flex gap-12 lg:flex-row">
      <div className="roadmap-left grid grid-cols-2 lg:w-2/5">
        {RoadMapData.map((item) => (
          <div
            key={item.id}
            className={`roadmap-item-left flex justify-between dark:bg-dark bg-white items-center p-8 m-4 rounded-xl ${
              selectedId === item.id ? "oneColor" : ""
            }`} 
            onClick={() => handleClick(item.id)}
          >
            <div className="icon-title text-center gap-2 flex flex-col">
              {item.icon}
              <p>{item.title}</p>
            </div>
            <div className="arrow">{item.arrow}</div>
          </div>
        ))}
      </div>

      <div className="roadmap-right lg:w-3/5">
        {selectedId !== null && (
          <div className="selected-roadmap block roundcard dark:bg-dark bg-white rounded-md p-10">
            {RoadMapData.filter((item) => item.id === selectedId).map((item) => (
              <div key={item.id} className="block">
                <h1 className=" md:text-lg lg:text-2xl border-b-4 border-cyan-500 pb-2 w-[40px] font-semibold">
                  {item.title}
                </h1>
                <ul className="block h-auto list-disc ml-4 mt-2 pr-[10px] text-start sm:text-sm lg:text-xs xl:text-base font-medium leading-relaxed text-body-color">
                  {item.list.map((listItem, index) => (
                    <li key={index}>{listItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RoadMap;
