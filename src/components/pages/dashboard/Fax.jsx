import React, { useContext, useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import {
  ErrorMessage,
  SelectPlain,
  SpinnerLarge,
  StepsNav,
  SuccessMessage,
  WarningMessage,
} from "@/components/commons";
import Step1 from "./Fax/Step1";
import StepsToSendFax from "./Fax/StepsToSendFax";
import { routes } from "@/config";
import { useRouter } from "next/router";
import { useConsumerContract } from "@/hooks/consumerContract";
import { AuthContext } from "@/context/auth/AuthState";
import { FaxContext } from "@/context/fax";
import { useGeneratePDF } from "@/hooks/generatePDF";
import { prettifyPDFName } from "@/utils";

const Fax = ({ isCollapsed }) => {
  const [step, setStep] = useState(0);

  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [consumerPdfs, setConsumerPdfs] = useState([]);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  // Router Helpers
  const router = useRouter();

  // Custom Hooks
  const { list: listConsumerContracts, read } = useConsumerContract();
  const { list: listPdfs } = useGeneratePDF();

  // Contexts
  const { user } = useContext(AuthContext);
  const { onGenericChange, createFax, resetState } = useContext(FaxContext);

  const stepsComponent = [
    <Step1 key={1} consumer={consumerInfo} consumerPdfs={consumerPdfs} />,
    // <Step2 key={2} />,
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
      const res = await createFax();
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

    const res = await read(user.token, e.target.value);

    if (res.data) {
      setConsumerInfo(res.data);
      const stateData = {
        target: {
          name: "consumer_contract_id",
          value: res.data._id,
        },
      };
      const pdfsArray = await listPdfs(
        user.token,
        res.data.consumerInfo.consumer_cell
      );

      if (pdfsArray.data && pdfsArray.data.length > 0) {
        const pdfs = [];

        for (const pdf of pdfsArray?.data) {
          pdfs.push({ value: pdf.file, text: prettifyPDFName(pdf.file) });
        }

        setConsumerPdfs(pdfs);
        onGenericChange(stateData);
      } else {
        ErrorMessage("Please generate atleast one pdf before sending fax");
        return router.push(routes.generatePDF);
      }
    } else {
      router.push(routes.dashboard);
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
          <div className="my-5">
            <StepsToSendFax />
          </div>
        </div>
      ) : isLoading || !consumerInfo ? (
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
              <Step label="Receiver" onClick={() => setStep(0)} />
              {/* <Step label="HOME HEALTH CERTIFICATION AND PLAN OF CARE" /> */}
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

export default Fax;
