import {
  ButtonPlain,
  InputCollapse,
  InputPlain,
  InputTextArea,
  SectionCollapse,
  TextMd,
} from "@/components/commons";
import { DischargeContext } from "@/context/discharge";
import Image from "next/image";
import React, { useContext, useRef } from "react";

const Step2 = ({ consumer }) => {
  // Refs
  const agencyRepresentativeSign = useRef();

  // Context
  const { onGenericChange, dischargeFields } = useContext(DischargeContext);
  const reasons = [
    "Hospital",
    "Physician",
    "Self/Family/Friends",
    "Nursing Home",
    "CHHA (Certified Home Health Agency)",
    "LTHHCP (Long Term Home)",
    "LHCSA (Another Agency)",
    "Hospice",
    "Adult Care Facility",
    "Local Social Services District",
    "MLTC/MCOs",
    "Local Health Department",
    "Death",
    "Transferred to",
    "Other",
  ];

  return (
    <SectionCollapse title="Discharge Reason" isLast>
      <form action="">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <InputCollapse
              type="radios"
              radios={reasons}
              onChange={onGenericChange}
              radioValue={dischargeFields.discharge_reason}
              heading="The patient has been discharged to"
              radioName="discharge_reason"
            />
          </div>
          {dischargeFields.discharge_reason === "Other" && (
            <div className="col-span-12 my-4">
              <InputPlain
                placeholder="Other Discharge Reason"
                id="other_discharge_reason"
                type="text"
                name="other_discharge_reason"
                onChange={onGenericChange}
              />
            </div>
          )}
          {dischargeFields.discharge_reason === "Transferred to" && (
            <div className="col-span-12 my-4">
              <InputPlain
                placeholder="Name of Facility/Agency/Other"
                id="transferred_to"
                type="text"
                name="transferred_to"
                onChange={onGenericChange}
              />
            </div>
          )}
          <div className="col-span-12 my-1">
            <TextMd text="Summary of care provided" />
            <InputTextArea
              id="summary_of_care"
              name="summary_of_care"
              value={dischargeFields.summary_of_care}
              onChange={onGenericChange}
              placeholder="Write Something..."
            />
          </div>
          <div className="col-span-12 my-1">
            <TextMd text="Summary of patient progress" />
            <InputTextArea
              id="summary_of_patient_progress"
              name="summary_of_patient_progress"
              value={dischargeFields.summary_of_patient_progress}
              onChange={onGenericChange}
              placeholder="Write Something..."
            />
          </div>
          <div className="col-span-12 my-1">
            <TextMd text="Patient status and the description of any remaining needs for patient care and supportive services upon discharge:" />
            <InputTextArea
              id="patient_remaining_needs"
              name="patient_remaining_needs"
              value={dischargeFields.patient_remaining_needs}
              onChange={onGenericChange}
              placeholder="Write Something..."
            />
          </div>
          <div className="col-span-12 my-1">
            <TextMd
              text="Patient or family’s ability to self-manage in relation to any remaining problems, and recommendations and referral for any follow-
up care If applicable:"
            />
            <InputTextArea
              id="patient_remaining_problems"
              name="patient_remaining_problems"
              value={dischargeFields.patient_remaining_problems}
              onChange={onGenericChange}
              placeholder="Write Something..."
            />
          </div>
          <div className="col-span-12 my-1">
            <TextMd
              classes="font-bold"
              text="You may request an informal meeting to discuss this plan with the Agency Management Team within 10 days of the date of this
notification. You also have the right to seek legal counsel."
            />
          </div>
          <div className="col-span-12">
            <div className="mx-auto rounded-md border-2 w-full md:w-3/4 h-[7.5rem]">
              {consumer?.authority_sign && (
                <Image
                  src={`/uploads/authority_sign/${consumer?.authority_sign}`}
                  width={100}
                  className="w-full h-full"
                  unoptimized
                  height={130}
                  alt="Loading..."
                />
              )}
            </div>
            <TextMd
              classes="font-semibold text-center"
              text="Signature of Agency Representative"
            />
            <div>
              <InputPlain
                label="Authorized Sign Date"
                id="authorized_sign_date"
                type="date"
                name="authorized_sign_date"
                value={consumer?.authorized_sign_date}
                isDisabled
              />
            </div>
          </div>
        </div>
      </form>
    </SectionCollapse>
  );
};

export default Step2;
