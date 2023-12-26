const mongoose = require("mongoose");
const NursingAssessmentModel = new mongoose.Schema(
  {
    consumer_contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer_contracts",
      unique: true,
    },
    consumerDiagnosis: {
      consumer_primary_diagnosis_code: {
        type: String,
        unique: true,
      },
      consumer_primary_diagnosis: {
        type: String,
      },
      consumer_secondary_diagnosis_code: {
        type: String,
        unique: true,
      },
      consumer_secondary_diagnosis: {
        type: String,
      },
      consumer_tos: {
        type: String,
      },
      consumer_los: {
        type: String,
      },
    },
    medicalInfo: {
      notes_one: {
        type: String,
      },
      notes_two: {
        type: String,
      },
      notes_three: {
        type: String,
      },
      notes_four: {
        type: String,
      },
      height_inch: {
        type: String,
      },
      height_feet: {
        type: String,
      },
      weight: {
        type: String,
      },
      weight_status: {
        type: String,
      },
      reason_for_weight_change: {
        type: String,
      },
      blood_pressure_upper: {
        type: String,
      },
      blood_pressure_lower: {
        type: String,
      },
      pulse: {
        type: String,
      },
      respirations: {
        type: String,
      },
      temperature: {
        type: String,
      },
      pain_status: {
        type: String,
      },
      level_of_pain: {
        type: String,
      },
      location_and_description: {
        type: String,
      },
      history_of_present_illness: {
        type: String,
      },
      past_history: {
        type: String,
      },
      family_and_personal_history: {
        type: String,
      },
      general_appearance: {
        type: String,
      },
      skin: {
        type: String,
      },
      heent: {
        type: String,
      },
      neck: {
        type: String,
      },
      chest_and_lungs: {
        type: String,
      },
      cardiovascular: {
        type: String,
      },
      abdomen: {
        type: String,
      },
      genitourinary: {
        type: String,
      },
      rectal: {
        type: String,
      },
      neurological: {
        type: String,
      },
    },
    medications: [
      {
        medication: {
          type: String,
        },
        dose: {
          type: String,
        },
        frequency: {
          type: String,
        },
        route: {
          type: String,
        },
      },
    ],
    prognosis: {
      type: String,
    },
    medication_allergies: {
      type: String,
    },
    safety_measures: {
      type: String,
    },
    dentalCare: {
      dental_problem: {
        type: String,
      },
      care_of_dentist: {
        type: String,
      },
      dentalState: {
        dental_state_no_dentures: {
          type: Boolean,
          default: false,
        },
        dental_state_dentures_damaged: {
          type: Boolean,
          default: false,
        },
        dental_state_full_upper: {
          type: Boolean,
          default: false,
        },
        dental_state_full_lower: {
          type: Boolean,
          default: false,
        },
        dental_state_partial_denture: {
          type: Boolean,
          default: false,
        },
        dental_state_not_wearing_dentures: {
          type: Boolean,
          default: false,
        },
        dental_state_no_teeth: {
          type: Boolean,
          default: false,
        },
      },
      client_chew: {
        type: String,
      },
      dentist_name: {
        type: String,
      },
      dentist_phone_no: {
        type: String,
      },
      dental_visit: {
        type: String,
      },
      dentist_next_appointment: {
        type: String,
      },
    },
    vision: {
      vision: {
        vision_unimpaired: {
          type: Boolean,
          default: false,
        },
        "vision_blind_-_safe_in_familiar_locale": {
          type: Boolean,
          default: false,
        },
        vision_adequate_for_personal_safety: {
          type: Boolean,
          default: false,
        },
        "vision_blind_-_requires_assistance": {
          type: Boolean,
          default: false,
        },
        vision_distinguishes_only_light_or_dark: {
          type: Boolean,
          default: false,
        },
      },
      wear_glasses: {
        type: String,
      },
      ophthalmologist_name: {
        type: String,
      },
      ophthalmologist_phone_no: {
        type: String,
      },
      ophthalmologist_visit: {
        type: String,
      },
      ophthalmologist_next_appointment: {
        type: String,
      },
    },
    hearing: {
      hearing: {
        hearing_unimpaired: {
          type: Boolean,
          default: false,
        },
        hearing_mild_impairment: {
          type: Boolean,
          default: false,
        },
        hearing_moderate_impairment_but_not_a_threat_to_safety: {
          type: Boolean,
          default: false,
        },
        "hearing_impaired_-_safety_threat_exists": {
          type: Boolean,
          default: false,
        },
        hearing_totally_deaf: {
          type: Boolean,
          default: false,
        },
      },
      uses_hearing_aids: {
        type: String,
      },
      ent_name: {
        type: String,
      },
      ent_phone_no: {
        type: String,
      },
      ent_visit: {
        type: String,
      },
      ent_next_appointment: {
        type: String,
      },
    },
    mentalHealth: {
      attitudes: {
        attitude_cooperative: {
          type: Boolean,
          default: false,
        },
        attitude_indifferent: {
          type: Boolean,
          default: false,
        },
        attitude_resistive: {
          type: Boolean,
          default: false,
        },
        attitude_demanding: {
          type: Boolean,
          default: false,
        },
        attitude_suspicious: {
          type: Boolean,
          default: false,
        },
        attitude_hostile: {
          type: Boolean,
          default: false,
        },
      },
      appearances: {
        type: String,
      },
      selfDirection: {
        type: String,
      },
      behaviors: {
        behavior_normal: {
          type: Boolean,
          default: false,
        },
        behavior_wandering: {
          type: Boolean,
          default: false,
        },
        behavior_sun_downing: {
          type: Boolean,
          default: false,
        },
        behavior_restless: {
          type: Boolean,
          default: false,
        },
        behavior_hostile: {
          type: Boolean,
          default: false,
        },
        behavior_withdrawn: {
          type: Boolean,
          default: false,
        },
        behavior_self_destructive: {
          type: Boolean,
          default: false,
        },
        behavior_safety_hazard: {
          type: Boolean,
          default: false,
        },
        behavior_aggressive: {
          type: Boolean,
          default: false,
        },
        behavior_verbal: {
          type: Boolean,
          default: false,
        },
        behavior_physical: {
          type: Boolean,
          default: false,
        },
      },
      influences: {
        influence_appropriate: {
          type: Boolean,
          default: false,
        },
        influence_inappropriate: {
          type: Boolean,
          default: false,
        },
        influence_anxious: {
          type: Boolean,
          default: false,
        },
        influence_blunted: {
          type: Boolean,
          default: false,
        },
        influence_euphoric: {
          type: Boolean,
          default: false,
        },
        influence_depressed: {
          type: Boolean,
          default: false,
        },
        influence_angry: {
          type: Boolean,
          default: false,
        },
        influence_mood_swings: {
          type: Boolean,
          default: false,
        },
      },
      thoughtContent: {
        type: String,
      },
      perceptions: {
        perception_normal: {
          type: Boolean,
          default: false,
        },
        perception_hallucinations: {
          type: Boolean,
          default: false,
        },
        perception_auditory: {
          type: Boolean,
          default: false,
        },
        perception_visual: {
          type: Boolean,
          default: false,
        },
        perception_other: {
          type: Boolean,
          default: false,
        },
      },
      cognitions: {
        type: String,
      },
      insights: {
        type: String,
      },
      judgement: {
        type: String,
      },
    },
    smokingHabits: {
      client_smokes: {
        type: String,
      },
      smokes_degree_of_problem: {
        type: String,
      },
    },
    alcoholConsumption: {
      client_drinks: {
        type: String,
      },
      drinks_degree_of_problem: {
        type: String,
      },
    },
    diets: {
      diet_regular: {
        type: Boolean,
        default: false,
      },
      diet_low_salt: {
        type: Boolean,
        default: false,
      },
      diet_diabetic: {
        type: Boolean,
        default: false,
      },
      diet_vegetarian: {
        type: Boolean,
        default: false,
      },
      diet_low_fat: {
        type: Boolean,
        default: false,
      },
      diet_other: {
        type: Boolean,
        default: false,
      },
      other_diet: {
        type: String,
      },
      client_takes_supplement: {
        type: String,
      },
      client_nutritional_requirements: {
        type: String,
      },
    },
    eatingHabits: {
      eating_habit: {
        type: String,
      },
      eating_habits_comment: {
        type: String,
      },
    },
    communication: {
      languages: {
        language_english: {
          type: Boolean,
          default: false,
        },
        language_italian: {
          type: Boolean,
          default: false,
        },
        language_french: {
          type: Boolean,
          default: false,
        },
        language_spanish: {
          type: Boolean,
          default: false,
        },
        language_chinese: {
          type: Boolean,
          default: false,
        },
        language_russian: {
          type: Boolean,
          default: false,
        },
        language_japanese: {
          type: Boolean,
          default: false,
        },
        language_east_indian: {
          type: Boolean,
          default: false,
        },
        language_other: {
          type: Boolean,
          default: false,
        },
        other_language: {
          type: String,
        },
      },
      speech: {
        type: String,
      },
      method_of_communicating: {
        type: String,
      },
      speech_method: {
        type: String,
      },
      speech_understanding: {
        type: String,
      },
    },
    activitiesOfDailyLiving: {
      mobilityAids: {
        mobility_aids_uses_cane: {
          type: Boolean,
          default: false,
        },
        mobility_aids_uses_walker: {
          type: Boolean,
          default: false,
        },
        mobility_aids_uses_crutches: {
          type: Boolean,
          default: false,
        },
        mobility_aids_uses_manual_wheelchair: {
          type: Boolean,
          default: false,
        },
        mobility_aids_uses_electric_wheelchair: {
          type: Boolean,
          default: false,
        },
        mobility_aids_uses_grab_bars: {
          type: Boolean,
          default: false,
        },
        mobility_aids_others: {
          type: Boolean,
          default: false,
        },
        other_aid: {
          type: String,
        },
      },
      ambulations: {
        type: String,
      },
      transferring: {
        transferring: {
          type: String,
        },
        transferring_needs_supervision_transferring_to_bed: {
          type: Boolean,
          default: false,
        },
        transferring_needs_supervision_transferring_to_chair: {
          type: Boolean,
          default: false,
        },
        transferring_needs_supervision_transferring_to_toilet: {
          type: Boolean,
          default: false,
        },
        transferring_needs_intermittent_assistance_transferring_to_bed: {
          type: Boolean,
          default: false,
        },
        transferring_needs_intermittent_assistance_transferring_to_chair: {
          type: Boolean,
          default: false,
        },
        transferring_needs_intermittent_assistance_transferring_to_toilet: {
          type: Boolean,
          default: false,
        },
        transferring_needs_continued_assistance_transferring_to_bed: {
          type: Boolean,
          default: false,
        },
        transferring_needs_continued_assistance_transferring_to_chair: {
          type: Boolean,
          default: false,
        },
        transferring_needs_continued_assistance_transferring_to_toilet: {
          type: Boolean,
          default: false,
        },
      },
      bathing: {
        bathing_independent_in_bathtub: {
          type: Boolean,
          default: false,
        },
        bathing_independent_with_mech_aids: {
          type: Boolean,
          default: false,
        },
        bathing_getting_in_out_tub: {
          type: Boolean,
          default: false,
        },
        bathing_turning_taps_on_off: {
          type: Boolean,
          default: false,
        },
        bathing_back: {
          type: Boolean,
          default: false,
        },
        bathing_req_continued_assistance: {
          type: Boolean,
          default: false,
        },
        bathing_resists_assistance: {
          type: Boolean,
          default: false,
        },
        bathing_other: {
          type: Boolean,
          default: false,
        },
        other_bathing: {
          type: String,
        },
      },
      dressing: {
        dressing_independent: {
          type: Boolean,
          default: false,
        },
        dressing_needs_help_selecting_clothes: {
          type: Boolean,
          default: false,
        },
        dressing_needs_help_coordinating_colors: {
          type: Boolean,
          default: false,
        },
        dressing_needs_daily_clothing: {
          type: Boolean,
          default: false,
        },
        dressing_needs_doing_buttons: {
          type: Boolean,
          default: false,
        },
        dressing_needs_pulling_trousers: {
          type: Boolean,
          default: false,
        },
        dressing_needs_clothes_cleanliness: {
          type: Boolean,
          default: false,
        },
      },
      groomingAndHygiene: {
        grooming_and_hygiene_independent: {
          type: Boolean,
          default: false,
        },
        grooming_and_hygiene_direction: {
          type: Boolean,
          default: false,
        },
        grooming_and_hygiene_req_assistance_toothbrush: {
          type: Boolean,
          default: false,
        },
        grooming_and_hygiene_req_assistance_using_razor: {
          type: Boolean,
          default: false,
        },
        grooming_and_hygiene_total_assistance: {
          type: Boolean,
          default: false,
        },
        grooming_and_hygiene_resists: {
          type: Boolean,
          default: false,
        },
      },
      eating: {
        type: String,
      },
      "eating_cutting_up/pureeing_food": {
        type: Boolean,
        default: false,
      },
      bladder_control: {
        type: String,
      },
      bowel_control: {
        type: String,
      },
      toileting: {
        toileting_requires_raised_toilet_seat_or_commode: {
          type: Boolean,
          default: false,
        },
        toileting_has_difficulty_with_buttons_and_zippers: {
          type: Boolean,
          default: false,
        },
        toileting_needs_help_with_aids: {
          type: Boolean,
          default: false,
        },
        toileting_needs_help_with_aids: {
          type: Boolean,
          default: false,
        },
        toileting_other: {
          type: Boolean,
          default: false,
        },
        other_toileting: {
          type: String,
        },
      },
      exercising: {
        exercising_exercises: {
          type: String,
        },
        exercising_time: {
          type: Boolean,
          default: false,
        },
        exercising_recent_changes: {
          type: Boolean,
          default: false,
        },
        exercising_alone: {
          type: Boolean,
          default: false,
        },
        exercising_with_attendant: {
          type: Boolean,
          default: false,
        },
        exercising_other: {
          type: Boolean,
          default: false,
        },
        about_exercise: {
          type: String,
        },
        other_exercise: {
          type: String,
        },
        time_exercising: {
          type: String,
        },
        recent_changes_exercising: {
          type: String,
        },
      },
    },
    instrumentalActivitiesOfDailyLiving: {
      preparing_food: {
        type: String,
      },
      house_keeping: {
        type: String,
      },
      shopping: {
        type: String,
      },
      transportation: {
        type: String,
      },
      telephone: {
        type: String,
      },
      medication: {
        type: String,
      },
    },
    attendantProfile: {
      attendants: {
        attendant_independent: {
          type: Boolean,
          default: false,
        },
        attendant_needs_an_attendant: {
          type: Boolean,
          default: false,
        },
      },
      frequency_of_attendant_assistance: {
        type: String,
      },
      attendant_needs_met_by: {
        type: String,
      },
      other_attendant: {
        type: String,
      },
    },
    socialProfile: {
      housing: {
        type: String,
      },
      housing_area: {
        type: String,
      },
      housing_ownership: {
        type: String,
      },
      other_housing: {
        type: String,
      },
      living_companion: {
        type: String,
      },
      principal_helper: {
        type: String,
      },
      religion: {
        type: String,
      },
      ethnicity: {
        type: String,
      },
    },
    orders_for_discipline: {
      type: String,
    },
    goals_plans: {
      type: String,
    },
    vaccinationStatus: {
      covid_19_vaccine: {
        type: String,
      },
      flu_vaccine: {
        type: String,
      },
      pneumococcal_vaccine: {
        type: String,
      },
    },
    nurse_signature: {
      type: String,
    },
    date_hha_received: {
      type: String,
    },
    date_verbal_soc: {
      type: String,
    },

    note_for_physician: {
      type: String,
    },
    notes_living_habits: {
      type: String,
    },
    notes_living_communications: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.nursing_assessment ||
  mongoose.model("nursing_assessment", NursingAssessmentModel);
