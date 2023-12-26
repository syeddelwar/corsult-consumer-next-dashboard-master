import { WarningMessage } from "@/components/commons";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import { useContext } from "react";

export const useStepOneValidator = () => {
  // Contexts
  const {
    isConsumerInfoRequiredFieldsFilled,
    isConsumerDiagnosisRequiredFieldsFilled,
    isPCPRequiredFieldsFilled,
    isEmergencyOneFilled,
    isEmergencyTwoFilled,
  } = useContext(ConsumerContractContext);

  const validateConsumerInfo = () => {
    if (!isConsumerInfoRequiredFieldsFilled()) {
      return WarningMessage(
        "Please complete all the info in consumer info section"
      );
    }
  };
  const validateEmergency = () => {
    if (!isEmergencyOneFilled() && !isEmergencyTwoFilled()) {
      return WarningMessage("Please complete atleast one emergency info");
    }
  };
  const validateDiagnosis = () => {
    if (!isConsumerDiagnosisRequiredFieldsFilled()) {
      return WarningMessage(
        "Please complete all the info in diagnosis section"
      );
    }
  };
  const validatePCP = () => {
    if (!isPCPRequiredFieldsFilled()) {
      return WarningMessage("Please complete all the info in PCP section");
    }
  };

  return {
    validateConsumerInfo,
    validateDiagnosis,
    validatePCP,
    validateEmergency,
  };
};
export const useStepTwoValidator = () => {
  // Contexts
  const { isAppPasswordFilled } = useContext(ConsumerContractContext);

  const validateAppPassword = () => {
    if (!isAppPasswordFilled()) {
      return WarningMessage("Please type app password");
    }
  };

  return {
    validateAppPassword,
  };
};
