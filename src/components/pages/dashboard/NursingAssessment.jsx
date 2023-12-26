import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import {
  ErrorMessage,
  SelectPlain,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  TextSm,
  WarningMessage,
} from "@/components/commons";
import Step1 from "./NursingAssessment/Step1";
import Step2 from "./NursingAssessment/Step2";
import Step3 from "./NursingAssessment/Step3";
import Step4 from "./NursingAssessment/Step4";
import Step5 from "./NursingAssessment/Step5";
import Step6 from "./NursingAssessment/Step6";
import Step7 from "./NursingAssessment/Step7";
import Step8 from "./NursingAssessment/Step8";
import { AuthContext } from "@/context/auth/AuthState";
import { useConsumerContract } from "@/hooks/consumerContract";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import { useRouter } from "next/router";
import { routes } from "@/config";
import { calculateAge } from "@/utils";
import { useNursingAssessment } from "@/hooks/nursingAssessment";
import NursingAssessments from "./NursingAssessment/NursingAssessments";
import ConsumerInfo from "./NursingAssessment/ConsumerInfo";
import { useStepOneValidator } from "@/hooks/validators/NursingAssessment";

const NursingAssessment = ({ isCollapsed }) => {
  // States
  const [step, setStep] = useState(0);
  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  // Router Helpers
  const router = useRouter();

  // Custom Hooks
  const { list: listConsumerContracts, read } = useConsumerContract();
  const { read: readNursingAssessment } = useNursingAssessment();
  const { createNursingAssessment, onGenericChange, resetState } = useContext(
    NursingAssessmentContext
  );
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
    // Check whether all the required fields are present or not before moving to next step
    if (step === 0 && validateOtherInfo()) return false;
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      setIsCallingAPI(true);
      const res = await createNursingAssessment();
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 201) {
        SuccessMessage(res.data);
        setIsCallingAPI(false);
        return router.push(routes.dashboard);
      }

      setIsCallingAPI(false);
      return ErrorMessage(res.response.data);
    }

    setStep(step + 1);
  };

  // Function to fetch all the applications from database
  const getApplications = async () => {
    if (user.token && (user.type === "admin" || user.type === "nurse")) {
      const res = await listConsumerContracts(user.token);
      if (res.status === 200) {
        const numbers = res.data.map((application) => {
          return {
            text: `${application.consumerInfo.consumer_first_name} ${application.consumerInfo.consumer_last_name}  (${application.consumerInfo.consumer_cell})`,
            value: application._id,
          };
        });

        setConsumers(numbers);
      } else {
        WarningMessage(res.response.data);
      }
    }
  };

  // on Change Consumer
  const onChangeConsumer = async (e) => {
    setIsLoading(true);
    setConsumer(e.target.value);

    const checkAssessmentExist = await readNursingAssessment(
      e.target.value,
      user.token
    );

    // Check if assessment already exists.Prevent adding again by showing warning.
    if (!checkAssessmentExist.data) {
      const { data } = await read(user.token, e.target.value);

      const stateData = {
        target: {
          name: "consumer_contract_id",
          value: data._id,
        },
      };
      onGenericChange(stateData);
      setConsumerInfo(data);
    } else {
      router.push(`${routes.nursingAssessmentRead}/${e.target.value}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
    resetState();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!consumer ? (
        <div className="my-10 mx-4">
          <SelectPlain
            options={consumers}
            placeholder="Select A Consumer"
            value={consumer}
            onChange={onChangeConsumer}
          />
          <NursingAssessments />
        </div>
      ) : isLoading || !consumerInfo ? (
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
              isLoading={isCallingAPI}
              setStep={setStep}
              totalSteps={stepsComponent.length}
              onContinue={onClickContinue}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NursingAssessment;
