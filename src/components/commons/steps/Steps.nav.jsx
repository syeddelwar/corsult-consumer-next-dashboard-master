import { ButtonPlain, TextMd } from "@/components/commons";
import React from "react";

const StepsNav = ({ step, setStep, totalSteps, onContinue, isLoading }) => {
  return (
    <>
      <ButtonPlain
        text="Prev"
        width="w-[30%] md:w-1/4"
        color="bg-[#523178]"
        isBordered
        isLoading={isLoading}
        isDisabled={step == 0 || isLoading}
        isRounded
        onClick={() => setStep(step - 1)}
      />
      <div className="flex">
        <TextMd text={step + 1} />
        <TextMd text="/" />
        <TextMd text={totalSteps} />
      </div>
      <ButtonPlain
        text={step + 1 == totalSteps ? "Continue" : "Next"}
        width="w-[30%] md:w-1/4"
        isRounded
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={onContinue}
      />
    </>
  );
};

export default StepsNav;
