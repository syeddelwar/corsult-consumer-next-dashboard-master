import { TextSm } from "@/components/commons";
import { calculateAge } from "@/utils";
import React from "react";

const ConsumerInfo = ({ consumerInfo }) => {
  return (
    <>
      <div className="col-span-6 md:col-span-2">
        <TextSm
          text={`MRN: ${consumerInfo?.consumerInfo?.consumer_mrn}`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <TextSm
          text={`Name: ${consumerInfo?.consumerInfo?.consumer_first_name} ${consumerInfo?.consumerInfo?.consumer_last_name}`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
      <div className="col-span-6 md:col-span-1">
        <TextSm
          text={`Gender: ${consumerInfo?.consumerInfo?.consumer_gender}`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>

      <div className="col-span-6 md:col-span-1">
        <TextSm
          text={`SSN: ${consumerInfo?.consumerInfo?.consumer_ssn}`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <TextSm
          text={`Phone: ${consumerInfo?.consumerInfo?.consumer_cell}`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <TextSm
          text={`DOB: ${
            consumerInfo?.consumerInfo.consumer_dob
              ? consumerInfo?.consumerInfo.consumer_dob
              : "Not Available"
          }`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
      <div className="col-span-6 md:col-span-2">
        <TextSm
          text={`Age: ${
            consumerInfo?.consumerInfo.consumer_dob
              ? `${calculateAge(consumerInfo.consumerInfo.consumer_dob)} Years`
              : "Not Available"
          }`}
          classes="text-white text-left md:text-center font-bold"
        />
      </div>
    </>
  );
};

export default ConsumerInfo;
