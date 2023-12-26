import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import Step1 from "./PatientEmergency/Step1";
import {
  SelectPlain,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import { useConsumerContract } from "@/hooks/consumerContract";
import { useRouter } from "next/router";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { PatientEmergencyContext } from "@/context/patientEmergency";
import jwt_decode from "jwt-decode";
import PatientEmergencies from "./PatientEmergency/PatientEmergencies";
import { usePatientEmergency } from "@/hooks/patientEmergency";

const PatientEmergency = ({ isCollapsed }) => {
  // States
  const [step, setStep] = useState(0);
  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const stepsComponent = [<Step1 consumer={consumerInfo} key={1} />];

  // Router Helpers
  const router = useRouter();

  // Custom Hooks
  const { list: listConsumerContracts, read } = useConsumerContract();
  const { read: readEmergency } = usePatientEmergency();

  // Contexts
  const { user } = useContext(AuthContext);
  const {
    onGenericChange,
    createEmergency,
    readLoggedInEmergency,
    setEmergencyFields,
    resetState,
  } = useContext(PatientEmergencyContext);

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
      const res = await createEmergency();
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 201) {
        setIsCallingAPI(false);
        SuccessMessage(res.data);
        return router.push(routes.dashboard);
      }

      setIsCallingAPI(false);
      // return ErrorMessage(res.response.data);
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
    const checkEmergencyExists = await readEmergency(
      e.target.value,
      user.token
    );
    // Check if emergency already exists.Prevent adding again by showing warning.
    if (!checkEmergencyExists.data) {
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

  // Fetch Emergency
  const getEmergency = async (e) => {
    const res = await readLoggedInEmergency();
    // Check if the emergency for this patient exists or not, if not than throw it to aid application page
    if (res.status === 200 && res.data) {
      setEmergencyFields(res.data);
    } else {
      WarningMessage("No Emergency Application Found!");
      if (user.type === "aid") {
        return router.push(routes.aidApplication);
      }
      if (user.type === "consumer") {
        return router.push(routes.consumerApplication);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if the logged in role is admin or nurse than fetch applications and resetState so if someone pressed edit earlier, it wouldn't get previously selected user data in steps.
    if (user.type === "admin" || user.type === "nurse") {
      getApplications();
      resetState();
    }

    // Check if the logged in role is aid or consumer than fetch the consumer information and plan of care info
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
      getEmergency();
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
          <PatientEmergencies />
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

export default PatientEmergency;
