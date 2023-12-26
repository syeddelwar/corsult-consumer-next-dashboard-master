import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import { ErrorMessage, StepsNav, SuccessMessage } from "@/components/commons";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import { useRouter } from "next/router";
import { routes } from "@/config";
import Step1 from "@/components/pages/dashboard/ConsumerContact/Step1";
import Step2 from "@/components/pages/dashboard/ConsumerContact/Step2";
import Step3 from "@/components/pages/dashboard/ConsumerContact/Step3";
import Step4 from "@/components/pages/dashboard/ConsumerContact/Step4";
import { AuthContext } from "@/context/auth/AuthState";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import Head from "next/head";
import {
  useStepOneValidator,
  useStepTwoValidator,
} from "@/hooks/validators/ConsumerContract";

const ConsumerApplication = () => {
  // Context
  const { updateConsumerContract, readConsumerContract } = useContext(
    ConsumerContractContext
  );

  // Router Helpers
  const router = useRouter();
  const { id } = router.query;

  // Custom Hooks
  const {
    validateConsumerInfo,
    validateDiagnosis,
    validatePCP,
    validateEmergency,
  } = useStepOneValidator();
  const { validateAppPassword } = useStepTwoValidator();

  // Contexts
  const { user } = useContext(AuthContext);

  // States
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [step, setStep] = useState(0);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const stepsComponent = [
    <Step1 key={1} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    // <Step4 key={4} />,
  ];

  // When someone clicks on continue button, call the api to update the data in document
  const onClickContinue = async () => {
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
      setIsCallingAPI(true);
      const res = await updateConsumerContract(id);
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 200) {
        SuccessMessage(res.data);
        setIsCallingAPI(false);
        return router.push(routes.dashboard);
      }

      setIsCallingAPI(false);
      return ErrorMessage(res.response.data);
    }

    setStep(step + 1);
  };

  useEffect(() => {
    // Check If User is not logged in. Throw it to signin page
    if (!user.token && router.isReady) {
      router.push(routes.signIn);
    }

    if (
      user.token &&
      (user.type === "admin" || user.type === "nurse") &&
      router.isReady &&
      id
    ) {
      readConsumerContract(id);
    }
    //eslint-disable-next-line
  }, [user, router.isReady]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-12 gap-4 justify-center items-center">
        <section
          className={`col-span-12 ${
            isCollapsed ? "md:col-span-1" : "md:col-span-3"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </section>
        <section
          className={`transition-all duration-500 col-span-12 ${
            isCollapsed ? "md:col-span-11" : "md:col-span-9"
          } relative`}
        >
          <div className="mx-4">
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
            <div className="mb-24">{stepsComponent[step]}</div>
          </div>
          <div
            className={`transition-all duration-500 flex items-center justify-between gap-4 fixed bottom-0 shadow-2xl border-t-2 p-4 bg-white right-0 w-full ${
              isCollapsed ? "md:w-[93.7%]" : "md:w-[75%]"
            } z-[2]`}
          >
            <StepsNav
              step={step}
              setStep={setStep}
              isLoading={isCallingAPI}
              totalSteps={stepsComponent.length}
              onContinue={onClickContinue}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ConsumerApplication;
