import React, { useState, Fragment } from "react";
import ResetPasswordInput from "./ResetPasswordInput";
import ResetPaswordEmailInput from "./ResetPaswordEmailInput";

const ResetPasswordForm = () => {
  const [step, setStep] = useState(1);

  // eslint-disable-next-line default-case
  switch (step) {
    case 1:
      return <ResetPaswordEmailInput setStep={setStep} />;
    case 2:
      return <ResetPasswordInput setStep={setStep} />;
  }
};

export default ResetPasswordForm;
