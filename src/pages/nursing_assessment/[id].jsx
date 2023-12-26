import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import {
  ErrorMessage,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  TextSm,
  WarningMessage,
} from "@/components/commons";
import Step1 from "@/components/pages/dashboard/NursingAssessment/Step1";
import Step2 from "@/components/pages/dashboard/NursingAssessment/Step2";
import Step3 from "@/components/pages/dashboard/NursingAssessment/Step3";
import Step4 from "@/components/pages/dashboard/NursingAssessment/Step4";
import Step5 from "@/components/pages/dashboard/NursingAssessment/Step5";
import Step6 from "@/components/pages/dashboard/NursingAssessment/Step6";
import Step7 from "@/components/pages/dashboard/NursingAssessment/Step7";
import Step8 from "@/components/pages/dashboard/NursingAssessment/Step8";
import { AuthContext } from "@/context/auth/AuthState";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import { routes } from "@/config";
import { calculateAge } from "@/utils";
import { useRouter } from "next/router";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import ConsumerInfo from "@/components/pages/dashboard/NursingAssessment/ConsumerInfo";
import { useStepOneValidator } from "@/hooks/validators/NursingAssessment";

const NursingAssessment = () => {
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
  const { readNursingAssessment, setNursingFields, updateNursingAssessment } =
    useContext(NursingAssessmentContext);
  const { validateOtherInfo } = useStepOneValidator();

  // Contexts
  const { user } = useContext(AuthContext);

  const stepsComponent = [
    <Step1 key={1} consumer={consumerInfo} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    <Step4 key={4} />,
    <Step5 key={5} />,
    <Step6 key={6} />,
    <Step7 key={7} />,
    <Step8 key={8} consumer={consumerInfo} />,
  ];

  // When someone clicks on continue button
  const onClickContinue = async () => {
    if (step === 0 && validateOtherInfo()) return false;
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      setIsCallingAPI(true);
      const res = await updateNursingAssessment();
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
  const getAssessment = async (e) => {
    setIsLoading(true);
    const { data, status } = await readNursingAssessment(id);
    if (!data) {
      WarningMessage("Assessment Doesn't Exist!");
      return router.push(routes.dashboard);
    }
    setConsumerInfo(data.consumer_contract_id);

    const medications = [];

    data?.medications?.map((medication, i) => {
      medications.push([
        {
          placeholder: "Medication",
          id: "medications_medication_" + i + 1,
          name: "medications_medication_" + i + 1,
          value: medication.medication,
        },
        {
          placeholder: "Dose",
          id: "medications_dose_" + i + 1,
          name: "medications_dose_" + i + 1,
          value: medication.dose,
        },
        {
          placeholder: "Frequency",
          id: "medications_frequency_" + i + 1,
          name: "medications_frequency_" + i + 1,
          value: medication.frequency,
        },
        {
          placeholder: "Route/Changes",
          id: "medications_route_" + i + 1,
          name: "medications_route_" + i + 1,
          value: medication.route,
        },
      ]);
    });

    const stateData = {
      ...data,
      consumer_contract_id: data.consumer_contract_id._id,
      medications,
    };
    setNursingFields(stateData);

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
      getAssessment();
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
              <section
                className={`bg-[#523178] ${
                  isCollapsed ? "md:-ml-8" : "md:-ml-2"
                } -mt-4 mb-4 md:mt-0 md:mb-4  gap-2 pl-1 py-5 grid grid-cols-12 justify-between sticky top-0 z-10`}
              >
                <ConsumerInfo consumerInfo={consumerInfo} />
              </section>
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
                    <Step
                      label="Medical Information-1"
                      onClick={() => setStep(1)}
                    />
                    <Step
                      label="Medical Information-2"
                      onClick={() => setStep(2)}
                    />
                    <Step label="Living Habits" onClick={() => setStep(3)} />
                    <Step
                      label="Communication & Daily Living"
                      onClick={() => setStep(4)}
                    />
                    <Step
                      label="Instrumental Activities"
                      onClick={() => setStep(5)}
                    />
                    <Step
                      label="Attendant & Social Profile"
                      onClick={() => setStep(6)}
                    />
                    <Step label="Final" onClick={() => setStep(7)} />
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

export default NursingAssessment;
