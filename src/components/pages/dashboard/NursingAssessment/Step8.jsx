import {
  ButtonPlain,
  InputPlain,
  InputRadio,
  InputTextArea,
  SectionCollapse,
  Text2Xl,
  TextMd,
  TextSm,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

const Step8 = ({ consumer }) => {
  const nurseSign = useRef();

  // Context
  const {
    onVaccinationStatusChange,
    onGenericChange,
    nursingFields,
    onSignsClear,
    onSignsEnd,
  } = useContext(NursingAssessmentContext);
  const { user } = useContext(AuthContext);

  // When Someone Clears The Sign
  const handleClearSign = (e) => {
    e.preventDefault();
    nurseSign.current.clear();
    onSignsClear({
      target: {
        name: "nurse_signature",
        value: "",
      },
    });
  };

  useEffect(() => {
    if (
      !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
        nursingFields.nurse_signature
      )
    ) {
      (user.type === "admin" || user.type === "nurse") &&
        nursingFields.nurse_signature &&
        nurseSign.current.fromDataURL(nursingFields.nurse_signature);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <SectionCollapse
        title="Goals/
Rehabilitation"
      >
        <InputTextArea
          placeholder="Goals/Rehabilitation/Potential/Discharge Plans"
          id="goals_plans"
          name="goals_plans"
          value={nursingFields.goals_plans}
          onChange={onGenericChange}
        />
      </SectionCollapse>
      <SectionCollapse title="Vaccination Status" isLast>
        <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
          <TextSm
            classes="font-medium min-w-[18rem] max-w-[18rem]"
            text="Is all COVID 19 vaccinations done?"
          />
          <InputRadio
            id="covid_vac_yes"
            value="Yes"
            name="covid_19_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={
              nursingFields.vaccinationStatus.covid_19_vaccine === "Yes"
            }
            label="Yes"
          />
          <InputRadio
            id="covid_vac_no"
            value="No"
            name="covid_19_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={
              nursingFields.vaccinationStatus.covid_19_vaccine === "No"
            }
            label="No"
          />
        </div>
        <div className="flex flex-col items-start md:flex-row md:items-center gap-2 my-3">
          <TextSm
            classes="font-medium min-w-[18rem] max-w-[18rem]"
            text="Is all FLU vaccinations done?"
          />
          <InputRadio
            id="flu_vac_yes"
            value="Yes"
            name="flu_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={nursingFields.vaccinationStatus.flu_vaccine === "Yes"}
            label="Yes"
          />
          <InputRadio
            id="flu_vac_no"
            value="No"
            name="flu_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={nursingFields.vaccinationStatus.flu_vaccine === "No"}
            label="No"
          />
        </div>
        <div className="flex flex-col items-start md:flex-row md:items-center gap-2 my-3">
          <TextSm
            classes="font-medium min-w-[18rem] max-w-[18rem]"
            text="Is all Pneumococcal vaccinations done?"
          />
          <InputRadio
            id="pneumococcal_vac_yes"
            value="Yes"
            name="pneumococcal_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={
              nursingFields.vaccinationStatus.pneumococcal_vaccine === "Yes"
            }
            label="Yes"
          />
          <InputRadio
            id="pneumococcal_vac_no"
            value="No"
            name="pneumococcal_vaccine"
            onChange={onVaccinationStatusChange}
            isChecked={
              nursingFields.vaccinationStatus.pneumococcal_vaccine === "No"
            }
            label="No"
          />
        </div>
      </SectionCollapse>
      <div className="grid grid-cols-12 gap-3 my-3">
        <div className="col-span-12">
          {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
            nursingFields.nurse_signature
          ) ? (
            <div className="border-2 w-3/4 md:h-[8.2rem] my-10 mx-auto">
              <Image
                unoptimized
                src={`/uploads/nurse_signature/${nursingFields.nurse_signature}`}
                width={100}
                alt="Loading...."
                height={100}
                className="w-full h-full object-contain"
              />
              <TextMd
                classes="font-semibold text-center"
                text="Nurse's Signature"
              />
            </div>
          ) : (
            <>
              <ReactSignatureCanvas
                penColor="black"
                ref={nurseSign}
                onEnd={() =>
                  onSignsEnd({
                    target: {
                      name: "nurse_signature",
                      value: nurseSign.current.toDataURL(),
                    },
                  })
                }
                canvasProps={{
                  height: 150,
                  width: 300,
                  className: "sigCanvas mx-auto rounded-md border-2",
                }}
              />
              <TextMd
                classes="font-semibold text-center"
                text="Nurse's Signature"
              />
              <div className="flex gap-4 my-3 justify-center">
                <ButtonPlain
                  text="Clear"
                  isRounded
                  isBordered
                  width="w-48"
                  onClick={handleClearSign}
                />
              </div>
            </>
          )}
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Date of Verbal SOC Where Applicable"
            id="date_verbal_soc"
            type="date"
            name="date_verbal_soc"
            value={nursingFields.date_verbal_soc}
            onChange={onGenericChange}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Date of HHA Received Signed POT"
            id="date_hha_received"
            type="date"
            name="date_hha_received"
            value={nursingFields.date_hha_received}
            onChange={onGenericChange}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Physician's Name and Address"
            placeholder="Physician's Name and Address"
            id="physician_name_address"
            type="text"
            name="physician_name_address"
            value={`${consumer?.pcp.pcp_first_name} ${consumer?.pcp.pcp_last_name} ,${consumer?.pcp.pcp_street_address}`}
            onChange={null}
            isDisabled={true}
          />
        </div>
        <div className="col-span-12 my-3">
          <TextSm
            classes="font-bold"
            text="I certify/recertify that this patient is confined to his/her home and needs intermittent skilled nursing care, physical
  therapy and/or speech therapy or continues to need occupational therapy. The patient is under my care, and I
  have authorized services on this plan of care and will periodically review the plan."
          />
          <TextSm
            classes="font-bold my-5"
            text="Anyone who misrepresents, falsifies, or conceals essential information required for payment of
  Federal funds may be subject to fine, imprisonment, or civil penalty under applicable Federal laws."
          />
        </div>
        <div className="col-span-12 my-3">
          <InputTextArea
            placeholder="Note for physician"
            id="note_for_physician"
            type="text"
            name="note_for_physician"
            value={nursingFields.note_for_physician}
            onChange={onGenericChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Step8;
