import {
  InputTextArea,
  SectionCollapse,
  SpinnerLarge,
  TextLg,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext, useEffect, useState } from "react";
const Step5 = ({ consumer }) => {
  // States
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Context
  const { readNursingAssessment } = useContext(NursingAssessmentContext);
  const getAssessment = async () => {
    const { data } = await readNursingAssessment(consumer._id);
    setMedications(data?.medications || []);
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
          {medications.map((field, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-12 gap-2 border-dotted border-b-2 border-purple-800 mb-3"
              >
                <div className="col-span-12 md:col-span-6">
                  <InputTextArea
                    label="Medication"
                    id="medication"
                    isDisabled={true}
                    value={field.medication}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <InputTextArea
                    label="Dose"
                    isDisabled={true}
                    id="dose"
                    value={field.dose}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <InputTextArea
                    label="Frequency"
                    id="frequency"
                    isDisabled={true}
                    value={field.frequency}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <InputTextArea
                    label="Route"
                    isDisabled={true}
                    id="route"
                    value={field.route}
                  />
                </div>
              </div>
            );
          })}
        </SectionCollapse>
      )}
      {/* <div className="text-end">
        <button type="button" onClick={() => onAddMedication()}>
          <IconPlain
            iconClass="fa-plus !bg-[#523178] border-4 rounded-full ml-auto"
            wrapperSize="w-14 h-14"
            size="text-xl"
          />
        </button>
      </div> */}
    </>
  );
};

export default Step5;
