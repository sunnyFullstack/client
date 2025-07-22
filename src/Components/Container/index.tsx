// src/components/Container.tsx

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full h-100 px-4 sm:px-6 md:px-8 mx-auto bg-gray-200 rounded pt-6 pb-6 xl:max-w-[90%] lg:max-w-[90%] md:max-w-[95%] sm:max-w-[80%] xs:w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
