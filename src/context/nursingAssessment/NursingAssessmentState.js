import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { useNursingAssessment } from "@/hooks/nursingAssessment";
import { formRequiredFields } from "@/config";

export const NursingAssessmentContext = createContext();

export default function NursingAssessmentState({ children }) {
  // Custom Hooks
  const { create, read, update } = useNursingAssessment();
  // States
  const [nursingFields, setNursingFields] = useState({
    consumer_contract_id: "",
    consumerDiagnosis: {
      consumer_primary_diagnosis_code: "",
      consumer_primary_diagnosis: "",
      consumer_secondary_diagnosis_code: "",
      consumer_secondary_diagnosis: "",
      consumer_tos: "",
      consumer_los: "",
    },
    medicalInfo: {
      notes_one: "",
      notes_two: "",
      notes_three: "",
      notes_four: "",
      height_inch: "",
      height_feet: "",
      weight: "",
      weight_status: "Increase",
      reason_for_weight_change: "",
      blood_pressure_upper: "",
      blood_pressure_lower: "",
      pulse: "",
      respirations: "",
      temperature: "",
      pain_status: "Yes",
      level_of_pain: "",
      location_and_description: "",
      history_of_present_illness: "",
      past_history: "",
      family_and_personal_history: "",
      general_appearance: "",
      skin: "",
      heent: "",
      neck: "",
      chest_and_lungs: "",
      cardiovascular: "",
      abdomen: "",
      genitourinary: "",
      rectal: "",
      neurological: "",
    },
    medications: [
      [
        {
          placeholder: "Medication",
          id: "medications_medication_1",
          name: "medications_medication_1",
          value: "",
        },
        {
          placeholder: "Dose",
          id: "medications_dose_1",
          name: "medications_dose_1",
          value: "",
        },
        {
          placeholder: "Frequency",
          id: "medications_frequency_1",
          name: "medications_frequency_1",
          value: "",
        },
        {
          placeholder: "Route/Changes",
          id: "medications_route_1",
          name: "medications_route_1",
          value: "",
        },
      ],
    ],
    prognosis: "Poor",
    medication_allergies: "",
    safety_measures: "",
    dentalCare: {
      dental_problem: "Yes",
      care_of_dentist: "Yes",
      dentalState: {
        dental_state_no_dentures: false,
        dental_state_dentures_damaged: false,
        dental_state_full_upper: false,
        dental_state_full_lower: false,
        dental_state_partial_denture: false,
        dental_state_not_wearing_dentures: false,
        dental_state_no_teeth: false,
      },
      client_chew: "Yes",
      dentist_name: "",
      dentist_phone_no: "",
      dental_visit: "Current",
      dentist_next_appointment: "",
    },
    vision: {
      vision: {
        vision_unimpaired: false,
        "vision_blind_-_safe_in_familiar_locale": false,
        vision_adequate_for_personal_safety: false,
        "vision_blind_-_requires_assistance": false,
        vision_distinguishes_only_light_or_dark: false,
      },
      wear_glasses: "Yes",
      ophthalmologist_name: "",
      ophthalmologist_phone_no: "",
      ophthalmologist_visit: "Current",
      ophthalmologist_next_appointment: "",
    },
    hearing: {
      hearing: {
        hearing_unimpaired: false,
        hearing_mild_impairment: false,
        hearing_moderate_impairment_but_not_a_threat_to_safety: false,
        "hearing_impaired_-_safety_threat_exists": false,
        hearing_totally_deaf: false,
      },
      uses_hearing_aids: "Yes",
      ent_name: "",
      ent_phone_no: "",
      ent_visit: "Current",
      ent_next_appointment: "",
    },
    mentalHealth: {
      attitudes: {
        attitude_cooperative: false,
        attitude_indifferent: false,
        attitude_resistive: false,
        attitude_demanding: false,
        attitude_suspicious: false,
        attitude_hostile: false,
      },
      appearances: "Well Groomed",
      selfDirection: "Independent",
      behaviors: {
        behavior_normal: false,
        behavior_wandering: false,
        behavior_sun_downing: false,
        behavior_restless: false,
        behavior_hostile: false,
        behavior_withdrawn: false,
        behavior_self_destructive: false,
        behavior_safety_hazard: false,
        behavior_aggressive: false,
        behavior_verbal: false,
        behavior_physical: false,
      },
      influences: {
        influence_appropriate: false,
        influence_inappropriate: false,
        influence_anxious: false,
        influence_blunted: false,
        influence_euphoric: false,
        influence_depressed: false,
        influence_angry: false,
        influence_mood_swings: false,
      },
      thoughtContent: "Normal",
      perceptions: {
        perception_normal: false,
        perception_hallucinations: false,
        perception_auditory: false,
        perception_visual: false,
        perception_other: false,
      },
      cognitions: "Normal",
      insights: "Good",
      judgement: "Good",
    },
    smokingHabits: {
      client_smokes: "Yes",
      smokes_degree_of_problem: "No Problem",
    },
    alcoholConsumption: {
      client_drinks: "Yes",
      drinks_degree_of_problem: "No Problem",
    },
    diets: {
      diet_regular: false,
      diet_low_salt: false,
      diet_diabetic: false,
      diet_vegetarian: false,
      diet_low_fat: false,
      diet_other: false,
      other_diet: "",
      client_takes_supplement: "",
      client_nutritional_requirements: "",
    },
    eatingHabits: {
      eating_habit: "Poor",
      eating_habits_comment: "",
    },
    communication: {
      languages: {
        language_english: false,
        language_italian: false,
        language_french: false,
        language_spanish: false,
        language_chinese: false,
        language_russian: false,
        language_japanese: false,
        language_east_indian: false,
        language_other: false,
        other_language: "",
      },
      speech: "Unimpaired",
      method_of_communicating: "",
      speech_method: "Effective",
      speech_understanding: "Unimpaired",
    },
    activitiesOfDailyLiving: {
      mobilityAids: {
        mobility_aids_uses_cane: false,
        mobility_aids_uses_walker: false,
        mobility_aids_uses_crutches: false,
        mobility_aids_uses_manual_wheelchair: false,
        mobility_aids_uses_electric_wheelchair: false,
        mobility_aids_uses_grab_bars: false,
        mobility_aids_others: false,
        other_aid: "",
      },
      ambulations: "Independent In Normal Environments",
      transferring: {
        transferring: "Independent",
        transferring_needs_supervision_transferring_to_bed: false,
        transferring_needs_supervision_transferring_to_chair: false,
        transferring_needs_supervision_transferring_to_toilet: false,
        transferring_needs_intermittent_assistance_transferring_to_bed: false,
        transferring_needs_intermittent_assistance_transferring_to_chair: false,
        transferring_needs_intermittent_assistance_transferring_to_toilet: false,
        transferring_needs_continued_assistance_transferring_to_bed: false,
        transferring_needs_continued_assistance_transferring_to_chair: false,
        transferring_needs_continued_assistance_transferring_to_toilet: false,
      },
      bathing: {
        bathing_independent_in_bathtub: false,
        bathing_independent_with_mech_aids: false,
        bathing_getting_in_out_tub: false,
        bathing_turning_taps_on_off: false,
        bathing_back: false,
        bathing_req_continued_assistance: false,
        bathing_resists_assistance: false,
        bathing_other: false,
        other_bathing: "",
      },
      dressing: {
        dressing_independent: false,
        dressing_needs_help_selecting_clothes: false,
        dressing_needs_help_coordinating_colors: false,
        dressing_needs_daily_clothing: false,
        dressing_needs_doing_buttons: false,
        dressing_needs_pulling_trousers: false,
        dressing_needs_clothes_cleanliness: false,
      },
      groomingAndHygiene: {
        grooming_and_hygiene_independent: false,
        grooming_and_hygiene_direction: false,
        grooming_and_hygiene_req_assistance_toothbrush: false,
        grooming_and_hygiene_req_assistance_using_razor: false,
        grooming_and_hygiene_total_assistance: false,
        grooming_and_hygiene_resists: false,
      },
      eating: "Independent",
      "eating_cutting_up/pureeing_food": false,
      bladder_control: "Totally Continent",
      bowel_control: "Has Total Control",
      toileting: {
        toileting_requires_raised_toilet_seat_or_commode: false,
        toileting_has_difficulty_with_buttons_and_zippers: false,
        toileting_needs_help_with_aids: false,
        toileting_needs_help_with_aids: false,
        toileting_other: false,
        other_toileting: "",
      },
      exercising: {
        exercising_exercises: "Daily",
        exercising_time: false,
        exercising_recent_changes: false,
        exercising_alone: false,
        exercising_with_attendant: false,
        exercising_other: false,
        about_exercise: "",
        other_exercise: "",
        time_exercising: "",
        recent_changes_exercising: "",
      },
    },
    instrumentalActivitiesOfDailyLiving: {
      preparing_food: "Independent",
      house_keeping: "Independent",
      shopping: "Independent",
      transportation: "Independent",
      telephone: "Independent",
      medication: "Completely Responsible for Self",
    },
    attendantProfile: {
      attendants: {
        attendant_independent: false,
        attendant_needs_an_attendant: false,
      },
      frequency_of_attendant_assistance: "",
      attendant_needs_met_by: "",
      other_attendant: "",
    },
    socialProfile: {
      housing: "House",
      housing_area: "Urban",
      housing_ownership: "Self Owned",
      other_housing: "",
      living_companion: "Lives Alone",
      principal_helper: "",
      religion: "",
      ethnicity: "",
    },
    orders_for_discipline: `RN is to assess the patient on admission; every 4 - 6 months, as needed such as change in patient condition, or post hospitalization/ rehab. Supervise PCA/HHA every 3/6 months or as needed per patient condition.\n\nPCA: To assist patient with ADLs/IADLs for 4-7 days per week, 4-7 hrs per visit.`,
    goals_plans: `Assist with ADLs, Fall Prevention, Maintain adequate nutrition and hydration, keep patient encouraged and motivated. watch for any unusual signs and symptoms, and if noted, report to the supervising RN.`,
    vaccinationStatus: {
      covid_19_vaccine: "Yes",
      flu_vaccine: "Yes",
      pneumococcal_vaccine: "Yes",
    },
    nurse_signature: "",
    date_hha_received: "",
    date_verbal_soc: "",
    note_for_physician: "",
    notes_living_habits: "",
    notes_living_communications: "",
  });

  const [isTouched, setIsTouched] = useState({
    consumerDiagnosis: {
      consumer_primary_diagnosis_code: false,
      consumer_primary_diagnosis: false,
      consumer_secondary_diagnosis_code: false,
      consumer_secondary_diagnosis: false,
      consumer_tos: false,
      consumer_los: false,
    },
  });

  // Contexts
  const { user } = useContext(AuthContext);

  // On Generic Change
  const onGenericChange = (e) => {
    setNursingFields({
      ...nursingFields,
      [e.target.name]: e.target.value,
    });
  };
  // Adds A New Medication Fields to array
  const onAddMedication = () => {
    const newFields = [
      {
        placeholder: "Medication",
        id: "medications_medication_" + nursingFields.medications.length + 1,
        name: "medications_medication_" + nursingFields.medications.length + 1,
        value: "",
      },
      {
        placeholder: "Dose",
        id: "medications_dose_" + nursingFields.medications.length + 1,
        name: "medications_dose_" + nursingFields.medications.length + 1,
        value: "",
      },
      {
        placeholder: "Frequency",
        id: "medications_frequency_" + nursingFields.medications.length + 1,
        name: "medications_frequency_" + nursingFields.medications.length + 1,
        value: "",
      },
      {
        placeholder: "Route/Changes",
        id: "medications_route_" + nursingFields.medications.length + 1,
        name: "medications_route_" + nursingFields.medications.length + 1,
        value: "",
      },
    ];
    setNursingFields({
      ...nursingFields,
      medications: [...nursingFields.medications, newFields],
    });
  };
  // On Consumer Diagnosis Change
  const onConsumerDiagnosisChange = (e) => {
    if (isTouched.consumerDiagnosis[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        consumerDiagnosis: {
          ...isTouched.consumerDiagnosis,
          [e.target.name]: true,
        },
      });
    }
    setNursingFields({
      ...nursingFields,
      consumerDiagnosis: {
        ...nursingFields.consumerDiagnosis,
        [e.target.name]: e.target.value,
      },
    });
  };
  const isConsumerDiagnosisFilled = () => {
    for (const field of formRequiredFields.commonFields
      .consumerDiagnosisNursingAssessment) {
      if (!nursingFields.consumerDiagnosis[field]) {
        // set all is touched to true
        setIsTouched({
          ...isTouched,
          consumerDiagnosis: {
            consumer_primary_diagnosis_code: true,
            consumer_primary_diagnosis: true,
            consumer_secondary_diagnosis_code: true,
            consumer_secondary_diagnosis: true,
            consumer_tos: true,
            consumer_los: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  // On Medical Info Change
  const onMedicalInfoChange = (e) => {
    setNursingFields({
      ...nursingFields,
      medicalInfo: {
        ...nursingFields.medicalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Dental Care Info Change
  const onDentalCareChange = (e) => {
    setNursingFields({
      ...nursingFields,
      dentalCare: {
        ...nursingFields.dentalCare,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Dental Care Info Change
  const onDentalStateChange = (e) => {
    setNursingFields({
      ...nursingFields,
      dentalCare: {
        ...nursingFields.dentalCare,
        dentalState: {
          ...nursingFields.dentalCare.dentalState,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Vision Info Change
  const onVisionChange = (e) => {
    setNursingFields({
      ...nursingFields,
      vision: {
        ...nursingFields.vision,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Vision Visions Info Change
  const onVisionVisionsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      vision: {
        ...nursingFields.vision,
        vision: {
          ...nursingFields.vision.vision,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On hearing Info Change
  const onHearingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      hearing: {
        ...nursingFields.hearing,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On hearing Hearings Info Change
  const onHearingHearingsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      hearing: {
        ...nursingFields.hearing,
        hearing: {
          ...nursingFields.hearing.hearing,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Attitude Change
  const onAttitudesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        attitudes: {
          ...nursingFields.mentalHealth.attitudes,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Appearances Change
  const onAppearancesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        appearances: e.target.value,
      },
    });
  };
  // On Self Direction Change
  const onSelfDirectionChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        selfDirection: e.target.value,
      },
    });
  };
  // On Behavior Change
  const onBehaviorsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        behaviors: {
          ...nursingFields.mentalHealth.behaviors,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Influences Change
  const onInfluencesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        influences: {
          ...nursingFields.mentalHealth.influences,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Thought Content Change
  const onThoughtContentChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        thoughtContent: e.target.value,
      },
    });
  };
  // On Perceptions Change
  const onPerceptionsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        perceptions: {
          ...nursingFields.mentalHealth.perceptions,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };

  // On Cognitions Change
  const onCognitionsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        cognitions: e.target.value,
      },
    });
  };
  // On Insights Change
  const onInsightsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        insights: e.target.value,
      },
    });
  };
  // On Judgement Change
  const onJudgementChange = (e) => {
    setNursingFields({
      ...nursingFields,
      mentalHealth: {
        ...nursingFields.mentalHealth,
        judgement: e.target.value,
      },
    });
  };

  // On Smoking Habits Change
  const onSmokingHabitsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      smokingHabits: {
        ...nursingFields.smokingHabits,

        [e.target.name]: e.target.value,
      },
    });
  };
  // On Alcohol Consumption Change
  const onAlcoholConsumptionChange = (e) => {
    setNursingFields({
      ...nursingFields,
      alcoholConsumption: {
        ...nursingFields.alcoholConsumption,

        [e.target.name]: e.target.value,
      },
    });
  };
  // On Alcohol Consumption Change
  const onDietsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      diets: {
        ...nursingFields.diets,

        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Takes Supplement Change
  const onGenericDietChange = (e) => {
    setNursingFields({
      ...nursingFields,
      diets: {
        ...nursingFields.diets,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Eating Habits Change
  const onEatingHabitsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      eatingHabits: {
        ...nursingFields.eatingHabits,

        [e.target.name]: e.target.value,
      },
    });
  };

  // On Language Change
  const onLanguagesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      communication: {
        ...nursingFields.communication,
        languages: {
          ...nursingFields.communication.languages,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Other Language Change
  const onOtherLanguagesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      communication: {
        ...nursingFields.communication,
        languages: {
          ...nursingFields.communication.languages,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Communication Change
  const onCommunicationChange = (e) => {
    setNursingFields({
      ...nursingFields,
      communication: {
        ...nursingFields.communication,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Mobility Aids Change
  const onMobilityAidsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        mobilityAids: {
          ...nursingFields.activitiesOfDailyLiving.mobilityAids,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Other Mobility Aids Change
  const onOtherMobilityAidsChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        mobilityAids: {
          ...nursingFields.activitiesOfDailyLiving.mobilityAids,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  // On Activities Of Daily Living Change
  const onActivitiesOfDailyLivingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Activities Of Daily Living Checkbox Change
  const onActivitiesOfDailyLivingCheckboxChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Transferring Change
  const onTransferringChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        transferring: {
          ...nursingFields.activitiesOfDailyLiving.transferring,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Transferring Generic Change
  const onTransferringGenericChange = (e) => {
    if (
      e.target.value === "Independent" ||
      e.target.value === "Completely Dependent for All Movements"
    ) {
      setNursingFields({
        ...nursingFields,
        activitiesOfDailyLiving: {
          ...nursingFields.activitiesOfDailyLiving,
          transferring: {
            ...nursingFields.activitiesOfDailyLiving.transferring,
            transferring_needs_supervision_transferring_to_bed: false,
            transferring_needs_supervision_transferring_to_chair: false,
            transferring_needs_supervision_transferring_to_toilet: false,
            transferring_needs_intermittent_assistance_transferring_to_bed: false,
            transferring_needs_intermittent_assistance_transferring_to_chair: false,
            transferring_needs_intermittent_assistance_transferring_to_toilet: false,
            transferring_needs_continued_assistance_transferring_to_bed: false,
            transferring_needs_continued_assistance_transferring_to_chair: false,
            transferring_needs_continued_assistance_transferring_to_toilet: false,
            [e.target.name]: e.target.value,
          },
        },
      });
    } else {
      setNursingFields({
        ...nursingFields,
        activitiesOfDailyLiving: {
          ...nursingFields.activitiesOfDailyLiving,
          transferring: {
            ...nursingFields.activitiesOfDailyLiving.transferring,
            [e.target.name]: e.target.value,
          },
        },
      });
    }
  };

  // On Bathing Change
  const onBathingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        bathing: {
          ...nursingFields.activitiesOfDailyLiving.bathing,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };

  // On Other Bathing Change
  const onOtherBathingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        bathing: {
          ...nursingFields.activitiesOfDailyLiving.bathing,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Dressing Change
  const onDressingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        dressing: {
          ...nursingFields.activitiesOfDailyLiving.dressing,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Grooming And Hygiene Change
  const onGroomingAndHygieneChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        groomingAndHygiene: {
          ...nursingFields.activitiesOfDailyLiving.groomingAndHygiene,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Toileting Change
  const onToiletingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        toileting: {
          ...nursingFields.activitiesOfDailyLiving.toileting,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Other Toileting Change
  const onOtherToiletingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        toileting: {
          ...nursingFields.activitiesOfDailyLiving.toileting,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Exercising Change
  const onExercisingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        exercising: {
          ...nursingFields.activitiesOfDailyLiving.exercising,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On About Exercising Change
  const onAboutExercisingChange = (e) => {
    setNursingFields({
      ...nursingFields,
      activitiesOfDailyLiving: {
        ...nursingFields.activitiesOfDailyLiving,
        exercising: {
          ...nursingFields.activitiesOfDailyLiving.exercising,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Instrumental Activities Change
  const onInstrumentalActivitiesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      instrumentalActivitiesOfDailyLiving: {
        ...nursingFields.instrumentalActivitiesOfDailyLiving,

        [e.target.name]: e.target.value,
      },
    });
  };
  // On Attendant Profile Generic Change
  const onAttendantProfileGenericChange = (e) => {
    setNursingFields({
      ...nursingFields,
      attendantProfile: {
        ...nursingFields.attendantProfile,

        [e.target.name]: e.target.value,
      },
    });
  };
  // On Attendant Profile Radios Change
  const onAttendantProfileCheckboxesChange = (e) => {
    setNursingFields({
      ...nursingFields,
      attendantProfile: {
        ...nursingFields.attendantProfile,
        attendants: {
          ...nursingFields.attendantProfile.attendants,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Social Profile Radios Change
  const onSocialProfileGenericChange = (e) => {
    setNursingFields({
      ...nursingFields,
      socialProfile: {
        ...nursingFields.socialProfile,

        [e.target.name]: e.target.value,
      },
    });
  };
  // On Vaccination Status Change
  const onVaccinationStatusChange = (e) => {
    setNursingFields({
      ...nursingFields,
      vaccinationStatus: {
        ...nursingFields.vaccinationStatus,

        [e.target.name]: e.target.value,
      },
    });
  };

  // On Consumer Contract Signs End
  const onSignsEnd = (e) => {
    setNursingFields({
      ...nursingFields,
      [e.target.name]: e.target.value,
    });
  };
  // On Consumer Contract Signs Clear
  const onSignsClear = (e) => {
    setNursingFields({
      ...nursingFields,
      [e.target.name]: e.target.value,
    });
  };
  // On Medications Change
  const onMedicationsChange = (e, i, j) => {
    nursingFields.medications[i][j].value = e.target.value;
    setNursingFields({
      ...nursingFields,
      medications: nursingFields.medications,
    });
  };

  // On Nursing Assessment Continue
  const createNursingAssessment = () => {
    const medications = nursingFields.medications.map((medication) => {
      return {
        medication: medication[0]?.value,
        dose: medication[1]?.value,
        frequency: medication[2]?.value,
        route: medication[3]?.value,
      };
    });
    nursingFields.medications = medications;
    return create(nursingFields, user.token);
  };

  // On Nursing Assessment Continue
  const readNursingAssessment = (consumerContractID) => {
    return read(consumerContractID, user.token);
  };
  // On Nursing Assessment Edit Continue
  const updateNursingAssessment = () => {
    const medications = nursingFields.medications.map((medication) => {
      return {
        medication: medication[0]?.value,
        dose: medication[1]?.value,
        frequency: medication[2]?.value,
        route: medication[3]?.value,
      };
    });
    nursingFields.medications = medications;
    return update(nursingFields._id, user.token, nursingFields);
  };

  const resetState = () => {
    setNursingFields({
      consumer_contract_id: "",
      consumerDiagnosis: {
        consumer_primary_diagnosis_code: "",
        consumer_primary_diagnosis: "",
        consumer_secondary_diagnosis_code: "",
        consumer_secondary_diagnosis: "",
        consumer_tos: "",
        consumer_los: "",
      },
      medicalInfo: {
        height_inch: "",
        height_feet: "",
        weight: "",
        weight_status: "Increase",
        reason_for_weight_change: "",
        blood_pressure_upper: "",
        blood_pressure_lower: "",
        pulse: "",
        respirations: "",
        temperature: "",
        pain_status: "Yes",
        level_of_pain: "",
        location_and_description: "",
        history_of_present_illness: "",
        past_history: "",
        family_and_personal_history: "",
        general_appearance: "",
        skin: "",
        heent: "",
        neck: "",
        chest_and_lungs: "",
        cardiovascular: "",
        abdomen: "",
        genitourinary: "",
        rectal: "",
        neurological: "",
      },
      medications: [
        [
          {
            placeholder: "Medication",
            id: "medications_medication_1",
            name: "medications_medication_1",
            value: "",
          },
          {
            placeholder: "Dose",
            id: "medications_dose_1",
            name: "medications_dose_1",
            value: "",
          },
          {
            placeholder: "Frequency",
            id: "medications_frequency_1",
            name: "medications_frequency_1",
            value: "",
          },
          {
            placeholder: "Route/Changes",
            id: "medications_route_1",
            name: "medications_route_1",
            value: "",
          },
        ],
      ],
      prognosis: "Poor",
      dentalCare: {
        dental_problem: "Yes",
        care_of_dentist: "Yes",
        dentalState: {
          dental_state_no_dentures: false,
          dental_state_dentures_damaged: false,
          dental_state_full_upper: false,
          dental_state_full_lower: false,
          dental_state_partial_denture: false,
          dental_state_not_wearing_dentures: false,
          dental_state_no_teeth: false,
        },
        client_chew: "Yes",
        dentist_name: "",
        dentist_phone_no: "",
        dental_visit: "Current",
        dentist_next_appointment: "",
      },
      vision: {
        vision: {
          vision_unimpaired: false,
          "vision_blind_-_safe_in_familiar_locale": false,
          vision_adequate_for_personal_safety: false,
          "vision_blind_-_requires_assistance": false,
          vision_distinguishes_only_light_or_dark: false,
        },
        wear_glasses: "Yes",
        ophthalmologist_name: "",
        ophthalmologist_phone_no: "",
        ophthalmologist_visit: "Current",
        ophthalmologist_next_appointment: "",
      },
      hearing: {
        hearing: {
          hearing_unimpaired: false,
          hearing_mild_impairment: false,
          hearing_moderate_impairment_but_not_a_threat_to_safety: false,
          "hearing_impaired_-_safety_threat_exists": false,
          hearing_totally_deaf: false,
        },
        uses_hearing_aids: "Yes",
        ent_name: "",
        ent_phone_no: "",
        ent_visit: "Current",
        ent_next_appointment: "",
      },
      mentalHealth: {
        attitudes: {
          attitude_cooperative: false,
          attitude_indifferent: false,
          attitude_resistive: false,
          attitude_demanding: false,
          attitude_suspicious: false,
          attitude_hostile: false,
        },
        appearances: "Well Groomed",
        selfDirection: "Independent",
        behaviors: {
          behavior_normal: false,
          behavior_wandering: false,
          behavior_sun_downing: false,
          behavior_restless: false,
          behavior_hostile: false,
          behavior_withdrawn: false,
          behavior_self_destructive: false,
          behavior_safety_hazard: false,
          behavior_aggressive: false,
          behavior_verbal: false,
          behavior_physical: false,
        },
        influences: {
          influence_appropriate: false,
          influence_inappropriate: false,
          influence_anxious: false,
          influence_blunted: false,
          influence_euphoric: false,
          influence_depressed: false,
          influence_angry: false,
          influence_mood_swings: false,
        },
        thoughtContent: "Normal",
        perceptions: {
          perception_normal: false,
          perception_hallucinations: false,
          perception_auditory: false,
          perception_visual: false,
          perception_other: false,
        },
        cognitions: "Normal",
        insights: "Good",
        judgement: "Good",
      },
      smokingHabits: {
        client_smokes: "Yes",
        smokes_degree_of_problem: "No Problem",
      },
      alcoholConsumption: {
        client_drinks: "Yes",
        drinks_degree_of_problem: "No Problem",
      },
      diets: {
        diet_regular: false,
        diet_low_salt: false,
        diet_diabetic: false,
        diet_vegetarian: false,
        diet_low_fat: false,
        diet_other: false,
        other_diet: "",
        client_takes_supplement: "",
        client_nutritional_requirements: "",
      },
      eatingHabits: {
        eating_habit: "Poor",
        eating_habits_comment: "",
      },
      communication: {
        languages: {
          language_english: false,
          language_italian: false,
          language_french: false,
          language_spanish: false,
          language_chinese: false,
          language_russian: false,
          language_japanese: false,
          language_east_indian: false,
          language_other: false,
          other_language: "",
        },
        speech: "Unimpaired",
        method_of_communicating: "",
        speech_method: "Effective",
        speech_understanding: "Unimpaired",
      },
      activitiesOfDailyLiving: {
        mobilityAids: {
          mobility_aids_uses_cane: false,
          mobility_aids_uses_walker: false,
          mobility_aids_uses_crutches: false,
          mobility_aids_uses_manual_wheelchair: false,
          mobility_aids_uses_electric_wheelchair: false,
          mobility_aids_uses_grab_bars: false,
          mobility_aids_others: false,
          other_aid: "",
        },
        ambulations: "Independent In Normal Environments",
        transferring: {
          transferring: "Independent",
          transferring_needs_supervision_transferring_to_bed: false,
          transferring_needs_supervision_transferring_to_chair: false,
          transferring_needs_supervision_transferring_to_toilet: false,
          transferring_needs_intermittent_assistance_transferring_to_bed: false,
          transferring_needs_intermittent_assistance_transferring_to_chair: false,
          transferring_needs_intermittent_assistance_transferring_to_toilet: false,
          transferring_needs_continued_assistance_transferring_to_bed: false,
          transferring_needs_continued_assistance_transferring_to_chair: false,
          transferring_needs_continued_assistance_transferring_to_toilet: false,
        },
        bathing: {
          bathing_independent_in_bathtub: false,
          bathing_independent_with_mech_aids: false,
          bathing_getting_in_out_tub: false,
          bathing_turning_taps_on_off: false,
          bathing_back: false,
          bathing_req_continued_assistance: false,
          bathing_resists_assistance: false,
          bathing_other: false,
          other_bathing: "",
        },
        dressing: {
          dressing_independent: false,
          dressing_needs_help_selecting_clothes: false,
          dressing_needs_help_coordinating_colors: false,
          dressing_needs_daily_clothing: false,
          dressing_needs_doing_buttons: false,
          dressing_needs_pulling_trousers: false,
          dressing_needs_clothes_cleanliness: false,
        },
        groomingAndHygiene: {
          grooming_and_hygiene_independent: false,
          grooming_and_hygiene_direction: false,
          grooming_and_hygiene_req_assistance_toothbrush: false,
          grooming_and_hygiene_req_assistance_using_razor: false,
          grooming_and_hygiene_total_assistance: false,
          grooming_and_hygiene_resists: false,
        },
        eating: "Independent",
        "eating_cutting_up/pureeing_food": false,
        bladder_control: "Totally Continent",
        bowel_control: "Has Total Control",
        toileting: {
          toileting_requires_raised_toilet_seat_or_commode: false,
          toileting_has_difficulty_with_buttons_and_zippers: false,
          toileting_needs_help_with_aids: false,
          toileting_needs_help_with_aids: false,
          toileting_other: false,
          other_toileting: "",
        },
        exercising: {
          exercising_exercises: "",
          exercising_time: false,
          exercising_recent_changes: false,
          exercising_alone: false,
          exercising_with_attendant: false,
          exercising_other: false,
          about_exercise: "",
          other_exercise: "",
          time_exercising: "",
          recent_changes_exercising: "",
        },
      },
      instrumentalActivitiesOfDailyLiving: {
        preparing_food: "Independent",
        house_keeping: "Independent",
        shopping: "Independent",
        transportation: "Independent",
        telephone: "Independent",
        medication: "Completely Responsible for Self",
      },
      attendantProfile: {
        attendants: {
          attendant_independent: false,
          attendant_needs_an_attendant: false,
        },
        frequency_of_attendant_assistance: "",
        attendant_needs_met_by: "",
        other_attendant: "",
      },
      socialProfile: {
        housing: "House",
        housing_area: "Urban",
        housing_ownership: "Self Owned",
        other_housing: "",
        living_companion: "Lives Alone",
        principal_helper: "",
        religion: "",
        ethnicity: "",
      },
      orders_for_discipline: `RN is to assess the patient on admission; every 4 - 6 months, as needed such as change in patient condition, or post hospitalization/ rehab. Supervise PCA/HHA every 3/6 months or as needed per patient condition.\n\nPCA: To assist patient with ADLs/IADLs for 4-7 days per week, 4-7 hrs per visit.`,
      goals_plans: `Assist with ADLs, Fall Prevention, Maintain adequate nutrition and hydration, keep patient encouraged and motivated. watch for any unusual signs and symptoms, and if noted, report to the supervising RN.`,
      vaccinationStatus: {
        covid_19_vaccine: "Yes",
        flu_vaccine: "Yes",
        pneumococcal_vaccine: "Yes",
      },
      nurse_signature: "",
      date_hha_received: "",
      date_verbal_soc: "",
      note_for_physician: "",
    });
    setIsTouched({
      consumerDiagnosis: {
        consumer_primary_diagnosis_code: false,
        consumer_primary_diagnosis: false,
        consumer_secondary_diagnosis_code: false,
        consumer_secondary_diagnosis: false,
        consumer_tos: false,
        consumer_los: false,
      },
    });
  };

  return (
    <NursingAssessmentContext.Provider
      value={{
        nursingFields,
        setNursingFields,
        onAddMedication,
        onMedicalInfoChange,
        onDentalCareChange,
        onGenericChange,
        onVisionChange,
        onVisionVisionsChange,
        onHearingChange,
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
        onSmokingHabitsChange,
        onAlcoholConsumptionChange,
        onDietsChange,
        onGenericDietChange,
        onEatingHabitsChange,
        onLanguagesChange,
        onOtherLanguagesChange,
        onCommunicationChange,
        onMobilityAidsChange,
        onOtherMobilityAidsChange,
        onActivitiesOfDailyLivingChange,
        onActivitiesOfDailyLivingCheckboxChange,
        onBathingChange,
        onOtherBathingChange,
        onDressingChange,
        onGroomingAndHygieneChange,
        onToiletingChange,
        onOtherToiletingChange,
        onExercisingChange,
        onAboutExercisingChange,
        onInstrumentalActivitiesChange,
        onAttendantProfileGenericChange,
        onAttendantProfileCheckboxesChange,
        onSocialProfileGenericChange,
        onVaccinationStatusChange,
        onSignsClear,
        onSignsEnd,
        onMedicationsChange,
        createNursingAssessment,
        onConsumerDiagnosisChange,
        readNursingAssessment,
        onDentalStateChange,
        onHearingHearingsChange,
        onTransferringChange,
        onTransferringGenericChange,
        updateNursingAssessment,
        resetState,
        isConsumerDiagnosisFilled,
        isTouched,
      }}
    >
      {children}
    </NursingAssessmentContext.Provider>
  );
}
