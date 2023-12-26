import React, { useContext, useEffect, useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import {
  ButtonPlain,
  ErrorMessage,
  InputTextArea,
  StepsNav,
  SuccessMessage,
  TextLg,
  WarningMessage,
} from "@/components/commons";
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
import { useEmail } from "@/hooks/email";
import { getTimeOfDay } from "@/utils";

const Application = () => {
  // Context
  const {
    updateConsumerLoggedinContract,
    readConsumerLoggedinContract,
    consumerFields,
  } = useContext(ConsumerContractContext);

  // Router Helpers
  const router = useRouter();

  // Contexts
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const { send } = useEmail();

  // States
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [step, setStep] = useState(0);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stepsComponent = [
    <Step1 key={1} />,
    <Step2 key={2} />,
    <Step3 key={3} />,
    // <Step4 key={4} />,
  ];

  // When someone clicks on continue button, call the api to update the data in document
  const onClickContinue = async () => {
    /**
     * Check if the current step is the last step
     *
     * ?True: call the api
     *  */
    if (step + 1 == stepsComponent.length) {
      if (
        !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
          consumerFields.consumer_representative_sign
        ) &&
        (!consumerFields.agreed_to_terms ||
          !consumerFields.acceptance_of_responsibility ||
          !consumerFields.acceptance_of_hipaa_form ||
          !consumerFields.acceptance_of_insurance ||
          !consumerFields.acceptance_of_service_agreement ||
          !consumerFields.acceptance_of_conacent)
      ) {
        return WarningMessage("Please agree to the terms before submitting!");
      }
      const res = await updateConsumerLoggedinContract();
      /**
       * Check if consumer contract has been added or not
       *
       * ?True: Show Success Message And Push To Dashboard
       */
      if (res.status == 200) {
        SuccessMessage(res.data);
        return router.push(routes.consumerApplication);
      }

      return ErrorMessage(res.response.data);
    }

    setStep(step + 1);
  };

  const onCommentSubmit = async () => {
    setIsLoading(true);
    const res = await send(
      user.token,
      comments,
      consumerFields.consumerInfo.consumer_cell
    );
    setIsLoading(false);
    if (res.status == 200) {
      setComments("");
      return SuccessMessage(res.data);
    }

    return WarningMessage(res.response.data);
  };

  useEffect(() => {
    // Check If User is not logged in. Throw it to signin page
    if (!user.token && router.isReady) {
      router.push(routes.signIn);
    }
    if (user.token && user.type !== "consumer") {
      router.push(routes.signIn);
    }
    if (router.isReady && user.token) {
      readConsumerLoggedinContract();
    }

    //eslint-disable-next-line
  }, [user, router.isReady]);

  return (
    <>
      <Head>
        <title>Application</title>
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
            <div>
              <Stepper
                styleConfig={{
                  completedBgColor: "#523178",
                  activeBgColor: "#a855f7",
                }}
                activeStep={step}
              >
                <Step label="Consumer Contract" />
                <Step label="Signature And Date" />
                <Step label="Authorization To Hipaa" />
                {/* <Step label="Insurance Benefits" /> */}
              </Stepper>
            </div>
            {step == 0 && (
              <>
                <TextLg
                  text={`Hello ${consumerFields.consumerInfo.consumer_first_name} ${consumerFields.consumerInfo.consumer_last_name}!`}
                  classes="font-bold"
                />
                <TextLg
                  text={`Good ${getTimeOfDay()}! Welcome to your dashboard. Please check all of your information and signature on your application
                before submitting it. Click the plus button to see all of your data. Make sure to sign in the signature box.`}
                  classes="my-4 font-bold"
                />
                <TextLg text="Thank You!" classes="font-bold" />
              </>
            )}
            <div className="mb-24 mt-10">
              {stepsComponent[step]}
              {step == 0 && (
                <>
                  <TextLg
                    text="If you encounter any issues, please leave a comment in the designated box, and the admin will address and correct them"
                    classes="font-bold"
                  />
                  <InputTextArea
                    id="comments"
                    name="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Comments"
                  />
                  <div className="my-4">
                    <ButtonPlain
                      text="Send"
                      isRounded
                      classes="font-bold"
                      onClick={onCommentSubmit}
                      isLoading={isLoading}
                    />
                  </div>
                </>
              )}
            </div>
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
        </section>
      </div>
    </>
  );
};

export default Application;
