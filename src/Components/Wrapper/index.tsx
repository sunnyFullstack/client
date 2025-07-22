import React from "react";

const PageWrapper = ({ children }: any) => {
  return <div className="max-h-screen overflow-auto ">{children}</div>;
};

export default PageWrapper;
