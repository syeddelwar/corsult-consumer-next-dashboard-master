import {
  InputCheckbox,
  InputCollapse,
  InputPlain,
  InputRadio,
  InputTextArea,
  SectionCollapse,
  TextLgFancy,
  TextSm,
} from "@/components/commons";
import { NursingAssessmentContext } from "@/context/nursingAssessment/NursingAssessmentState";
import React, { useContext } from "react";

const Step5 = () => {
  // Context
  const {
    onGenericChange,
    nursingFields,
    onLanguagesChange,
    onOtherLanguagesChange,
    onCommunicationChange,
    onMobilityAidsChange,
    onOtherMobilityAidsChange,
    onActivitiesOfDailyLivingChange,
    onActivitiesOfDailyLivingCheckboxChange,
    onTransferringChange,
    onBathingChange,
    onOtherBathingChange,
    onDressingChange,
    onGroomingAndHygieneChange,
    onToiletingChange,
    onOtherToiletingChange,
    onExercisingChange,
    onAboutExercisingChange,
    onTransferringGenericChange,
  } = useContext(NursingAssessmentContext);
  const langs = [
    "English",
    "Italian",
    "French",
    "Spanish",
    "Chinese",
    "Russian",
    "Japanese",
    "East Indian",
    "Other",
  ];
  const speechs = [
    "Unimpaired",
    "Simple Phrases - Understandable",
    "Simple Phrases - Partially Understandable",
    "Isolated Words - Understandable",
    "Speech Not Understandable Or Does Not Make Sense",
    "Does Not Speak",
  ];

  const speechMethods = [
    "Effective",
    "Partially Effective",
    "Moderately Effective",
    "Not Effective",
  ];
  const speechUnderstandings = [
    "Unimpaired",
    "Understands Simple Phrases",
    "Understands Key Words Only",
    "Understanding Unknown",
    "Not Responsive",
  ];
  const mobilityAids = [
    "Uses Cane",
    "Uses Walker",
    "Uses Crutches",
    "Uses Manual Wheelchair",
    "Uses Electric Wheelchair",
    "Uses Grab Bars",
    "Others",
  ];
  const ambulations = [
    "Independent In Normal Environments",
    "Independent Only In Specific Environment",
    "Requires Supervision",
    "Requires Occasional Or Minor Assistance",
    "Requires significant or Continued Assistance",
  ];

  const bladderControls = [
    "Totally Continent",
    "Needs Routine Toileting or Reminder",
    "Incontinent Due to Identifiable Factors",
    "Incontinent Once Per Day",
    "Incontinent More than Once per Day",
  ];

  const bowelControls = [
    "Has Total Control",
    "Needs Routine Toileting or Reminder",
    "No Bowel Control Due to Identifiable Factors",
    "Loses Bowel Control Once Per Day",
    "Loses Bowel Control More than Once per Day",
  ];

  const toiletings = [
    "Requires Raised Toilet Seat or Commode",
    "Has Difficulty With Buttons And Zippers",
    "Needs Help with Aids",
    "Other",
  ];

  return (
    <>
      <SectionCollapse title="Communication">
        <div className="grid grid-cols-12 gap-2">
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="checkboxes"
                onChange={onLanguagesChange}
                checkBoxesValue={nursingFields.communication.languages}
                checkboxes={langs}
                heading="Language Spoken"
                namePrefix="language"
              />
            </div>
            <div className="mt-4">
              {nursingFields.communication.languages.language_other && (
                <InputPlain
                  placeholder="Other Language Name"
                  id="other_language"
                  type="text"
                  value={nursingFields.communication.languages.other_language}
                  name="other_language"
                  onChange={onOtherLanguagesChange}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="radios"
                radioValue={nursingFields.communication.speech}
                onChange={onCommunicationChange}
                radios={speechs}
                heading="Speech"
                radioName="speech"
              />
            </div>
            <div className="mt-4">
              {nursingFields.communication.speech === "Does Not Speak" && (
                <InputPlain
                  placeholder="If Client Cannot Speak, Indicate Method of Communicating:"
                  id="method_of_communicating"
                  type="text"
                  name="method_of_communicating"
                  value={nursingFields.communication.method_of_communicating}
                  onChange={onCommunicationChange}
                />
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.communication.speech_understanding}
              onChange={onCommunicationChange}
              radios={speechUnderstandings}
              heading="Understandings"
              radioName="speech_understanding"
            />
          </div>
          {nursingFields.communication.speech === "Does Not Speak" && (
            <div className="col-span-12 md:col-span-6">
              <InputCollapse
                type="radios"
                radioValue={nursingFields.communication.speech_method}
                onChange={onCommunicationChange}
                radios={speechMethods}
                heading="Method Is"
                radioName="speech_method"
              />
            </div>
          )}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Activities Of Daily Living" isLast>
        <div className="grid grid-cols-12 gap-2">
          <div className="flex flex-col justify-between col-span-12 md:col-span-6">
            <div>
              <InputCollapse
                type="checkboxes"
                onChange={onMobilityAidsChange}
                checkBoxesValue={
                  nursingFields.activitiesOfDailyLiving.mobilityAids
                }
                checkboxes={mobilityAids}
                heading="Mobility Aids"
                namePrefix="mobility_aids"
              />
            </div>
            <div class="mt-2">
              {nursingFields.activitiesOfDailyLiving.mobilityAids
                .mobility_aids_others && (
                <InputPlain
                  placeholder="Other Prosthesis Or Aid"
                  id="other_aid"
                  type="text"
                  name="other_aid"
                  value={
                    nursingFields.activitiesOfDailyLiving.mobilityAids.other_aid
                  }
                  onChange={onOtherMobilityAidsChange}
                />
              )}
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.activitiesOfDailyLiving.ambulations}
              onChange={onActivitiesOfDailyLivingChange}
              radios={ambulations}
              heading="Ambulations"
              radioName="ambulations"
            />
          </div>
          <div className="flex flex-col gap-3 justify-between col-span-12">
            <TextLgFancy text="Transferring" classes="font-semibold" />
            <InputRadio
              id="transferring_independent"
              value="Independent"
              name="transferring"
              isChecked={
                nursingFields.activitiesOfDailyLiving.transferring
                  .transferring === "Independent"
              }
              onChange={onTransferringGenericChange}
              label="Independent"
            />
            <InputRadio
              id="transferring_needs_assistance"
              value="Needs Assistance"
              name="transferring"
              isChecked={
                nursingFields.activitiesOfDailyLiving.transferring
                  .transferring === "Needs Assistance"
              }
              onChange={onTransferringGenericChange}
              label="Needs Assistance:"
            />
            <div className="pl-8 md:pl-14 flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[22rem] max-w-[22rem]"
                text="Needs Supervision transferring to:"
              />

              <InputCheckbox
                id="transferring_needs_supervision_transferring_to_bed"
                value="Needs supervision transferring to bed"
                name="transferring_needs_supervision_transferring_to_bed"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_supervision_transferring_to_bed
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Bed"
              />
              <InputCheckbox
                id="transferring_needs_supervision_transferring_to_chair"
                value="Needs supervision transferring to chair"
                name="transferring_needs_supervision_transferring_to_chair"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_supervision_transferring_to_chair
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Chair"
              />
              <InputCheckbox
                id="transferring_needs_supervision_transferring_to_toilet"
                value="Needs supervision transferring to toilet"
                name="transferring_needs_supervision_transferring_to_toilet"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_supervision_transferring_to_toilet
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Toilet"
              />
            </div>
            <div className="pl-8 md:pl-14 flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[22rem] max-w-[22rem]"
                text="Needs Intermittent Assistance transferring to:"
              />
              <InputCheckbox
                id="transferring_needs_intermittent_assistance_transferring_to_bed"
                value="Needs intermittent assistance transferring to bed"
                name="transferring_needs_intermittent_assistance_transferring_to_bed"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_intermittent_assistance_transferring_to_bed
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Bed"
              />
              <InputCheckbox
                id="transferring_needs_intermittent_assistance_transferring_to_chair"
                value="Needs intermittent assistance transferring to chair"
                name="transferring_needs_intermittent_assistance_transferring_to_chair"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_intermittent_assistance_transferring_to_chair
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Chair"
              />
              <InputCheckbox
                id="transferring_needs_intermittent_assistance_transferring_to_toilet"
                value="Needs intermittent assistance transferring to toilet"
                name="transferring_needs_intermittent_assistance_transferring_to_toilet"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_intermittent_assistance_transferring_to_toilet
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Toilet"
              />
            </div>
            <div className="pl-8 md:pl-14 flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[22rem] max-w-[22rem]"
                text="Needs Continued Assistance transferring to:"
              />
              <InputCheckbox
                id="transferring_needs_continued_assistance_transferring_to_bed"
                value="Needs continued assistance transferring to bed"
                name="transferring_needs_continued_assistance_transferring_to_bed"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_continued_assistance_transferring_to_bed
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Bed"
              />
              <InputCheckbox
                id="transferring_needs_continued_assistance_transferring_to_chair"
                value="Needs continued assistance transferring to chair"
                name="transferring_needs_continued_assistance_transferring_to_chair"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_continued_assistance_transferring_to_chair
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Chair"
              />
              <InputCheckbox
                id="transferring_needs_continued_assistance_transferring_to_toilet"
                value="Needs continued assistance transferring to toilet"
                name="transferring_needs_continued_assistance_transferring_to_toilet"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring_needs_continued_assistance_transferring_to_toilet
                }
                onChange={onTransferringChange}
                isDisabled={
                  nursingFields.activitiesOfDailyLiving.transferring
                    .transferring !== "Needs Assistance"
                }
                label="Toilet"
              />
            </div>
            <InputRadio
              id="transferring_completely_dependant"
              value="Completely Dependent for All Movements"
              name="transferring"
              isChecked={
                nursingFields.activitiesOfDailyLiving.transferring
                  .transferring === "Completely Dependent for All Movements"
              }
              onChange={onTransferringGenericChange}
              label="Completely Dependent for All Movements"
            />
          </div>
          <div className="col-span-12">
            <TextLgFancy text="Bathing" classes="font-semibold" />
            <li className="inline-block mr-2">
              <InputCheckbox
                id="bathing_ind_bath"
                value="Independent in Bathtub or Shower"
                name="bathing_independent_in_bathtub"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_independent_in_bathtub
                }
                onChange={onBathingChange}
                label="Independent in Bathtub or Shower"
              />
            </li>
            <li className="inline-block mr-2">
              <InputCheckbox
                id="bathing_ind_mech_aids"
                value="Independent with Mechanical Aids (E.g. bath seat)"
                name="bathing_independent_with_mech_aids"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_independent_with_mech_aids
                }
                onChange={onBathingChange}
                label="Independent with Mechanical Aids (E.g. bath seat)"
              />
            </li>
            <div className="flex flex-col gap-2 border-b-2 pb-4">
              <TextSm
                classes="font-bold min-w-[22rem] max-w-[22rem]"
                text="Requires Minor Assistance or Supervision:"
              />
              <InputCheckbox
                id="bathing_getting_in_out_tub"
                value="Getting in and Out of Tub/Shower"
                name="bathing_getting_in_out_tub"
                onChange={onBathingChange}
                label="Getting in and Out of Tub/Shower"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_getting_in_out_tub
                }
              />
              <InputCheckbox
                id="bathing_turning_taps_on_off"
                value="Turning Taps On and Off"
                name="bathing_turning_taps_on_off"
                onChange={onBathingChange}
                label="Turning Taps On and Off"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_turning_taps_on_off
                }
              />
              <InputCheckbox
                id="bathing_back"
                value="Washing Back"
                name="bathing_back"
                onChange={onBathingChange}
                label="Washing Back"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing.bathing_back
                }
              />
            </div>
            <li className="inline-block mr-2">
              <InputCheckbox
                id="bathing_cont"
                value="Requires Continued Assistance"
                name="bathing_req_continued_assistance"
                onChange={onBathingChange}
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_req_continued_assistance
                }
                label="Requires Continued Assistance"
              />
            </li>
            <li className="inline-block mr-2">
              <InputCheckbox
                id="bathing_rest"
                value="Resists Assistance"
                name="bathing_resists_assistance"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing
                    .bathing_resists_assistance
                }
                onChange={onBathingChange}
                label="Resists Assistance"
              />
            </li>
            <li className="inline-block mr-2">
              <InputCheckbox
                id="bathing_other"
                value="Other"
                name="bathing_other"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.bathing.bathing_other
                }
                onChange={onBathingChange}
                label="Other"
              />
            </li>
            {nursingFields.activitiesOfDailyLiving.bathing.bathing_other && (
              <InputPlain
                placeholder="Write Something...."
                id="other_bathing"
                type="text"
                value={
                  nursingFields.activitiesOfDailyLiving.bathing.other_bathing
                }
                name="other_bathing"
                onChange={onOtherBathingChange}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 justify-between col-span-12">
            <TextLgFancy text="Dressing" classes="font-semibold" />
            <InputCheckbox
              id="dressing_independent"
              value="Independent"
              name="dressing_independent"
              onChange={onDressingChange}
              label="Independent"
              isChecked={
                nursingFields.activitiesOfDailyLiving.dressing
                  .dressing_independent
              }
            />
            <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[18rem] max-w-[18rem]"
                text="Supervision or Needs some help:"
              />
              <InputCheckbox
                id="dressing_needs_help_selecting_clothes"
                value="Selecting Appropriate Clothing"
                name="dressing_needs_help_selecting_clothes"
                onChange={onDressingChange}
                label="Selecting Appropriate Clothing"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.dressing
                    .dressing_needs_help_selecting_clothes
                }
              />
              <InputCheckbox
                id="dressing_needs_help_coordinating_colors"
                value="Coordinating Colours"
                name="dressing_needs_help_coordinating_colors"
                onChange={onDressingChange}
                label="Coordinating Colours"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.dressing
                    .dressing_needs_help_coordinating_colors
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextSm
                classes="font-bold min-w-[18rem] max-w-[18rem]"
                text="Periodic or Daily Help Needed:"
              />
              <div>
                <li className="inline-block mr-2">
                  <InputCheckbox
                    id="dressing_needs_daily_clothing"
                    value="Putting on Clothing"
                    name="dressing_needs_daily_clothing"
                    onChange={onDressingChange}
                    label="Putting on Clothing"
                    isChecked={
                      nursingFields.activitiesOfDailyLiving.dressing
                        .dressing_needs_daily_clothing
                    }
                  />
                </li>
                <li className="inline-block mr-2">
                  <InputCheckbox
                    id="dressing_needs_doing_buttons"
                    value="Doing up Buttons, Laces, Zippers"
                    name="dressing_needs_doing_buttons"
                    onChange={onDressingChange}
                    label="Doing up Buttons, Laces, Zippers"
                    isChecked={
                      nursingFields.activitiesOfDailyLiving.dressing
                        .dressing_needs_doing_buttons
                    }
                  />
                </li>
                <li className="inline-block mr-2">
                  <InputCheckbox
                    id="dressing_needs_pulling_trousers"
                    value="Pulling on Trousers, Socks, Shoes"
                    name="dressing_needs_pulling_trousers"
                    onChange={onDressingChange}
                    label="Pulling on Trousers, Socks, Shoes"
                    isChecked={
                      nursingFields.activitiesOfDailyLiving.dressing
                        .dressing_needs_pulling_trousers
                    }
                  />
                </li>
                <li className="inline-block mr-2">
                  <InputCheckbox
                    id="dressing_needs_clothes_cleanliness"
                    value="Determining Condition or Cleanliness of Clothing"
                    name="dressing_needs_clothes_cleanliness"
                    onChange={onDressingChange}
                    label="Determining Condition or Cleanliness of Clothing"
                    isChecked={
                      nursingFields.activitiesOfDailyLiving.dressing
                        .dressing_needs_clothes_cleanliness
                    }
                  />
                </li>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-between col-span-12">
            <TextLgFancy text="Grooming And Hygiene" classes="font-semibold" />
            <div>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="grooming_and_hygiene_independent"
                  value="Independent"
                  name="grooming_and_hygiene_independent"
                  onChange={onGroomingAndHygieneChange}
                  label="Independent"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                      .grooming_and_hygiene_independent
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="grooming_and_hygiene_direction"
                  value="Requires Reminder, Motivation&/or Direction"
                  name="grooming_and_hygiene_direction"
                  onChange={onGroomingAndHygieneChange}
                  label="Requires Reminder, Motivation&/or Direction"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                      .grooming_and_hygiene_direction
                  }
                />
              </li>
            </div>
            <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[18rem] max-w-[18rem]"
                text="Requires Assistance with Some Things:"
              />
              <InputCheckbox
                id="grooming_and_hygiene_req_assistance_toothbrush"
                value="Putting Toothpaste of Toothbrush"
                name="grooming_and_hygiene_req_assistance_toothbrush"
                onChange={onGroomingAndHygieneChange}
                label="Putting Toothpaste of Toothbrush"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                    .grooming_and_hygiene_req_assistance_toothbrush
                }
              />
              <InputCheckbox
                id="grooming_and_hygiene_req_assistance_using_razor"
                value="Using Electric Razor"
                name="grooming_and_hygiene_req_assistance_using_razor"
                onChange={onGroomingAndHygieneChange}
                label="Using Electric Razor"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                    .grooming_and_hygiene_req_assistance_using_razor
                }
              />
            </div>
            <div>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="grooming_and_hygiene_total_assistance"
                  value="Requires Total Assistance"
                  name="grooming_and_hygiene_total_assistance"
                  onChange={onGroomingAndHygieneChange}
                  label="Requires Total Assistance"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                      .grooming_and_hygiene_total_assistance
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="grooming_and_hygiene_resists"
                  value="Resists Assistance"
                  name="grooming_and_hygiene_resists"
                  onChange={onGroomingAndHygieneChange}
                  label="Resists Assistance"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.groomingAndHygiene
                      .grooming_and_hygiene_resists
                  }
                />
              </li>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-between col-span-12">
            <TextLgFancy text="Eating" classes="font-semibold" />
            <div>
              <li className="inline-block mr-2">
                <InputRadio
                  id="eating_ind"
                  value="Independent"
                  name="eating"
                  onChange={onActivitiesOfDailyLivingChange}
                  label="Independent"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.eating ===
                    "Independent"
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputRadio
                  id="eating_ind_disabled"
                  value="Independent with Special Provision for Disability"
                  name="eating"
                  onChange={onActivitiesOfDailyLivingChange}
                  label="Independent with Special Provision for Disability"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.eating ===
                    "Independent with Special Provision for Disability"
                  }
                />
              </li>
            </div>
            <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[18rem] max-w-[18rem]"
                text="Requires Intermittent Help With:"
              />
              <InputCheckbox
                id="eating_cutting_up/pureeing_Food"
                value="Requires Intermittent Help With Cutting Up/Pureeing Food"
                name="eating_cutting_up/pureeing_Food"
                onChange={onActivitiesOfDailyLivingCheckboxChange}
                label="Cutting Up/Pureeing Food"
                isChecked={
                  nursingFields.activitiesOfDailyLiving[
                    "eating_cutting_up/pureeing_food"
                  ]
                }
              />
            </div>
            <div>
              <li className="inline-block mr-2">
                <InputRadio
                  id="eating_fed"
                  value="Must Be Fed"
                  name="eating"
                  onChange={onActivitiesOfDailyLivingChange}
                  label="Must Be Fed"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.eating ===
                    "Must Be Fed"
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputRadio
                  id="eating_resist_feeding"
                  value="Resists Feeding"
                  name="eating"
                  onChange={onActivitiesOfDailyLivingChange}
                  label="Resists Feeding"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.eating ===
                    "Resists Feeding"
                  }
                />
              </li>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.activitiesOfDailyLiving.bladder_control}
              onChange={onActivitiesOfDailyLivingChange}
              radios={bladderControls}
              heading="Bladder Control"
              radioName="bladder_control"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <InputCollapse
              type="radios"
              radioValue={nursingFields.activitiesOfDailyLiving.bowel_control}
              onChange={onActivitiesOfDailyLivingChange}
              radios={bowelControls}
              heading="Bowel Control"
              radioName="bowel_control"
            />
          </div>

          <div className="flex flex-col gap-3 justify-between col-span-12">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 md:col-span-6">
                <InputCollapse
                  type="checkboxes"
                  onChange={onToiletingChange}
                  checkBoxesValue={
                    nursingFields.activitiesOfDailyLiving.toileting
                  }
                  checkboxes={toiletings}
                  heading="Toileting"
                  namePrefix="toileting"
                />
                <div className="mt-2">
                  {nursingFields.activitiesOfDailyLiving.toileting
                    .toileting_other && (
                    <InputPlain
                      placeholder="Write Something..."
                      id="other_toileting"
                      type="text"
                      name="other_toileting"
                      value={
                        nursingFields.activitiesOfDailyLiving.toileting
                          .other_toileting
                      }
                      onChange={onOtherToiletingChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-between col-span-12">
            <TextLgFancy text="Exercising" classes="font-semibold" />
            <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm
                classes="font-bold min-w-[5rem] max-w-[5rem]"
                text="Exercises:"
              />
              <InputRadio
                id="exercise_daily"
                value="Daily"
                name="exercising_exercises"
                onChange={onAboutExercisingChange}
                label="Daily"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .exercising_exercises === "Daily"
                }
              />
              <InputRadio
                id="exercise_alt_days"
                value="Alternate Days"
                name="exercising_exercises"
                onChange={onAboutExercisingChange}
                label="Alternate Days"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .exercising_exercises === "Alternate Days"
                }
              />
              <InputRadio
                id="exercise_twice_week"
                value="Twice a Week"
                name="exercising_exercises"
                onChange={onAboutExercisingChange}
                label="Twice a Week"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .exercising_exercises === "Twice a Week"
                }
              />
              <InputRadio
                id="exercise_weekly"
                value="Weekly"
                name="exercising_exercises"
                onChange={onAboutExercisingChange}
                label="Weekly"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .exercising_exercises === "Weekly"
                }
              />
              <InputRadio
                id="exercise_exercising_exercises_other"
                value="Other"
                name="exercising_exercises"
                onChange={onAboutExercisingChange}
                label="Other"
                isChecked={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .exercising_exercises === "Other"
                }
              />
            </div>
            {nursingFields.activitiesOfDailyLiving.exercising
              .exercising_exercises === "Other" && (
              <InputPlain
                placeholder="Other Exercises"
                id="other_exercise"
                type="text"
                value={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .other_exercise
                }
                name="other_exercise"
                onChange={onAboutExercisingChange}
              />
            )}
            <div>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="exercising_time"
                  value="Time and/or Distance"
                  name="exercising_time"
                  onChange={onExercisingChange}
                  label="Time and/or Distance"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.exercising
                      .exercising_time
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="exercising_recent_changes"
                  value="Recent Changes to Exercise Regime"
                  name="exercising_recent_changes"
                  onChange={onExercisingChange}
                  label="Recent Changes to Exercise Regime"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.exercising
                      .exercising_recent_changes
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="exercising_alone"
                  value="Exercising Alone"
                  name="exercising_alone"
                  onChange={onExercisingChange}
                  label="Exercising Alone"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.exercising
                      .exercising_alone
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="exercising_with_attendant"
                  value="Exercises With Attendant"
                  name="exercising_with_attendant"
                  onChange={onExercisingChange}
                  label="Exercises With Attendant"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.exercising
                      .exercising_with_attendant
                  }
                />
              </li>
              <li className="inline-block mr-2">
                <InputCheckbox
                  id="exercising_other"
                  value="Other"
                  name="exercising_other"
                  onChange={onExercisingChange}
                  label="Other"
                  isChecked={
                    nursingFields.activitiesOfDailyLiving.exercising
                      .exercising_other
                  }
                />
              </li>
            </div>
            {nursingFields.activitiesOfDailyLiving.exercising
              .exercising_other && (
              <InputPlain
                placeholder="Write Something..."
                id="about_exercise"
                type="text"
                value={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .about_exercise
                }
                name="about_exercise"
                onChange={onAboutExercisingChange}
              />
            )}
            {nursingFields.activitiesOfDailyLiving.exercising
              .exercising_time && (
              <InputPlain
                placeholder="Time Exercising"
                id="time_exercising"
                type="text"
                value={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .time_exercising
                }
                name="time_exercising"
                onChange={onAboutExercisingChange}
              />
            )}
            {nursingFields.activitiesOfDailyLiving.exercising
              .exercising_recent_changes && (
              <InputPlain
                placeholder="Recent Changes Exercising"
                id="recent_changes_exercising"
                type="text"
                value={
                  nursingFields.activitiesOfDailyLiving.exercising
                    .recent_changes_exercising
                }
                name="recent_changes_exercising"
                onChange={onAboutExercisingChange}
              />
            )}
          </div>
        </div>
      </SectionCollapse>
      <InputTextArea
        id="notes_living_communications"
        name="notes_living_communications"
        value={nursingFields.notes_living_communications}
        onChange={onGenericChange}
        placeholder="Actions Indicated - Communication"
      />
    </>
  );
};

export default Step5;
