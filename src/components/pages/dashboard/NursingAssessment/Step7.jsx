import {
  InputCollapse,
  InputPlain,
  InputTextArea,
  SectionCollapse,
  TextLgFancy,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext } from "react";

const Step7 = () => {
  const {
    nursingFields,
    onAttendantProfileGenericChange,
    onAttendantProfileCheckboxesChange,
    onSocialProfileGenericChange,
    onGenericChange,
  } = useContext(NursingAssessmentContext);
  const housings = [
    "House",
    "Apartment",
    "Condominium",
    "Mobile Home",
    "Room",
    "Facility",
    "Other",
  ];
  const housingArea = ["Urban", "Rural"];
  const housingOwnership = ["Self Owned", "Rental"];

  const livingCompanions = [
    "Lives Alone",
    "Lives with Spouse or Spousal Equivalent",
    "Lives With Adult Children",
    "Lives With Child(ren)",
    "Lives with Other Adult Male",
    "Lives with Other Adult Female",
    "Principal Helper",
  ];

  const attendants = ["Independent", "Needs an Attendant"];
  const frequencyAttendantAssistance = [
    "Intermittent",
    "Constantly",
    "During Day",
    "During Night",
  ];
  const attendantNeedsMeetBy = ["Spouse", "Friend", "Family", "Other"];

  return (
    <>
      <SectionCollapse title="Attendant Profile">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              checkBoxesValue={nursingFields.attendantProfile.attendants}
              onChange={onAttendantProfileCheckboxesChange}
              checkboxes={attendants}
              heading="Attendant"
              namePrefix="attendant"
            />
          </div>
          {nursingFields.attendantProfile.attendants
            .attendant_needs_an_attendant && (
            <div className="col-span-12 md:col-span-6">
              <InputCollapse
                type="radios"
                radioValue={
                  nursingFields.attendantProfile.attendant_needs_met_by
                }
                onChange={onAttendantProfileGenericChange}
                radios={attendantNeedsMeetBy}
                heading="Attendant Needs Met by"
                radioName="attendant_needs_met_by"
              />
            </div>
          )}
          {nursingFields.attendantProfile.attendants
            .attendant_needs_an_attendant && (
            <div className="col-span-12 md:col-span-6">
              <InputCollapse
                type="radios"
                radioValue={
                  nursingFields.attendantProfile
                    .frequency_of_attendant_assistance
                }
                onChange={onAttendantProfileGenericChange}
                radios={frequencyAttendantAssistance}
                heading="Frequency of Attendant Assistance"
                radioName="frequency_of_attendant_assistance"
              />
            </div>
          )}
          <div className="col-span-12 md:col-span-6">
            {nursingFields.attendantProfile.attendant_needs_met_by ===
              "Other" && (
              <InputPlain
                placeholder="Other Attendant"
                id="other_attendant"
                type="text"
                name="other_attendant"
                value={nursingFields.attendantProfile.other_attendant}
                onChange={onAttendantProfileGenericChange}
              />
            )}
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Social Profile">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.socialProfile.housing}
              onChange={onSocialProfileGenericChange}
              radios={housings}
              heading="Housing"
              radioName="housing"
            />
            {nursingFields.socialProfile.housing == "Other" && (
              <div className="my-5">
                <InputPlain
                  placeholder="Other Housing"
                  id="other_housing"
                  type="text"
                  name="other_housing"
                  onChange={onSocialProfileGenericChange}
                  value={nursingFields.socialProfile.other_housing}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="radios"
                radioValue={nursingFields.socialProfile.living_companion}
                onChange={onSocialProfileGenericChange}
                radios={livingCompanions}
                heading="Living Companions"
                radioName="living_companion"
              />
            </div>
            <div>
              {nursingFields.socialProfile.living_companion ===
                "Principal Helper" && (
                <InputPlain
                  placeholder="Principal Helper"
                  id="principal_helper"
                  type="text"
                  name="principal_helper"
                  onChange={onSocialProfileGenericChange}
                  value={nursingFields.socialProfile.principal_helper}
                />
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.socialProfile.housing_area}
              onChange={onSocialProfileGenericChange}
              radios={housingArea}
              heading="Housing Area"
              radioName="housing_area"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.socialProfile.housing_ownership}
              onChange={onSocialProfileGenericChange}
              radios={housingOwnership}
              heading="Housing Ownership"
              radioName="housing_ownership"
            />
          </div>

          <div className="flex flex-col justify-between col-span-12 md:col-span-4">
            <TextLgFancy
              text="Religion And Ethnicity"
              classes="font-semibold"
            />
            <div className="my-2">
              <InputPlain
                placeholder="Religion"
                id="religion"
                type="text"
                name="religion"
                onChange={onSocialProfileGenericChange}
                value={nursingFields.socialProfile.religion}
              />
            </div>
            <div class="my-2">
              <InputPlain
                placeholder="Ethnicity"
                id="ethnicity"
                type="text"
                name="ethnicity"
                onChange={onSocialProfileGenericChange}
                value={nursingFields.socialProfile.ethnicity}
              />
            </div>
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Orders For Discipline" isLast>
        <InputTextArea
          placeholder="Orders for Discipline and Treatments (Specify Amount/Frequency/Duration)"
          id="orders_for_discipline"
          name="orders_for_discipline"
          onChange={onGenericChange}
          value={nursingFields.orders_for_discipline}
        />
      </SectionCollapse>
    </>
  );
};
export default Step7;
