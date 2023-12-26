import {
  InputCollapse,
  InputRadio,
  SectionCollapse,
  Text2Xl,
  TextLg,
  TextLgFancy,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext } from "react";

const Step6 = () => {
  // Context
  const { onInstrumentalActivitiesChange, nursingFields } = useContext(
    NursingAssessmentContext
  );
  const preparingFoods = [
    "Independent",
    "Adequate if Ingredients Supplied",
    "Can Make or Buy Meals But Diet is Inadequate",
    "Physically or Mentally Unable to Prepare Food",
    "No Opportunity to Prepare Food or Chooses Not to Prepare Food",
  ];
  const houseKeepings = [
    "Independent",
    "Generally Independent But Needs Help With Heavier Tasks",
    "Can Perform Only Light Tasks Adequately",
    "Performs Light Tasks But Not Adequately",
    "Needs Regular Help and/or Supervision",
    "No Opportunity to Do Housework or Chooses Not to Do Housework",
  ];
  const shoppings = [
    "Independent",
    "Independent But For Small Items Only",
    "Can Shop if Accompanied",
    "Physically or Mentally Unable to Shop",
    "No Opportunity to Shop or Chooses Not to Shop",
  ];
  const transportations = [
    "Uses Private Vehicle",
    "Uses Taxi or Bus",
    "Independent",
    "Must be Accompanied",
    "Must be Driven",
    "Physically or Mentally Unable to Travel",
    "Needs Ambulance for Transporting",
  ];
  const telephones = [
    "Independent",
    "Can Dial Well Known Numbers",
    "Answers Telephone Only",
    "Physically or Mentally Unable to Use Telephone",
    "No Opportunity to Use Telephone or Chooses Not to Use Telephone",
  ];
  const medications = [
    "Completely Responsible for Self",
    "Requires Reminder or Assistance",
    "Responsible if Medications Prepared in Blistopax",
    "Physically or Mentally Unable to Take Medications and Conduct Treatments",
    "Resists Taking Medication or Conducting Treatments",
  ];

  return (
    <>
      <SectionCollapse title="Instrumental Activities Of Daily Living" isLast>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.preparing_food
              }
              onChange={onInstrumentalActivitiesChange}
              radios={preparingFoods}
              heading="Preparing Food"
              radioName="preparing_food"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.house_keeping
              }
              onChange={onInstrumentalActivitiesChange}
              radios={houseKeepings}
              heading="House Keeping"
              radioName="house_keeping"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.shopping
              }
              onChange={onInstrumentalActivitiesChange}
              radios={shoppings}
              heading="Shopping"
              radioName="shopping"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.transportation
              }
              onChange={onInstrumentalActivitiesChange}
              radios={transportations}
              heading="Transportation"
              radioName="transportation"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.telephone
              }
              onChange={onInstrumentalActivitiesChange}
              radios={telephones}
              heading="Telephones"
              radioName="telephone"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={
                nursingFields.instrumentalActivitiesOfDailyLiving.medication
              }
              onChange={onInstrumentalActivitiesChange}
              radios={medications}
              heading="Medications/Treatments"
              radioName="medication"
            />
          </div>
        </div>
      </SectionCollapse>
    </>
  );
};

export default Step6;
