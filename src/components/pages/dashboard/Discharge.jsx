import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import Step1 from "./Discharge/Step1";
import Step2 from "./Discharge/Step2";
import {
  ErrorMessage,
  SelectPlain,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { useConsumerContract } from "@/hooks/consumerContract";
import { DischargeContext } from "@/context/discharge";
import { routes } from "@/config";
import { useRouter } from "next/router";

const Discharge = ({ isCollapsed }) => {
  // States
  const [step, setStep] = useState(0);
  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const stepsComponent = [
    <Step1 key={1} consumer={consumerInfo} />,
    <Step2 key={2} consumer={consumerInfo} />,
  ];

  // NR Helpers
  const router = useRouter();

  // Custom Hooks
  const { list: listConsumerContracts, read } = useConsumerContract();
  // Contexts
  const { user } = useContext(AuthContext);
  const { onGenericChange, createDischarge, resetState } =
    useContext(DischargeContext);

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
  };

  // When someone clicks on continue button
  const onClickContinue = async () => {
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      setIsCallingAPI(true);
      const res = await createDischarge();
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
              <Step label="Form" />
              <Step label="Reason" />
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

export default Discharge;
