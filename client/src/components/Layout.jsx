import React from "react";
import { Navigbar } from "./Navigbar";
import { Weather } from "./Weather"
import { Categorynav } from "./Categorynav";
// import { PopularsNews } from "./PopularsNews";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Navigbar />
        <Weather />
        <Categorynav />
        {/* <PopularsNews /> */}
        {children}
      </div>
    </React.Fragment>
  );
};
