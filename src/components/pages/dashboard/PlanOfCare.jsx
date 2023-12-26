import React, { useContext, useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import Step1 from "./PlanOfCare/Step1";
import Step2 from "./PlanOfCare/Step2";
import {
  ErrorMessage,
  SelectPlain,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import Step3 from "./PlanOfCare/Step3";
import Step4 from "./PlanOfCare/Step4";
import Step5 from "./PlanOfCare/Step5";
import Step6 from "./PlanOfCare/Step6";
import { useRouter } from "next/router";
import { useConsumerContract } from "@/hooks/consumerContract";
import { AuthContext } from "@/context/auth/AuthState";
import { PlanOfCareContext } from "@/context/planOfCare";
import { routes } from "@/config";
import jwt_decode from "jwt-decode";
import PlanOfCares from "./PlanOfCare/PlanOfCares";
import { usePlanOfCare } from "@/hooks/planOfCare";

const PlanOfCare = ({ isCollapsed }) => {
  // States
  const [step, setStep] = useState(0);
  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const stepsComponent = [
    <Step1 key={1} consumer={consumerInfo} />,
    <Step2 key={2} consumer={consumerInfo} />,
    <Step3 key={3} />,
    <Step4 key={4} />,
    <Step5 key={5} consumer={consumerInfo} />,
    <Step6 key={6} consumer={consumerInfo} />,
  ];

  // NR Helpers
  const router = useRouter();

  // Custom Hooks
  const { list: listConsumerContracts, read } = useConsumerContract();
  const { read: readPOC } = usePlanOfCare();

  // Contexts
  const { user } = useContext(AuthContext);
  const {
    onGenericChange,
    createCare,
    readLoggedInPlanOfCare,
    setCareFields,
    resetState,
  } = useContext(PlanOfCareContext);

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

    if (user.type === "aid" || user.type === "consumer") {
      const { data } = await read(user.token, e.target.value);
      const stateData = {
        target: {
          name: "consumer_contract_id",
          value: data._id,
        },
      };
      onGenericChange(stateData);
      setConsumerInfo(data);
      setIsLoading(false);
      return;
    }

    const checkPOCExists = await readPOC(e.target.value, user.token);
    // Check if emergency already exists.Prevent adding again by showing warning.
    if (!checkPOCExists.data || user.type !== "aid") {
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
      router.push(`${routes.patientEmergencyRead}/${e.target.value}`);
    }

    setIsLoading(false);
  };
  // Fetch Plan of Care (FOR AID)
  const getPlanOfCare = async (e) => {
    const res = await readLoggedInPlanOfCare();
    if (res.status === 200 && res.data) {
      setCareFields(res.data);
    } else {
      WarningMessage("No Plan Of Care Found!");
      if (user.type === "aid") {
        return router.push(routes.aidApplication);
      }
      if (user.type === "consumer") {
        return router.push(routes.consumerApplication);
      }
    }
    setIsLoading(false);
  };

  // When someone clicks on continue button
  const onClickContinue = async () => {
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      if (user.type === "aid") {
        return router.push(routes.aidApplication);
      }
      if (user.type === "consumer") {
        return router.push(routes.consumerApplication);
      }

      setIsCallingAPI(true);

      const res = await createCare();
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

  useEffect(() => {
    // Check if the logged in role is admin or nurse than fetch applications and resetState so if someone pressed edit earlier, it wouldn't get previously selected user data in steps.
    if (user.type === "admin" || user.type === "nurse") {
      getApplications();
      resetState();
    }

    // Check if the logged in role is aid than fetch the consumer information and plan of care info
    if (user.type === "aid" || user.type === "consumer") {
      var token = user.token;
      var decoded = jwt_decode(token);

      const data = {
        target: {
          value: decoded.app_id,
        },
      };
      // Fetch the consumer info
      onChangeConsumer(data);
      getPlanOfCare();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {!consumer && (user.type === "admin" || user.type === "nurse") ? (
        <div className="my-10 mx-4">
          <SelectPlain
            options={consumers}
            placeholder="Select A Consumer"
            value={consumer}
            onChange={onChangeConsumer}
          />
          <PlanOfCares />
        </div>
      ) : isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <SpinnerLarge />
        </div>
      ) : (
        <>
          <div className="mx-4">
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
    </>
  );
};

export default PlanOfCare;
