import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import {
  ErrorMessage,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import Step1 from "@/components/pages/dashboard/PatientEmergency/Step1";
import { AuthContext } from "@/context/auth/AuthState";
import { routes } from "@/config";
import { useRouter } from "next/router";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import { PatientEmergencyContext } from "@/context/patientEmergency";

const PatientEmergency = () => {
  // States
  const [step, setStep] = useState(0);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Router Helpers
  const router = useRouter();
  const { id } = router.query;

  // Custom Hooks
  const { readEmergency, setEmergencyFields, updatePatientEmergency } =
    useContext(PatientEmergencyContext);

  // Contexts
  const { user } = useContext(AuthContext);

  const stepsComponent = [<Step1 key={1} consumer={consumerInfo} />];

  // When someone clicks on continue button
  const onClickContinue = async () => {
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      const res = await updatePatientEmergency();
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 200) {
        SuccessMessage(res.data);
        return router.push(routes.dashboard);
      }

      return ErrorMessage(res.response.data);
    }

    setStep(step + 1);
  };

  // on Change Consumer
  const getEmergency = async (e) => {
    setIsLoading(true);
    const { data, status } = await readEmergency(id);

    if (!data) {
      WarningMessage("Emergency Doesn't Exist!");
      return router.push(routes.dashboard);
    }
    setConsumerInfo(data.consumer_contract_id);

    const stateData = {
      ...data,
      consumer_contract_id: data.consumer_contract_id._id,
    };
    setEmergencyFields(stateData);

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
      getEmergency();
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

export default PatientEmergency;
