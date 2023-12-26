import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import Step1 from "./ConsumerContact/Step1";
import Step2 from "./ConsumerContact/Step2";
import Step3 from "./ConsumerContact/Step3";
import Step4 from "./ConsumerContact/Step4";
import {
  ErrorMessage,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import { useRouter } from "next/router";
import { routes } from "@/config";
import { isEmail } from "@/utils";
import {
  useStepOneValidator,
  useStepTwoValidator,
} from "@/hooks/validators/ConsumerContract";

const ConsumerContract = ({ isCollapsed }) => {
  // Context
  const { createConsumerContract, consumerFields, resetState } = useContext(
    ConsumerContractContext
  );

  // Router Helpers
  const router = useRouter();

  // Custom Hooks
  const {
    validateConsumerInfo,
    validateDiagnosis,
    validatePCP,
    validateEmergency,
  } = useStepOneValidator();
  const { validateAppPassword } = useStepTwoValidator();

  // States
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const stepsComponent = [
    <Step1 key={1} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    // <Step4 key={4} />,
  ];

  // When someone clicks on continue button, call the api to save the data in document
  const onClickContinue = async () => {
    // Check whether all the required fields are present or not before moving to next step
    if (step === 0 && validateConsumerInfo()) return false;
    if (step === 0 && validateDiagnosis()) return false;
    if (step === 0 && validatePCP()) return false;
    if (step === 0 && validateEmergency()) return false;

    if (step === 1 && validateAppPassword()) return false;

    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      setIsLoading(true);
      const res = await createConsumerContract();
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 201) {
        SuccessMessage(res.data);
        setIsLoading(false);
        return router.push(routes.dashboard);
      }

      setIsLoading(false);
      return ErrorMessage(res.response.data);
    }

    setStep(step + 1);
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <section className="mx-4">
      <div>
        <div>
          <Stepper
            styleConfig={{
              completedBgColor: "#523178",
              activeBgColor: "#a855f7",
            }}
            activeStep={step}
          >
            <Step label="Consumer Contract" />
            <Step label="Authorization To Hipaa" />
            <Step label="Signature And Date" />
            {/* <Step label="Insurance Benefits" /> */}
          </Stepper>
        </div>
        <div className="mb-24 mt-10">{stepsComponent[step]}</div>
      </div>
      <div
        className={`transition-all duration-500 flex items-center justify-between gap-4 fixed bottom-0 shadow-2xl border-t-2 p-4 bg-white right-0 w-full ${
          isCollapsed ? "md:w-[93.7%]" : "md:w-[75%]"
        } z-[2]`}
      >
        <StepsNav
          step={step}
          setStep={setStep}
          isLoading={isLoading}
          totalSteps={stepsComponent.length}
          onContinue={onClickContinue}
        />
      </div>
    </section>
  );
};

export default ConsumerContract;
