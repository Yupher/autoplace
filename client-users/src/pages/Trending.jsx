import React, { Fragment } from "react";
import { useIntl, FormattedMessage } from "react-intl";

import LoadingSpiner from "../components/shared/LoadingSpiner";
import PageTitle from "../components/shared/PageTitle";

const Trending = () => {
  const intl = useIntl();
  return (
    <Fragment>
      <PageTitle>{intl.formatMessage({ id: "TRANDING_TITLE" })}</PageTitle>
      <h3
        style={{
          textAlign: "center",
          marginTop: "200px",
          marginBottom: "20px",
        }}
      >
        <FormattedMessage id='COMING_SOON' />
      </h3>
      <LoadingSpiner />
    </Fragment>
  );
};

export default Trending;
