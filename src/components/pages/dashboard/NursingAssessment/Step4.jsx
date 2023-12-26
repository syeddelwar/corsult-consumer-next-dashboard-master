import {
  InputCollapse,
  InputPlain,
  InputTextArea,
  SectionCollapse,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext } from "react";

const Step4 = () => {
  // Context
  const {
    nursingFields,

    onSmokingHabitsChange,
    onAlcoholConsumptionChange,
    onDietsChange,
    onGenericDietChange,
    onEatingHabitsChange,
    onMedicalInfoChange,
    onGenericChange,
  } = useContext(NursingAssessmentContext);

  const eatingHabits = ["Good", "Fair", "Poor"];
  const clientSmokes = ["Yes", "No"];
  const smokesDegreeOfProblem = ["No Problem", "Some Problem", "Major Problem"];
  const clientDrinks = ["Yes", "No"];
  const drinksDegreeOfProblem = ["No Problem", "Some Problem", "Major Problem"];

  const diets = [
    "Regular",
    "Low Salt",
    "Diabetic",
    "Vegetarian",
    "Low Fat",
    "Other",
  ];

  return (
    <>
      <SectionCollapse title="Smoking Habits">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.smokingHabits.client_smokes}
              onChange={onSmokingHabitsChange}
              radios={clientSmokes}
              heading="Client Smokes"
              radioName="client_smokes"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.smokingHabits.smokes_degree_of_problem}
              onChange={onSmokingHabitsChange}
              radios={smokesDegreeOfProblem}
              heading="Degree Of Problem"
              radioName="smokes_degree_of_problem"
            />
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Alcohol Consumption">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.alcoholConsumption.client_drinks}
              onChange={onAlcoholConsumptionChange}
              heading="Client Drinks"
              radios={clientDrinks}
              radioName="client_drinks"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.alcoholConsumption.drinks_degree_of_problem
              }
              onChange={onAlcoholConsumptionChange}
              heading="Degree Of Problem"
              radios={drinksDegreeOfProblem}
              radioName="drinks_degree_of_problem"
            />
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Current Diet">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              onChange={onDietsChange}
              checkBoxesValue={nursingFields.diets}
              heading="Select Diets"
              checkboxes={diets}
              namePrefix="diet"
            />
          </div>
          <div className="flex flex-col gap-3 col-span-12 md:col-span-6">
            {nursingFields.diets.diet_other && (
              <InputPlain
                placeholder="Other Diet"
                id="other_diet"
                type="text"
                name="other_diet"
                value={nursingFields.diets.other_diet}
                onChange={onGenericDietChange}
              />
            )}
            <InputPlain
              placeholder="Takes Supplement (E.g. Ensure)"
              id="client_takes_supplement"
              type="text"
              name="client_takes_supplement"
              value={nursingFields.diets.client_takes_supplement}
              onChange={onGenericDietChange}
            />
            <InputPlain
              placeholder="Nutritional Requirement:"
              id="client_nutritional_requirements"
              type="text"
              name="client_nutritional_requirements"
              value={nursingFields.diets.client_nutritional_requirements}
              onChange={onGenericDietChange}
            />
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Eating Habits" isLast>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.eatingHabits.eating_habit}
              onChange={onEatingHabitsChange}
              heading="Select A Habit"
              radios={eatingHabits}
              radioName="eating_habit"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <InputTextArea
              id="eating_habits_comment"
              name="eating_habits_comment"
              value={nursingFields.eatingHabits.eating_habits_comment}
              onChange={onEatingHabitsChange}
              placeholder="Comments"
            />
          </div>
        </div>
      </SectionCollapse>

      <InputTextArea
        id="notes_living_habits"
        name="notes_living_habits"
        value={nursingFields.notes_living_habits}
        onChange={onGenericChange}
        placeholder="Actions Indicated - Living Habits"
      />
    </>
  );
};

export default Step4;
