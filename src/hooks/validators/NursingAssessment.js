import { WarningMessage } from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import { useContext } from "react";

export const useStepOneValidator = () => {
  // Contexts
  const { isConsumerDiagnosisFilled } = useContext(NursingAssessmentContext);

  const validateOtherInfo = () => {
    if (!isConsumerDiagnosisFilled()) {
      return WarningMessage(
        "Please complete all the info in other info section"
      );
    }
  };

  return {
    validateOtherInfo,
  };
};
