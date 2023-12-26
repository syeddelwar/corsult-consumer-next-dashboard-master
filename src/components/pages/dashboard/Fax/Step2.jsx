import {
  ButtonPlain,
  InputCollapse,
  InputPlain,
  InputTextArea,
  SectionCollapse,
  SelectPlain,
  TextMd,
} from "@/components/commons";
import { usaStates } from "@/config";
import { FaxContext } from "@/context/fax";
import React, { useContext, useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

const Step2 = () => {
  const nurseSign = useRef();
  const physicianSign = useRef();

  // Context
  const { faxFields, onGenericChange } = useContext(FaxContext);

  const formFields = [
    {
      label: "Patient's HI Claim No.",
      placeholder: "Patient's HI Claim No.",
      id: "patient_hi_claim_no",
      type: "text",
      name: "patient_hi_claim_no",
    },
    {
      label: "Start Of Care Date",
      placeholder: "Start Of Care Date",
      id: "start_of_care_date",
      type: "date",
      name: "start_of_care_date",
    },
    {
      label: "Certification Period From",
      placeholder: "Certification Period From",
      id: "certification_period_from",
      type: "date",
      name: "certification_period_from",
    },
    {
      label: "Certification Period To",
      placeholder: "Certification Period To",
      id: "certification_period_to",
      type: "date",
      name: "certification_period_to",
    },
    {
      label: "Medical Record No.",
      placeholder: "Medical Record No.",
      id: "medical_record_no",
      type: "text",
      name: "medical_record_no",
    },
    {
      label: "Provider No.",
      placeholder: "Provider No.",
      id: "provider_no",
      type: "text",
      name: "provider_no",
    },
    {
      label: "Patient's Name",
      placeholder: "Patient's Name",
      id: "patient_name",
      type: "text",
      name: "patient_name",
    },
    {
      label: "Patient's Address",
      placeholder: "Patient's Address",
      id: "patient_address",
      type: "text",
      name: "patient_address",
    },
    {
      label: "Date Of Birth",
      placeholder: "Date Of Birth",
      id: "patient_dob",
      type: "date",
      name: "patient_dob",
    },
    {
      label: "Sex",
      placeholder: "Please select a sex",
      id: "patient_sex",
      type: "select",
      name: "patient_sex",

      options: ["Male", "Female"],
    },
    {
      label: "Medications: Dose/Frequency/Route (N)ew (C)hanged",
      placeholder: "Medications: Dose/Frequency/Route (N)ew (C)hanged",
      id: "patient_medications",
      type: "textarea",
      name: "patient_medications",

      isFullCol: true,
    },
    {
      label: "Principal Diagnosis",
      placeholder: "Principal Diagnosis",
      id: "principal_diagnosis",
      type: "text",
      name: "principal_diagnosis",
    },
    {
      label: "Date",
      placeholder: "Date",
      id: "principal_diagnosis_date",
      type: "date",
      name: "principal_diagnosis_date",
    },
    {
      label: "Other Pertinent Diagnosis",
      placeholder: "Other Pertinent Diagnosis",
      id: "pertinent_diagnosis",
      type: "text",
      name: "pertinent_diagnosis",
    },
    {
      label: "Date",
      placeholder: "Date",
      id: "pertinent_diagnosis_date",
      type: "date",
      name: "pertinent_diagnosis_date",
    },
    {
      label: "Surgical Procedure",
      placeholder: "Surgical Procedure",
      id: "surgical_procedure",
      type: "text",
      name: "surgical_procedure",
    },
    {
      label: "Date",
      placeholder: "Date",
      id: "surgical_procedure_date",
      type: "date",
      name: "surgical_procedure_date",
    },
    {
      label: "DME and Supplies",
      placeholder: "DME and Supplies",
      id: "dme_and_supplies",
      type: "text",
      name: "dme_and_supplies",
    },
    {
      label: "Safety Measures",
      placeholder: "Safety Measures",
      id: "safety_measures",
      type: "text",
      name: "safety_measures",
    },
    {
      label: "Nutritional Req.",
      placeholder: "Nutritional Req.",
      id: "nutritional_req",
      type: "text",
      name: "nutritional_req",
    },
    {
      label: "Allergies",
      placeholder: "Allergies",
      id: "allergies",
      type: "text",
      name: "allergies",
    },
  ];

  const functionalLimitations = [
    "Ampulation",
    "Paralysis",
    "Legally Blind",
    "Bowel/Bladder (Incontinance)",
    "Endurance",
    "Dyspnea With Minimal Exertion",
    "Contracture",
    "Ambulation",
    "Hearing",
    "Speech",
    "Other",
  ];

  const activitiesPermitted = [
    "Complete Bedrest",
    "Partial Weight Bearing",
    "Wheelchair",
    "Bedrest BRP",
    "Independent At Home",
    "Walker",
    "Up As Tolerated",
    "Crutches",
    "No Restrictions",
    "Transfer Bed/Chair",
    "Cane",
    "Exercises Prescribed",
    "Other",
  ];

  const mentalStatus = [
    "Oriented",
    "Forgetful",
    "Comatose",
    "Depressed",
    "Disoriented",
    "Lethargic",
    "Agitated",
    "Other",
  ];

  const prognosis = ["Poor", "Guarded", "Fair", "Good", "Excellent"];

  // When Someone Clears The Sign
  const handleClearNurseSign = (e) => {
    e.preventDefault();
    nurseSign.current.clear();
  };

  // When Someone Clears The Sign
  const handleClearPhysicianSign = (e) => {
    e.preventDefault();
    physicianSign.current.clear();
  };

  return (
    <SectionCollapse title="HOME HEALTH CERTIFICATION AND PLAN OF CARE" isLast>
      <div className="grid grid-cols-12 gap-2">
        {formFields.map((field) => {
          return (
            <div
              key={field.id}
              className={`col-span-12 ${
                field.isFullCol ? "md:col-span-12" : "md:col-span-6"
              }`}
            >
              {field.type !== "select" && field.type !== "textarea" && (
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  onBlur={field.onBlur}
                />
              )}
              {field.type === "textarea" && (
                <InputTextArea
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  name={field.name}
                  onChange={onGenericChange}
                  onBlur={field.onBlur}
                />
              )}
              {field.type === "select" && (
                <SelectPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  name={field.name}
                  onChange={onGenericChange}
                  onBlur={field.onBlur}
                  options={field.options}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="checkboxes"
                checkboxes={functionalLimitations}
                heading="Functional Limitations"
                namePrefix="functional_limitation"
              />
            </div>
            <div className="my-2">
              <InputPlain
                placeholder="Other Limitations"
                id="other_limitations"
                type="text"
                name="other_limitations"
                onChange={null}
                onBlur={null}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="checkboxes"
                checkboxes={activitiesPermitted}
                heading="Activities Permitted"
                namePrefix="activities_permitted"
              />
            </div>
            <div className="my-2">
              <InputPlain
                placeholder="Other Activities Permitted"
                id="other_activities_permitted"
                type="text"
                name="other_activities_permitted"
                onChange={null}
                onBlur={null}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="checkboxes"
                checkboxes={mentalStatus}
                heading="Mental Status"
                namePrefix="mental_status"
              />
            </div>
            <div className="my-2">
              <InputPlain
                placeholder="Other Activities Permitted"
                id="other_activities_permitted"
                type="text"
                name="other_activities_permitted"
                onChange={null}
                onBlur={null}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radios={prognosis}
              heading="Prognosis"
              radioName="prognosis"
            />
          </div>
          <div className="col-span-12">
            <InputTextArea
              placeholder="Orders for Discipline and Treatments (Specify Amount/Frequency/Duration)"
              id="orders_for_discipline"
              name="orders_for_discipline"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12">
            <InputTextArea
              placeholder="Goals/Rehabilitation Potential/Discharge Plans"
              id="discharge_plans"
              name="discharge_plans"
              onChange={null}
              onBlur={null}
            />
          </div>

          <div className="col-span-12">
            <ReactSignatureCanvas
              penColor="black"
              ref={nurseSign}
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
                onClick={handleClearNurseSign}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputPlain
              label="Date of Verbal SOC Where Applicable"
              id="fax_date_verbal_soc"
              type="date"
              name="fax_date_verbal_soc"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputPlain
              label="Date of HHA Received Signed POT"
              id="fax_date_hha_received"
              type="date"
              name="fax_date_hha_received"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12">
            <ReactSignatureCanvas
              penColor="black"
              ref={physicianSign}
              canvasProps={{
                height: 150,
                width: 300,
                className: "sigCanvas mx-auto rounded-md border-2",
              }}
            />
            <TextMd
              classes="font-semibold text-center"
              text="Attendant Physician Signature"
            />
            <div className="flex gap-4 my-3 justify-center">
              <ButtonPlain
                text="Clear"
                isRounded
                isBordered
                width="w-48"
                onClick={handleClearPhysicianSign}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputPlain
              label="Physician Date Signed"
              id="fax_physician_date_signed"
              type="date"
              name="fax_physician_date_signed"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12 md:col-span-8">
            <InputPlain
              label="Physician Name"
              placeholder="Physician Name"
              id="fax_physician_name"
              type="text"
              name="fax_physician_name"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              label="Physician Address"
              placeholder="Physician Address"
              id="fax_physician_address"
              type="text"
              name="fax_physician_address"
              onChange={null}
              onBlur={null}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectPlain
              label="State"
              placeholder="Select State"
              id="fax_physician_state"
              options={usaStates}
              name="fax_physician_state"
              onChange={null}
              onBlur={null}
            />
          </div>
        </div>
      </div>
    </SectionCollapse>
  );
};

export default Step2;
