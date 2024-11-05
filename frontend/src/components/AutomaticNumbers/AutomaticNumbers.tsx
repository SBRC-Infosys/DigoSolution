"use client";
import React, { useEffect, useRef } from "react";

const AutomaticNumbers: React.FC = () => {
  const itemsRef = useRef<NodeListOf<HTMLSpanElement> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            itemsRef.current = document.querySelectorAll(".number");
            itemsRef.current.forEach((item) => {
              updateCount(item);
            });
            observer.disconnect(); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect(); // Clean up the observer on component unmount
  }, []);

  const updateCount = (el: HTMLSpanElement) => {
    const value = parseInt(el.dataset.value || "0", 10);
    const increment = Math.ceil(value / 100);
    let initialValue = 0;

    const increaseCount = setInterval(() => {
      initialValue += increment;
      if (initialValue >= value) {
        el.innerText = `${value}+`;
        clearInterval(increaseCount);
        return;
      }
      el.innerText = `${initialValue}+`;
    }, 10); // Adjust timing for a smoother animation if needed
  };

  return (
    <div
      ref={containerRef}
      className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center rounded-sm bg-gray-light px-8 py-8 dark:bg-cyan-800 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
    >
      <article>
        <span className="number text-4xl font-semibold" data-value="80">80+</span>
        <p className="text-base font-medium">Project Completed</p>
      </article>

      <article>
        <span className="number text-4xl font-semibold" data-value="300">300+</span>
        <p className="text-base font-medium">Happy Clients</p>
      </article>

      <article>
        <span className="number text-4xl font-semibold" data-value="50">50+</span>
        <p className="text-base font-medium">Certified Professionals</p>
      </article>

      <article>
        <span className="number text-4xl font-semibold" data-value="100">100+</span>
        <p className="text-base font-medium">Core Teams</p>
      </article>
    </div>
  );
};

export default AutomaticNumbers;
