import {
  InputCollapse,
  InputPlain,
  InputTextArea,
  SectionCollapse,
  SelectPlain,
  TextMd,
} from "@/components/commons";
import { frequencies } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { PlanOfCareContext } from "@/context/planOfCare";
import React, { useContext } from "react";

const Step4 = () => {
  // Context
  const { onHomeMakingTaskChange, onOtherHomeMakingTaskChange, careFields } =
    useContext(PlanOfCareContext);
  const { user } = useContext(AuthContext);
  const homemakingTasks = ["Make Bed", "Change Linen", "Laundry", "Other"];

  const homeMakingFrequencies = [
    "Make Bed",
    "Change Linen",
    "Laundry",
    "Other",
  ];

  const lightHouseKeepings = [
    "Vaccum/Sweep Floors",
    "Dust Furniture",
    "Clean Oven/Microwave",
    "Wet Mop Floors",
    "Clean Kitchen Surfaces",
    "Clean Bathroom Sink",
    "Clean Bathtub/Shower",
    "Clean Toilet",
  ];

  return (
    <div>
      <SectionCollapse title="HOMEMAKING TASKS">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="checkboxes"
              checkboxes={homemakingTasks}
              checkBoxesValue={careFields.homemakingTasks}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onHomeMakingTaskChange
                  : null
              }
              heading="Select Home Making Tasks"
              namePrefix="home_making_task"
            />
            {/* Only Show When No Is Selected In Dentist Visit */}
            {careFields.homemakingTasks.home_making_task_other && (
              <div className="my-4">
                <InputPlain
                  id="home_making_task_other_text"
                  placeholder="Other"
                  name="home_making_task_other_text"
                  onChange={onOtherHomeMakingTaskChange}
                  value={
                    careFields?.homemakingTasks?.home_making_task_other_text
                  }
                />
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
            <div className="shadow border border-gray-300 rounded-lg p-3">
              <TextMd text="Frequencies" classes="font-medium" />
            </div>
            {homeMakingFrequencies.map((home) => {
              const id = home.toLowerCase().split(" ").join("_") + "_frequency";
              return (
                <SelectPlain
                  key={home}
                  id={id}
                  name={id}
                  placeholder={home}
                  padding="p-1"
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  options={frequencies}
                  value={careFields.homemakingTasks[id]}
                  onChange={onOtherHomeMakingTaskChange}
                />
              );
            })}
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="checkboxes"
              checkboxes={lightHouseKeepings}
              checkBoxesValue={careFields.homemakingTasks}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onHomeMakingTaskChange
                  : null
              }
              heading="Select Light Housekeeping"
              namePrefix="home_making_task"
            />
            <div className="mt-4">
              <SelectPlain
                id="light_housekeeping_frequency"
                name="light_housekeeping_frequency"
                placeholder="Select Light Housekeeping Frequency"
                options={frequencies}
                isDisabled={user.type === "aid" || user.type === "consumer"}
                value={
                  careFields.homemakingTasks["light_housekeeping_frequency"]
                }
                onChange={onOtherHomeMakingTaskChange}
              />
            </div>
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Notes/Comments" isLast>
        <InputTextArea
          id="homemaking_noted"
          name="homemaking_noted"
          isDisabled={user.type === "aid"}
          value={careFields.homemakingTasks.homemaking_noted}
          onChange={
            user.type === "admin" || user.type === "nurse"
              ? onOtherHomeMakingTaskChange
              : null
          }
          placeholder="Write Something..."
        />
      </SectionCollapse>
    </div>
  );
};

export default Step4;
