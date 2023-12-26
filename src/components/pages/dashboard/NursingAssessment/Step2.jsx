import {
  IconPlain,
  InputPlain,
  InputRadio,
  InputTextArea,
  SectionCollapse,
  TextLg,
  TextLgFancy,
  TextSm,
} from "@/components/commons";
import { images } from "@/config";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import Image from "next/image";
import React, { useContext } from "react";

const Step2 = () => {
  // Context
  const {
    nursingFields,
    onAddMedication,
    onMedicalInfoChange,
    onMedicationsChange,
  } = useContext(NursingAssessmentContext);

  return (
    <>
      <SectionCollapse title="Medical Information">
        <div className="grid grid-cols-12 gap-2">
          <div className="flex flex-col justify-between col-span-12 gap-2">
            <TextLgFancy text="Height & Weight" classes="font-semibold" />
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 md:col-span-3 flex items-center gap-4">
                <Image
                  src={images.height}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="5"
                  postFixText="Ft"
                  id="height_feet"
                  type="number"
                  noIcon
                  name="height_feet"
                  value={nursingFields.medicalInfo.height_feet}
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="10"
                  postFixText="In"
                  id="height_inch"
                  type="number"
                  noIcon
                  name="height_inch"
                  value={nursingFields.medicalInfo.height_inch}
                />
              </div>
              <div className="col-span-12 md:col-span-2 flex items-center gap-2">
                <Image
                  src={images.weight}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Weight"
                  id="weight"
                  postFixText="lbs"
                  noIcon
                  type="text"
                  name="weight"
                  value={nursingFields.medicalInfo.weight}
                />
              </div>
              <div className="col-span-12 md:col-span-7">
                <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
                  <TextSm classes="font-bold" text="Weight Status:" />
                  <InputRadio
                    id="weight_inc"
                    value="Increase"
                    name="weight_status"
                    label="Increase"
                    onChange={onMedicalInfoChange}
                    isChecked={
                      nursingFields.medicalInfo.weight_status === "Increase"
                    }
                  />
                  <InputRadio
                    id="weight_static"
                    value="Static"
                    name="weight_status"
                    label="Static"
                    onChange={onMedicalInfoChange}
                    isChecked={
                      nursingFields.medicalInfo.weight_status === "Static"
                    }
                  />
                  <InputRadio
                    id="weight_dec"
                    value="Decrease"
                    name="weight_status"
                    label="Decrease"
                    onChange={onMedicalInfoChange}
                    isChecked={
                      nursingFields.medicalInfo.weight_status === "Decrease"
                    }
                  />
                </div>
              </div>
              <div className="col-span-12">
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Reason for Any Weight Change"
                  id="reason_for_weight_change"
                  type="text"
                  name="reason_for_weight_change"
                  value={nursingFields.medicalInfo.reason_for_weight_change}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between col-span-12 gap-2">
            <TextLgFancy text="Vital Signs" classes="font-semibold" />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                <Image
                  src={images.bp_high}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Systolic BP"
                  id="blood_pressure_upper"
                  type="number"
                  noIcon
                  name="blood_pressure_upper"
                  value={nursingFields.medicalInfo.blood_pressure_upper}
                />
                /
                <Image
                  src={images.bp_low}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Diastolic BP"
                  id="blood_pressure_lower"
                  type="number"
                  noIcon
                  name="blood_pressure_lower"
                  value={nursingFields.medicalInfo.blood_pressure_lower}
                />
                mmHg
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center">
                <Image
                  src={images.temperature}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Temperature"
                  id="temperature"
                  postFixText="°F"
                  type="number"
                  noIcon
                  name="temperature"
                  value={nursingFields.medicalInfo.temperature}
                />
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center">
                <Image
                  src={images.pulse}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Pulse"
                  id="pulse"
                  postFixText="bpm"
                  type="number"
                  noIcon
                  name="pulse"
                  value={nursingFields.medicalInfo.pulse}
                />
              </div>
              <div className="col-span-12 md:col-span-5 flex items-center">
                <Image
                  src={images.respirator}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  noIcon
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Respirations"
                  id="respirations"
                  postFixText="bpm"
                  type="number"
                  noIcon
                  name="respirations"
                  value={nursingFields.medicalInfo.respirations}
                />
              </div>

              <div className="col-span-12">
                <div className="flex items-center gap-2">
                  <TextSm classes="font-bold" text="Pain:" />
                  <InputRadio
                    id="pain_yes"
                    value="Yes"
                    name="pain_status"
                    label="Yes"
                    onChange={onMedicalInfoChange}
                    isChecked={nursingFields.medicalInfo.pain_status === "Yes"}
                  />
                  <InputRadio
                    id="pain_no"
                    value="No"
                    name="pain_status"
                    label="No"
                    onChange={onMedicalInfoChange}
                    isChecked={nursingFields.medicalInfo.pain_status === "No"}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Level of pain"
                  id="level_of_pain"
                  type="number"
                  name="level_of_pain"
                  value={nursingFields.medicalInfo.level_of_pain}
                />
              </div>
              <div className="col-span-6">
                <InputPlain
                  onChange={onMedicalInfoChange}
                  placeholder="Location And Description"
                  id="location_and_description"
                  type="text"
                  name="location_and_description"
                  value={nursingFields.medicalInfo.location_and_description}
                />
              </div>
              <div className="col-span-12 border-t-2 border-black pt-5">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="History of Present Illness"
                      id="history_of_present_illness"
                      name="history_of_present_illness"
                      value={
                        nursingFields.medicalInfo.history_of_present_illness
                      }
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Past History"
                      id="past_history"
                      name="past_history"
                      value={nursingFields.medicalInfo.past_history}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Family and Personal History"
                      id="family_and_personal_history"
                      name="family_and_personal_history"
                      value={
                        nursingFields.medicalInfo.family_and_personal_history
                      }
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="General Appearance"
                      id="general_appearance"
                      name="general_appearance"
                      value={nursingFields.medicalInfo.general_appearance}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Skin"
                      id="skin"
                      name="skin"
                      value={nursingFields.medicalInfo.skin}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="HEENT(Head,Eye, ENT)"
                      id="heent"
                      name="heent"
                      value={nursingFields.medicalInfo.heent}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Neck"
                      id="neck"
                      name="neck"
                      value={nursingFields.medicalInfo.neck}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Chest and Lungs"
                      id="chest_and_lungs"
                      name="chest_and_lungs"
                      value={nursingFields.medicalInfo.chest_and_lungs}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Cardiovascular"
                      id="cardiovascular"
                      name="cardiovascular"
                      value={nursingFields.medicalInfo.cardiovascular}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Abdomen"
                      id="abdomen"
                      name="abdomen"
                      value={nursingFields.medicalInfo.abdomen}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Genitourinary"
                      id="genitourinary"
                      name="genitourinary"
                      value={nursingFields.medicalInfo.genitourinary}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Rectal"
                      id="rectal"
                      name="rectal"
                      value={nursingFields.medicalInfo.rectal}
                    />
                  </div>
                  <div className="col-span-6">
                    <InputTextArea
                      onChange={onMedicalInfoChange}
                      placeholder="Neurological/Psychiatry"
                      id="neurological"
                      name="neurological"
                      value={nursingFields.medicalInfo.neurological}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Medications" isLast>
        <div className="grid grid-cols-12 bg-gray-200 p-4 rounded-lg mb-4">
          <div className="col-span-6 flex items-center gap-1">
            <TextLg classes="font-bold" text="1OD:" />
            <TextLg text="One Tablet Once a day" />
          </div>
          <div className="col-span-6 flex items-center gap-1">
            <TextLg classes="font-bold" text="1BD:" />
            <TextLg text="One Tablet Twice a day" />
          </div>
          <div className="col-span-6 flex items-center gap-1">
            <TextLg classes="font-bold" text="1TDS:" />
            <TextLg text="One Tablet Thrice a day" />
          </div>
          <div className="col-span-6 flex items-center gap-1">
            <TextLg classes="font-bold" text="1QID:" />
            <TextLg text="One Tablet Four times a day" />
          </div>
        </div>
        {nursingFields?.medications?.map((fields, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-12 gap-2 border-dotted border-b-2 border-purple-800 mb-3"
            >
              {fields?.map((field, j) => {
                return (
                  <div key={field.id} className="col-span-12 md:col-span-6">
                    <InputTextArea
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={fields[j].value}
                      onChange={(e) => onMedicationsChange(e, i, j)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="text-end">
          <button type="button" onClick={() => onAddMedication()}>
            <IconPlain
              iconClass="fa-plus !bg-[#523178] border-4 rounded-full ml-auto"
              wrapperSize="w-14 h-14"
              size="text-xl"
            />
          </button>
        </div>
      </SectionCollapse>
      <InputTextArea
        id="notes_one"
        name="notes_one"
        value={nursingFields.medicalInfo.notes_one}
        onChange={onMedicalInfoChange}
        placeholder="Actions Indicated - Medical Information - 1"
      />
      <InputTextArea
        id="notes_two"
        name="notes_two"
        value={nursingFields.medicalInfo.notes_two}
        onChange={onMedicalInfoChange}
        placeholder="Actions Indicated - Medical Information - 2"
      />
    </>
  );
};

export default Step2;
