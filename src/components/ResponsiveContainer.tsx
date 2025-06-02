import type React from "react";

type ResponsiveContainerProps = {
    children: React.ReactNode;
    className?: string;
}

const ResponsiveContainer = ({children, className}: ResponsiveContainerProps) => {
  return (
    <div className={`max-w-6xl mx-auto lg:px-0 px-6 my-5 ${className}`}>
        {children}
    </div>
  );
};

export default ResponsiveContainer;