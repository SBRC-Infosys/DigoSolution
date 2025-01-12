import React, { forwardRef, useImperativeHandle } from 'react';

// Define a type for the options
type Option = {
  value: string | number;
  label: string;
};

interface SelectGroupTwoProps {
  label: string; // Label text
  selectedOption: string; // Currently selected option
  onOptionChange: (value: string) => void; // Handler function for option change
  options: Option[]; // Array of options for the dropdown
  className?: string; // Optional class name for the outer div
  selectClassName?: string; // Optional class name for the select element
}

// Define the ref type if needed
interface SelectGroupTwoRef {
  clearSelection: () => void; // Function to clear the selection
}

// Use forwardRef to allow parent components to control the ref
const SelectGroupTwo = forwardRef<SelectGroupTwoRef, SelectGroupTwoProps>(
  ({ label, selectedOption, onOptionChange, options, className, selectClassName }, ref) => {
    useImperativeHandle(ref, () => ({
      clearSelection: () => {
        onOptionChange(''); // Call the handler to clear selection
      },
    }));

    return (
      <div className={`mb-4.5 ${className}`}>
        <label className="text-md mb-3 mt-3 block font-semibold text-black dark:text-white">{label}</label>

        <div className="relative z-20 bg-white dark:bg-form-input">
          <select
            value={selectedOption}
            onChange={(e) => onOptionChange(e.target.value)} // Pass the selected value to the parent
            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
              selectedOption ? 'text-black dark:text-white' : 'text-black dark:text-white'
            } ${selectClassName}`}
          >
            <option value="" disabled className="text-body dark:text-bodydark">
              Select ...
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="text-body dark:text-bodydark">
                {option.label}
              </option>
            ))}
          </select>

          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 text-black dark:text-white">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    );
  }
);

// Provide a display name to avoid ESLint issues
SelectGroupTwo.displayName = 'SelectGroupTwo';

export default SelectGroupTwo;
