import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import {
  ErrorMessage,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { routes } from "@/config";
import { useRouter } from "next/router";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import { PlanOfCareContext } from "@/context/planOfCare";
import Step1 from "@/components/pages/dashboard/PlanOfCare/Step1";
import Step2 from "@/components/pages/dashboard/PlanOfCare/Step2";
import Step3 from "@/components/pages/dashboard/PlanOfCare/Step3";
import Step4 from "@/components/pages/dashboard/PlanOfCare/Step4";
import Step5 from "@/components/pages/dashboard/PlanOfCare/Step5";
import Step6 from "@/components/pages/dashboard/PlanOfCare/Step6";

const PlanOfCare = () => {
  // States
  const [step, setStep] = useState(0);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  // Router Helpers
  const router = useRouter();
  const { id } = router.query;

  // Custom Hooks
  const { readPOC, setCareFields, updatePlanOfCare } =
    useContext(PlanOfCareContext);

  // Contexts
  const { user } = useContext(AuthContext);

  const stepsComponent = [
    <Step1 key={1} consumer={consumerInfo} />,
    <Step2 key={2} consumer={consumerInfo} />,
    <Step3 key={3} />,
    <Step4 key={4} />,
    <Step5 key={5} consumer={consumerInfo} />,
    <Step6 key={6} consumer={consumerInfo} />,
  ];

  // When someone clicks on continue button
  const onClickContinue = async () => {
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      setIsCallingAPI(true);
      const res = await updatePlanOfCare();
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

  // on Change Consumer
  const getPOC = async (e) => {
    setIsLoading(true);
    const { data, status } = await readPOC(id);
    if (!data) {
      WarningMessage("Plan Of Care Doesn't Exist!");
      return router.push(routes.dashboard);
    }
    setConsumerInfo(data.consumer_contract_id);

    const stateData = {
      ...data,
      consumer_contract_id: data.consumer_contract_id._id,
    };
    setCareFields(stateData);

    setIsLoading(false);
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
      getPOC();
    }

    //eslint-disable-next-line
  }, [user, router.isReady]);

  return (
    <>
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
          {isLoading ? (
            <div className="h-screen flex items-center justify-center">
              <SpinnerLarge />
            </div>
          ) : (
            <>
              <div className="mx-4">
                <div className="hidden md:block">
                  <Stepper
                    styleConfig={{
                      completedBgColor: "#523178",
                      activeBgColor: "#a855f7",
                    }}
                    activeStep={step}
                  >
                    <Step label="Form" onClick={() => setStep(0)} />
                    <Step label="Section 1" onClick={() => setStep(1)} />
                    <Step label="Section 2" onClick={() => setStep(2)} />
                    <Step label="Section 3" onClick={() => setStep(3)} />
                    <Step label="Section 4" onClick={() => setStep(4)} />
                    <Step label="Section 5" onClick={() => setStep(5)} />
                  </Stepper>
                </div>
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
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default PlanOfCare;
