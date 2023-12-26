import {
  InputCollapse,
  InputPlain,
  SectionCollapse,
  SelectPlain,
  SpinnerLarge,
  TextMd,
} from "@/components/commons";
import { frequencies, images } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { PlanOfCareContext } from "@/context/planOfCare";
import { useNursingAssessment } from "@/hooks/nursingAssessment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const Step2 = ({ consumer }) => {
  const {
    careFields,
    onGenericChange,
    onFunctionalLimitationsChange,
    onCaresChange,
    onCaresFrequenciesChange,
    onBathsChange,
    onBathsGenericChange,
    onHairCareChange,
    onHairCareGenericChange,
    onToiletingsChange,
    onToiletingsGenericChange,
    onIncontinentChange,
    onIncontinentGenericChange,
  } = useContext(PlanOfCareContext);
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const { read: readAssessment } = useNursingAssessment();

  // States
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clientsFunctionalLimitations = [
    "Hearing",
    "Speech",
    "Vision",
    "Mobility",
    "Swallowing",
    "Breathing",
    "Cognition",
    "Performing Activities of Daily Living",
  ];

  const specialDiet = ["Yes", "No"];
  const allergies = ["Yes", "No"];

  const personalCare = [
    "Brush Teeth",
    "Clean Hearing Aid(s)",
    "Clean Nasal Cannula",
    "Shave (Electric)",
    "Routine Skin Care",
    "Dressing/Undressing",
    "Nail Care (Filing,DO NOT CUT)",
    "Foot Care",
  ];

  const baths = ["Bed", "Sponge", "Tub", "Shower"];
  const toiletings = [
    "Toilet",
    "Bedside Commode",
    "Bedpan",
    "Urinal",
    "Toilet Hygiene",
  ];
  const hairCare = ["Wash", "Shampoo"];
  const incontinentCare = ["Changing Diapers", "Skin Care"];

  // Function to read the selected consumer assessment
  const getAssessment = async () => {
    const { data } = await readAssessment(consumer?._id, user.token);
    setAssessment(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getAssessment();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <SpinnerLarge />
        </div>
      ) : (
        <>
          <SectionCollapse title="Client's Functional Limitations">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <InputCollapse
                  type="checkboxes"
                  checkboxes={clientsFunctionalLimitations}
                  heading="Select Limitations"
                  checkBoxesValue={careFields.functionalLimitations}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onFunctionalLimitationsChange
                      : null
                  }
                  namePrefix="functional_limitation"
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <InputCollapse
                  type="radios"
                  radios={allergies}
                  radioValue={careFields.allergies}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onGenericChange
                      : null
                  }
                  heading="Select Allergy(ies)"
                  radioName="allergies"
                />
                <div className="my-3">
                  {careFields.allergies === "Yes" && (
                    <InputPlain
                      placeholder="Medication Allergies"
                      id="medication_allergies"
                      type="text"
                      name="medication_allergies"
                      value={careFields.medication_allergies}
                      isDisabled={
                        user.type === "aid" || user.type === "consumer"
                      }
                      onChange={onGenericChange}
                    />
                  )}
                </div>
                <div className="my-4">
                  {careFields.allergies === "Yes" && (
                    <InputPlain
                      placeholder="Write Something..."
                      id="allergies_no"
                      type="text"
                      name="allergies_no"
                      value={careFields.allergies_no}
                      onChange={
                        user.type === "admin" || user.type === "nurse"
                          ? onGenericChange
                          : null
                      }
                    />
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <InputCollapse
                  type="radios"
                  radios={specialDiet}
                  radioValue={careFields.special_diet}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onGenericChange
                      : null
                  }
                  heading="Special diet and /or Nutritional Needs"
                  radioName="special_diet"
                />
                <div className="my-3">
                  {careFields.special_diet === "Yes" && (
                    <InputPlain
                      placeholder="Special diet and /or Nutritional Needs"
                      id="special_diet_text"
                      type="text"
                      name="special_diet_text"
                      value={careFields.special_diet_text}
                      isDisabled={
                        user.type === "aid" || user.type === "consumer"
                      }
                      onChange={onGenericChange}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                <Image
                  src={images.height}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  isDisabled={true}
                  noIcon
                  placeholder="Height"
                  postFixText="Ft"
                  id="height_feet"
                  type="number"
                  name="height_feet"
                  value={assessment?.medicalInfo?.height_feet}
                />
                <Image
                  src={images.height}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  isDisabled={true}
                  noIcon
                  placeholder="Height"
                  postFixText="In"
                  id="height_inch"
                  type="number"
                  name="height_inch"
                  value={assessment?.medicalInfo?.height_inch}
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                <Image
                  src={images.weight}
                  width={400}
                  className="w-12 h-12"
                  height={400}
                  alt="Loading..."
                  priority
                />
                <InputPlain
                  placeholder={"Weight"}
                  noIcon
                  id="weight"
                  postFixText="lbs"
                  type="number"
                  name="weight"
                  value={assessment?.medicalInfo?.weight}
                  isDisabled={true}
                />
              </div>
            </div>
          </SectionCollapse>
          <SectionCollapse title="Personal Care" isLast>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-3">
                <InputCollapse
                  type="checkboxes"
                  checkboxes={personalCare}
                  checkBoxesValue={careFields.personalCare.cares}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onCaresChange
                      : null
                  }
                  heading="Select Cares"
                  namePrefix="care"
                />
              </div>
              <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
                <div className="shadow border border-gray-300 rounded-lg p-3">
                  <TextMd text="Frequencies" classes="font-medium" />
                </div>
                {personalCare.map((care) => {
                  const id =
                    care.toLowerCase().split(" ").join("_") + "_frequency";
                  return (
                    <SelectPlain
                      key={care}
                      id={id}
                      name={id}
                      isDisabled={
                        user.type === "aid" || user.type === "consumer"
                      }
                      placeholder={care}
                      options={frequencies}
                      value={careFields.personalCare.cares.frequencies[id]}
                      onChange={onCaresFrequenciesChange}
                      padding="p-0.5"
                    />
                  );
                })}
              </div>
              <div className="col-span-12 md:col-span-3">
                <InputCollapse
                  type="checkboxes"
                  checkboxes={baths}
                  checkBoxesValue={careFields.personalCare.baths}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onBathsChange
                      : null
                  }
                  heading="Select Baths"
                  namePrefix="care"
                />
                <div className="mt-4">
                  <SelectPlain
                    id="bath_frequency"
                    name="bath_frequency"
                    placeholder="Bath Frequency"
                    isDisabled={user.type === "aid" || user.type === "consumer"}
                    options={frequencies}
                    value={careFields.personalCare.baths.frequency}
                    onChange={onBathsGenericChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3">
                <InputCollapse
                  type="checkboxes"
                  checkboxes={hairCare}
                  checkBoxesValue={careFields.personalCare.hairCare}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onHairCareChange
                      : null
                  }
                  heading="Select Hair Care"
                  namePrefix="care"
                />
                <div className="mt-4">
                  <SelectPlain
                    id="hair_frequency"
                    name="hair_frequency"
                    placeholder="Hair Care Frequency"
                    options={frequencies}
                    isDisabled={user.type === "aid" || user.type === "consumer"}
                    value={careFields.personalCare.hairCare.hair_frequency}
                    onChange={onHairCareGenericChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3">
                <InputCollapse
                  type="checkboxes"
                  checkboxes={toiletings}
                  checkBoxesValue={careFields.personalCare.toiletings}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onToiletingsChange
                      : null
                  }
                  heading="Select Toileting"
                  namePrefix="care"
                />
                <div className="mt-4">
                  <SelectPlain
                    id="toileting_frequency"
                    name="toileting_frequency"
                    placeholder="Toileting Frequency"
                    options={frequencies}
                    isDisabled={user.type === "aid" || user.type === "consumer"}
                    value={
                      careFields.personalCare.toiletings.toileting_frequency
                    }
                    onChange={onToiletingsGenericChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3">
                <InputCollapse
                  type="checkboxes"
                  checkBoxesValue={careFields.personalCare.incontinent}
                  onChange={
                    user.type === "admin" || user.type === "nurse"
                      ? onIncontinentChange
                      : null
                  }
                  checkboxes={incontinentCare}
                  heading="Select Incontinent Care"
                  namePrefix="care"
                />
                <div className="mt-4">
                  <SelectPlain
                    id="incontinent_frequency"
                    name="incontinent_frequency"
                    isDisabled={user.type === "aid" || user.type === "consumer"}
                    placeholder="Incontinent Frequency"
                    options={frequencies}
                    value={
                      careFields.personalCare.incontinent.incontinent_frequency
                    }
                    onChange={onIncontinentGenericChange}
                  />
                </div>
              </div>
            </div>
          </SectionCollapse>
        </>
      )}
    </>
  );
};

export default Step2;
