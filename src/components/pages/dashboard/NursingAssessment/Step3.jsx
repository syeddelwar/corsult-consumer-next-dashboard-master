import {
  InputRadio,
  InputPlain,
  TextMd,
  SectionCollapse,
  InputCollapse,
  InputTextArea,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext } from "react";

const Step3 = () => {
  // Contexts
  const {
    nursingFields,
    onMedicalInfoChange,
    onDentalCareChange,
    onDentalStateChange,
    onGenericChange,
    onVisionChange,
    onVisionVisionsChange,
    onHearingChange,
    onHearingHearingsChange,
    onAttitudesChange,
    onAppearancesChange,
    onSelfDirectionChange,
    onBehaviorsChange,
    onInfluencesChange,
    onThoughtContentChange,
    onPerceptionsChange,
    onCognitionsChange,
    onInsightsChange,
    onJudgementChange,
  } = useContext(NursingAssessmentContext);

  const attitudes = [
    "Cooperative",
    "Indifferent",
    "Resistive",
    "Demanding",
    "Suspicious",
    "Hostile",
  ];
  const appearances = [
    "Well Groomed",
    "Adequate",
    "Disheveled",
    "Inappropriately Dressed",
    "Not Dressed",
  ];
  const selfDirection = [
    "Independent",
    "Needs Motivation",
    "Dependent",
    "Needs Direction",
  ];
  const behaviors = [
    "Normal",
    "Wandering",
    "Sun downing",
    "Restless",
    "Hostile",
    "Withdrawn",
    "Self Destructive",
    "Safety Hazard",
    "Aggressive",
    "Verbal",
    "Physical",
  ];
  const influences = [
    "Appropriate",
    "Inappropriate",
    "Anxious",
    "Blunted",
    "Euphoric",
    "Depressed",
    "Angry",
    "Mood Swings",
  ];
  const thoughtContent = [
    "Normal",
    "Cant Assess",
    "Delusions",
    "Obsessions",
    "Phobias",
    "Persecutory",
    "Guilt",
  ];
  const perceptions = [
    "Normal",
    "Hallucinations",
    "Auditory",
    "Visual",
    "Other",
  ];
  const cognitions = ["Normal", "Impairment", "Mild", "Moderate", "Severe"];
  const insights = ["Good", "Partial", "None"];
  const judgements = ["Good", "Adequate", "Poor"];

  const prognosis = ["Poor", "Guarded", "Fair", "Good", "Excellent"];
  const dentalState = [
    "No Dentures",
    "Dentures Damaged",
    "Full Upper",
    "Full Lower",
    "Partial Denture",
    "Not Wearing Dentures",
    "No Teeth",
  ];
  const visions = [
    "Unimpaired",
    "Blind - Safe In Familiar Locale",
    "Adequate For Personal Safety",
    "Blind - Requires Assistance",
    "Distinguishes Only Light Or Dark",
  ];
  const hearings = [
    "Unimpaired",
    "Mild Impairment",
    "Moderate Impairment But Not a Threat to Safety",
    "Impaired - Safety threat exists",
    "Totally Deaf",
  ];

  const haveDentalProblems = ["Yes", "No"];
  const careOfDentist = ["Yes", "No"];

  const canClientChew = ["Yes", "No"];

  const dentistVisit = ["Current", "No"];
  const ophthalmologistVisit = ["Current", "No"];

  const wearGlasses = ["Yes", "No"];

  const usesHearingAids = ["Yes", "No", "Left Ear", "Right Ear"];
  const entsVisit = ["Current", "No"];

  return (
    <>
      <div className="flex flex-col items-start md:flex-row md:items-center gap-3 mb-4">
        <TextMd classes="font-bold" text="Prognosis:" />
        {prognosis.map((item) => {
          return (
            <InputRadio
              key={item}
              id={item}
              value={item}
              name="prognosis"
              onChange={onGenericChange}
              label={item}
              isChecked={item == nursingFields.prognosis}
            />
          );
        })}
      </div>
      <SectionCollapse title="Medication And Safety">
        <div className="grid grid-cols-12 gap-3 mb-2">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Medication Allergies Food and Other"
              id="medication_allergies"
              type="text"
              name="medication_allergies"
              onChange={onGenericChange}
              value={nursingFields.medication_allergies}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Safety Measures"
              id="safety_measures"
              type="text"
              name="safety_measures"
              onChange={onGenericChange}
              value={nursingFields.safety_measures}
            />
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Dental Care">
        <div className="grid grid-cols-12 gap-3 mb-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onDentalCareChange}
              radioValue={nursingFields.dentalCare.dental_problem}
              heading="Does client have dental problems?"
              radios={haveDentalProblems}
              radioName="dental_problem"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onDentalCareChange}
              radioValue={nursingFields.dentalCare.care_of_dentist}
              heading="Is client under care of dentist?"
              radios={careOfDentist}
              radioName="care_of_dentist"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 my-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              onChange={onDentalStateChange}
              checkBoxesValue={nursingFields.dentalCare.dentalState}
              heading="Dental State"
              checkboxes={dentalState}
              namePrefix="dental_state"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              onChange={onDentalCareChange}
              type="radios"
              radioValue={nursingFields.dentalCare.client_chew}
              heading="Can client chew food effectively?"
              radios={canClientChew}
              radioName="client_chew"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-4 border-b-2 pb-4">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Dentist Name"
              id="dentist_name"
              type="text"
              name="dentist_name"
              onChange={onDentalCareChange}
              value={nursingFields.dentalCare.dentist_name}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Dentist Phone Number"
              id="dentist_phone_no"
              type="text"
              name="dentist_phone_no"
              onChange={onDentalCareChange}
              value={nursingFields.dentalCare.dentist_phone_no}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-4">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onDentalCareChange}
              radioValue={nursingFields.dentalCare.dental_visit}
              heading="Dentist Visit"
              radios={dentistVisit}
              radioName="dental_visit"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            {/* Only Show When No Is Selected In Dentist Visit */}
            {nursingFields.dentalCare.dental_visit === "No" && (
              <InputPlain
                id="dentist_next_appointment"
                label="Dentist Next Appointment Date"
                type="date"
                name="dentist_next_appointment"
                onChange={onDentalCareChange}
                value={nursingFields.dentalCare.dentist_next_appointment}
              />
            )}
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Vision">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              onChange={onVisionVisionsChange}
              checkBoxesValue={nursingFields.vision.vision}
              heading="Select Vision"
              checkboxes={visions}
              namePrefix="vision"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onVisionChange}
              radioValue={nursingFields.vision.wear_glasses}
              heading="Wears Glasses"
              radios={wearGlasses}
              radioName="wear_glasses"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-4 border-b-2 pb-4">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Ophthalmologist Name"
              id="ophthalmologist_name"
              type="text"
              name="ophthalmologist_name"
              value={nursingFields.vision.ophthalmologist_name}
              onChange={onVisionChange}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="Ophthalmologist Phone Number"
              id="ophthalmologist_phone_no"
              type="text"
              name="ophthalmologist_phone_no"
              value={nursingFields.vision.ophthalmologist_phone_no}
              onChange={onVisionChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-4">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onVisionChange}
              radioValue={nursingFields.vision.ophthalmologist_visit}
              heading="Ophthalmologist Visit"
              radios={ophthalmologistVisit}
              radioName="ophthalmologist_visit"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            {/* Only Show When No Is Selected In Ophthalmologist Visit */}
            {nursingFields.vision.ophthalmologist_visit === "No" && (
              <InputPlain
                id="ophthalmologist_next_appointment"
                label="Ophthalmologist Next Appointment"
                type="date"
                name="ophthalmologist_next_appointment"
                onChange={onVisionChange}
                value={nursingFields.vision.ophthalmologist_next_appointment}
              />
            )}
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Hearing">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="checkboxes"
              onChange={onHearingHearingsChange}
              checkBoxesValue={nursingFields.hearing.hearing}
              heading="Select Hearing"
              checkboxes={hearings}
              namePrefix="hearing"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onHearingChange}
              radioValue={nursingFields.hearing.uses_hearing_aids}
              heading="Uses Hearing Aid(s)"
              radios={usesHearingAids}
              radioName="uses_hearing_aids"
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 my-4 border-b-2 pb-4">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="ENT's Name"
              id="ent_name"
              type="text"
              name="ent_name"
              value={nursingFields.hearing.ent_name}
              onChange={onHearingChange}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="ENT's Phone Number"
              id="ent_phone_no"
              type="text"
              name="ent_phone_no"
              value={nursingFields.hearing.ent_phone_no}
              onChange={onHearingChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-3 my-4">
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              onChange={onHearingChange}
              radioValue={nursingFields.hearing.ent_visit}
              heading="Ent's Visit"
              radios={entsVisit}
              radioName="ent_visit"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            {/* Only Show When No Is Selected In Ents Visit */}
            {nursingFields.hearing.ent_visit === "No" && (
              <InputPlain
                id="ents_next_appointment"
                label="Ent Next Appointment"
                type="date"
                name="ent_next_appointment"
                onChange={onHearingChange}
                value={nursingFields.hearing.ent_next_appointment}
              />
            )}
          </div>
        </div>
      </SectionCollapse>
      <SectionCollapse title="Mental Health" isLast>
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              onChange={onAttitudesChange}
              checkBoxesValue={nursingFields.mentalHealth.attitudes}
              checkboxes={attitudes}
              heading="Attitude"
              namePrefix="attitude"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.appearances}
              onChange={onAppearancesChange}
              radios={appearances}
              heading="Appearances"
              radioName="appearance"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.selfDirection}
              onChange={onSelfDirectionChange}
              radios={selfDirection}
              heading="Self Direction"
              radioName="self_direction"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              onChange={onBehaviorsChange}
              checkBoxesValue={nursingFields.mentalHealth.behaviors}
              checkboxes={behaviors}
              heading="Behaviors"
              namePrefix="behavior"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              onChange={onInfluencesChange}
              checkBoxesValue={nursingFields.mentalHealth.influences}
              checkboxes={influences}
              heading="Influences"
              namePrefix="influence"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.thoughtContent}
              onChange={onThoughtContentChange}
              radios={thoughtContent}
              heading="Thought Content"
              radioName="thought_content"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="checkboxes"
              onChange={onPerceptionsChange}
              checkBoxesValue={nursingFields.mentalHealth.perceptions}
              checkboxes={perceptions}
              heading="Perceptions"
              namePrefix="perception"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.cognitions}
              onChange={onCognitionsChange}
              radios={cognitions}
              heading="Cognitions"
              radioName="cognition"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.insights}
              onChange={onInsightsChange}
              radios={insights}
              heading="Insights"
              radioName="insight"
            />
          </div>
          <div className="col-span-12 md:col-span-3">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.mentalHealth.judgement}
              onChange={onJudgementChange}
              radios={judgements}
              heading="Judgement"
              radioName="judgement"
            />
          </div>
        </div>
      </SectionCollapse>

      <InputTextArea
        id="notes_three"
        name="notes_three"
        value={nursingFields.medicalInfo.notes_three}
        onChange={onMedicalInfoChange}
        placeholder="Actions Indicated - Medical Information - 3"
      />
      <InputTextArea
        id="notes_four"
        name="notes_four"
        value={nursingFields.medicalInfo.notes_four}
        onChange={onMedicalInfoChange}
        placeholder="Actions Indicated - Medical Information - 4"
      />
    </>
  );
};

export default Step3;
