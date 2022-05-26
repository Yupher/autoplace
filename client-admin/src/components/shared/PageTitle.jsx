import React from "react";
import { Helmet } from "react-helmet-async";

const PageTitle = (props) => {
  const { children } = props;
  const title = children || "";

  return (
    <Helmet>
      <title>
        {title}
        {title ? " — " : ""}
        Admin
      </title>
    </Helmet>
  );
};

export default PageTitle;
