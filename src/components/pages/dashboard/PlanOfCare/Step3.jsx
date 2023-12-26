import {
  InputCollapse,
  InputPlain,
  SectionCollapse,
  SelectPlain,
  TextMd,
} from "@/components/commons";
import { frequencies } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { PlanOfCareContext } from "@/context/planOfCare";
import React, { useContext } from "react";

const Step3 = () => {
  // Context
  const {
    onNutritionChange,
    careFields,
    onOtherNutritionChange,
    onActivitiesDevicesChange,
    onOtherActivitiesDevicesChange,
    onRelatedDutiesChange,
    onOtherRelatedDutiesChange,
    onHomeVisitChange,
    onOtherHomeVisitChange,
  } = useContext(PlanOfCareContext);
  const { user } = useContext(AuthContext);

  const mealPreparation = ["Breakfast", "Lunch", "Dinner", "Food For Next Day"];
  const feeding = ["Reinforce Diet", "Serving", "Clean Up"];
  const fluidsRestrict = ["Encourage", "Restrict"];
  const ambulations = ["Walking", "Rollator", "Walker", "Cane", "Wheelchair"];
  const activities = [
    "Complete Bedrest",
    "Turning/Positioning",
    "Transferring",
    "Take Client for Walk",
    "Supervision/Assistance with Exercise and Therapy",
    "Other",
  ];

  const relatedDuties = [
    "Medication Reminding",
    "Pick Up Mall",
    "Grocery Shopping",
    "Trash Management",
    "Other",
  ];

  const homeVisit = [
    "Friendly Home Visit Check",
    "Telephone Check/Monitor",
    "Other",
  ];

  return (
    <div>
      <SectionCollapse title="Nutrition">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              checkboxes={mealPreparation}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onNutritionChange
                  : null
              }
              checkBoxesValue={careFields.nutrition}
              heading="Meal Preparation"
              namePrefix="meal_preparation"
            />
            <div className="mt-4">
              <SelectPlain
                id="meal_preparation_frequency"
                name="meal_preparation_frequency"
                placeholder="Meal Preparation Frequency"
                isDisabled={user.type === "aid" || user.type === "consumer"}
                options={frequencies}
                value={careFields.nutrition.meal_preparation_frequency}
                onChange={onOtherNutritionChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 flex flex-col justify-between">
            <InputCollapse
              type="checkboxes"
              checkboxes={feeding}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onNutritionChange
                  : null
              }
              checkBoxesValue={careFields.nutrition}
              heading="Select Feedings"
              namePrefix="feedings"
            />
            <div className="mt-4">
              <SelectPlain
                id="feeding_frequency"
                name="feeding_frequency"
                placeholder="Feeding Frequency"
                isDisabled={user.type === "aid" || user.type === "consumer"}
                options={frequencies}
                value={careFields.nutrition.feeding_frequency}
                onChange={onOtherNutritionChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              checkboxes={fluidsRestrict}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onNutritionChange
                  : null
              }
              checkBoxesValue={careFields.nutrition}
              heading="Select Fluids Restriction"
              namePrefix="fluids"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radios={["Yes", "No"]}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onOtherNutritionChange
                  : null
              }
              radioValue={careFields.nutrition.fluids}
              heading="Select Fluids"
              radioName="fluids"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Other Nutrition"
              id="other_nutrition"
              type="text"
              name="other_nutrition"
              value={careFields.nutrition.other_nutrition}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onOtherNutritionChange
                  : null
              }
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <SelectPlain
              id="other_frequency"
              name="other_frequency"
              placeholder="Other Frequency"
              options={frequencies}
              isDisabled={user.type === "aid" || user.type === "consumer"}
              value={careFields.nutrition.other_frequency}
              onChange={onOtherNutritionChange}
            />
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Activities/Assistive Devices">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="checkboxes"
              checkboxes={ambulations}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onActivitiesDevicesChange
                  : null
              }
              checkBoxesValue={careFields.activitiesDevices}
              heading="Select Ambulations"
              namePrefix="p_of_c_ambulations"
            />
            <div className="mt-4">
              <SelectPlain
                id="ambulation_frequency"
                name="ambulation_frequency"
                isDisabled={user.type === "aid" || user.type === "consumer"}
                placeholder="Ambulation Frequency"
                options={frequencies}
                value={careFields.activitiesDevices.ambulation_frequency}
                onChange={onOtherActivitiesDevicesChange}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="checkboxes"
              checkboxes={activities}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onActivitiesDevicesChange
                  : null
              }
              checkBoxesValue={careFields.activitiesDevices}
              heading="Select Activities"
              namePrefix="p_of_c_ambulations"
            />
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="shadow border border-gray-300 rounded-lg p-3">
              <TextMd text="Frequencies" classes="font-medium" />
            </div>
            {activities.map((activity) => {
              const id =
                activity.toLowerCase().split(" ").join("_") + "_frequency";
              return (
                <SelectPlain
                  key={activity}
                  id={id}
                  name={id}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  placeholder={activity}
                  options={frequencies}
                  value={careFields.activitiesDevices[id]}
                  onChange={onOtherActivitiesDevicesChange}
                  padding="p-0.5"
                />
              );
            })}
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              radios={["Yes", "No"]}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onOtherActivitiesDevicesChange
                  : null
              }
              radioValue={careFields.activitiesDevices.weight_restriction}
              heading="Weight Bearing Restriction"
              radioName="weight_restriction"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              radios={["Yes", "No"]}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onOtherActivitiesDevicesChange
                  : null
              }
              radioValue={careFields.activitiesDevices.bed_rest_with_bath}
              heading="Bedrest with Bathroom Previleges"
              radioName="bed_rest_with_bath"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              radios={["Yes", "No"]}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onOtherActivitiesDevicesChange
                  : null
              }
              radioValue={careFields.activitiesDevices.tolerated}
              heading="Up As Tolerated"
              radioName="tolerated"
            />
          </div>
          {/* <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Other Nutrition"
              id="other_nutrition"
              type="text"
              name="other_nutrition"
              onChange={user.type === "admin" || user.type === "nurse" ? null:null}
              onBlur={null}
            />
          </div> */}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Related Duties">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              checkboxes={relatedDuties}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onRelatedDutiesChange
                  : null
              }
              checkBoxesValue={careFields.relatedDuties}
              heading="Select Duties"
              namePrefix="duties"
            />
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <div className="shadow border border-gray-300 rounded-lg p-3">
              <TextMd text="Frequencies" classes="font-medium" />
            </div>
            {relatedDuties.map((duty) => {
              const id = duty.toLowerCase().split(" ").join("_") + "_frequency";
              return (
                <SelectPlain
                  key={duty}
                  id={id}
                  name={id}
                  placeholder={duty}
                  options={frequencies}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  value={careFields.relatedDuties[id]}
                  onChange={onOtherRelatedDutiesChange}
                  padding="p-0.5"
                />
              );
            })}
          </div>

          {careFields.relatedDuties.duties_other && (
            <div className="col-span-12 md:col-span-6">
              <InputPlain
                placeholder="Other Related Duties"
                id="other_related_duties"
                type="text"
                name="other_related_duties"
                onChange={
                  user.type === "admin" || user.type === "nurse"
                    ? onOtherRelatedDutiesChange
                    : null
                }
                value={careFields.relatedDuties.other_related_duties}
              />
            </div>
          )}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Home Visit" isLast>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              checkBoxesValue={careFields.homeVisit}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onHomeVisitChange
                  : null
              }
              checkboxes={homeVisit}
              heading="Select Home Related"
              namePrefix="home_related"
            />
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <div className="shadow border border-gray-300 rounded-lg p-3">
              <TextMd text="Frequencies" classes="font-medium" />
            </div>
            {homeVisit.map((visit) => {
              const id =
                visit.toLowerCase().split(" ").join("_") + "_frequency";
              return (
                <SelectPlain
                  key={visit}
                  id={id}
                  name={id}
                  placeholder={visit}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  options={frequencies}
                  value={careFields.homeVisit[id]}
                  onChange={onOtherHomeVisitChange}
                  padding="p-0.5"
                />
              );
            })}
          </div>
          {careFields.homeVisit.home_related_other && (
            <div className="col-span-12 md:col-span-6">
              <InputPlain
                placeholder="Other Home Related"
                id="other_home_related"
                type="text"
                name="other_home_related"
                onChange={
                  user.type === "admin" || user.type === "nurse"
                    ? onOtherHomeVisitChange
                    : null
                }
                value={careFields.homeVisit.other_home_related}
              />
            </div>
          )}
        </div>
      </SectionCollapse>
    </div>
  );
};

export default Step3;
