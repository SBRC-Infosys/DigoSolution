"use client"
import React, { useEffect, useRef } from "react";


const AutomaticNumbers: React.FC = () => {
  const itemsRef = useRef<NodeListOf<HTMLSpanElement> | null>(null);

  useEffect(() => {
    if (itemsRef.current) {
      itemsRef.current.forEach((item) => {
        updateCount(item);
      });
    }
  }, []);

  const updateCount = (el: HTMLSpanElement) => {
    const value = parseInt(el.dataset.value || "0", 10);
    const increment = Math.ceil(value / 100);
    let initialValue = 0;

    const increaseCount = setInterval(() => {
      initialValue += increment;
      if (initialValue > value) {
        el.innerText = `${value}+`;
        clearInterval(increaseCount);
        return;
      }
      el.innerText = `${initialValue}+`;
    }, 0.1); 
  };

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px] ">
      <article>
        <span className="number text-4xl font-semibold" data-value="80" ref={(el) => itemsRef.current = document.querySelectorAll('.number')}>80+</span>
        <p className="text-base font-medium">Project Completed</p>
      </article>

      <article>
        <span className="number text-4xl font-semibold " data-value="300" ref={(el) => itemsRef.current = document.querySelectorAll('.number')}>300+</span>
        <p className="text-base font-medium">Happy Clients</p>
      </article>

      <article>
        <span className="number text-4xl font-semibold " data-value="50" ref={(el) => itemsRef.current = document.querySelectorAll('.number')}>50+</span>
        <p className="text-base font-medium">Cetrified Professionls</p>
      </article>
      <article> 
        <span className="number text-4xl font-semibold " data-value="100" ref={(el) => itemsRef.current = document.querySelectorAll('.number')}>100+</span>
        <p className="text-base font-medium">Core Teams</p>
      </article>
    </div>
  );
};

export default AutomaticNumbers;
