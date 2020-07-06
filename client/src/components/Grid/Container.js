import React from "react";

// This Container component allows us to use a bootstrap container without worrying about class names
export function Container({fluid, children, bgImage}) {
  return (
    <div
      className={`container${fluid ? "-fluid" : ""} h100`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
