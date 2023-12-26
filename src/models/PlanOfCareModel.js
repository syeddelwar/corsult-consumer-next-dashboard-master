const mongoose = require("mongoose");
const PlanOfCareModel = new mongoose.Schema(
  {
    consumer_contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer_contracts",
      unique: true,
    },
    functionalLimitations: {
      functional_limitation_hearing: {
        type: Boolean,
        default: false,
      },
      functional_limitation_speech: {
        type: Boolean,
        default: false,
      },
      functional_limitation_vision: {
        type: Boolean,
        default: false,
      },
      functional_limitation_mobility: {
        type: Boolean,
        default: false,
      },
      functional_limitation_swallowing: {
        type: Boolean,
        default: false,
      },
      functional_limitation_breathing: {
        type: Boolean,
        default: false,
      },
      functional_limitation_cognition: {
        type: Boolean,
        default: false,
      },
      functional_limitation_performing_activities_of_daily_living: {
        type: Boolean,
        default: false,
      },
    },
    allergies: {
      type: String,
    },
    allergies_no: {
      type: String,
    },
    medication_allergies: {
      type: String,
    },
    special_diet: {
      type: String,
    },
    special_diet_text: {
      type: String,
    },
    personalCare: {
      cares: {
        care_brush_teeth: {
          type: Boolean,
          default: false,
        },
        "care_clean_hearing_aid(s)": {
          type: Boolean,
          default: false,
        },
        care_clean_nasal_cannula: {
          type: Boolean,
          default: false,
        },
        "care_shave_(electric)": {
          type: Boolean,
          default: false,
        },
        care_routine_skin_care: {
          type: Boolean,
          default: false,
        },
        "care_dressing/undressing": {
          type: Boolean,
          default: false,
        },
        "care_nail_care_(filing,do_not_cut)": {
          type: Boolean,
          default: false,
        },
        care_foot_care: {
          type: Boolean,
          default: false,
        },
        frequencies: {
          brush_teeth_frequency: {
            type: String,
          },
          "clean_hearing_aid(s)_frequency": {
            type: String,
          },
          clean_nasal_cannula_frequency: {
            type: String,
          },
          "shave_(electric)_frequency": {
            type: String,
          },
          routine_skin_care_frequency: {
            type: String,
          },
          "dressing/undressing_frequency": {
            type: String,
          },
          "nail_care_(filing,do_not_cut)_frequency": {
            type: String,
          },
          foot_care_frequency: {
            type: String,
          },
        },
      },
      baths: {
        care_bed: {
          type: Boolean,
          default: false,
        },
        care_sponge: {
          type: Boolean,
          default: false,
        },
        care_tub: {
          type: Boolean,
          default: false,
        },
        care_shower: {
          type: Boolean,
          default: false,
        },
        bath_frequency: { type: String },
      },
      hairCare: {
        care_wash: {
          type: Boolean,
          default: false,
        },
        care_shampoo: {
          type: Boolean,
          default: false,
        },
        hair_frequency: { type: String },
      },
      toiletings: {
        care_toilet: {
          type: Boolean,
          default: false,
        },
        care_bedside_commode: {
          type: Boolean,
          default: false,
        },
        care_bedpan: {
          type: Boolean,
          default: false,
        },
        care_urinal: {
          type: Boolean,
          default: false,
        },
        care_toilet_hygiene: {
          type: Boolean,
          default: false,
        },
        toileting_frequency: { type: String },
      },
      incontinent: {
        care_changing_diapers: {
          type: Boolean,
          default: false,
        },
        care_skin_care: {
          type: Boolean,
          default: false,
        },
        incontinent_frequency: { type: String },
      },
    },
    nutrition: {
      meal_preparation_breakfast: {
        type: Boolean,
        default: false,
      },
      meal_preparation_lunch: {
        type: Boolean,
        default: false,
      },
      meal_preparation_dinner: {
        type: Boolean,
        default: false,
      },
      meal_preparation_food_for_next_day: {
        type: Boolean,
        default: false,
      },
      meal_preparation_frequency: {
        type: String,
      },
      feedings_reinforce_diet: {
        type: Boolean,
        default: false,
      },
      feedings_serving: {
        type: Boolean,
        default: false,
      },
      feedings_clean_up: {
        type: Boolean,
        default: false,
      },
      feeding_frequency: {
        type: String,
      },
      fluids: {
        type: String,
      },
      fluids_encourage: {
        type: Boolean,
        default: false,
      },
      fluids_restrict: {
        type: Boolean,
        default: false,
      },
      other_nutrition: {
        type: String,
      },
      other_frequency: {
        type: String,
      },
    },
    activitiesDevices: {
      p_of_c_ambulations_walking: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_rollator: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_walker: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_cane: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_wheelchair: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_complete_bedrest: {
        type: Boolean,
        default: false,
      },
      "p_of_c_ambulations_turning/positioning": {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_transferring: {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_take_client_for_walk: {
        type: Boolean,
        default: false,
      },
      "p_of_c_ambulations_supervision/assistance_with_exercise_and_therapy": {
        type: Boolean,
        default: false,
      },
      p_of_c_ambulations_other: {
        type: Boolean,
        default: false,
      },
      complete_bedrest_frequency: {
        type: String,
      },
      "turning/positioning_frequency": {
        type: String,
      },
      transferring_frequency: {
        type: String,
      },
      take_client_for_walk_frequency: {
        type: String,
      },
      "supervision/assistance_with_exercise_and_therapy_frequency": {
        type: String,
      },
      other_frequency: {
        type: String,
      },
      ambulation_frequency: {
        type: String,
      },
      weight_restriction: {
        type: String,
      },
      bed_rest_with_bath: {
        type: String,
      },
      tolerated: {
        type: String,
      },
    },
    relatedDuties: {
      duties_medication_reminding: {
        type: Boolean,
        default: false,
      },
      duties_pick_up_mall: {
        type: Boolean,
        default: false,
      },
      duties_grocery_shopping: {
        type: Boolean,
        default: false,
      },
      duties_trash_management: {
        type: Boolean,
        default: false,
      },
      duties_other: {
        type: Boolean,
        default: false,
      },
      other_related_duties: {
        type: String,
      },
      medication_reminding_frequency: {
        type: String,
      },
      pick_up_mall_frequency: {
        type: String,
      },
      grocery_shopping_frequency: {
        type: String,
      },
      trash_management_frequency: {
        type: String,
      },
      other_frequency: {
        type: String,
      },
    },
    homeVisit: {
      home_related_friendly_home_visit_check: {
        type: Boolean,
        default: false,
      },
      "home_related_telephone_check/monitor": {
        type: Boolean,
        default: false,
      },
      home_related_other: {
        type: Boolean,
        default: false,
      },
      other_home_related: {
        type: String,
      },
      friendly_home_visit_check_frequency: {
        type: String,
      },
      "telephone_check/monitor_frequency": {
        type: String,
      },
      other_frequency: {
        type: String,
      },
    },
    homemakingTasks: {
      home_making_task_make_bed: {
        type: Boolean,
        default: false,
      },
      home_making_task_change_linen: {
        type: Boolean,
        default: false,
      },
      home_making_task_laundry: {
        type: Boolean,
        default: false,
      },
      "home_making_task_vaccum/sweep_floors": {
        type: Boolean,
        default: false,
      },
      home_making_task_dust_furniture: {
        type: Boolean,
        default: false,
      },
      "home_making_task_clean_oven/microwave": {
        type: Boolean,
        default: false,
      },
      home_making_task_wet_mop_floors: {
        type: Boolean,
        default: false,
      },
      home_making_task_clean_kitchen_surfaces: {
        type: Boolean,
        default: false,
      },
      home_making_task_clean_bathroom_sink: {
        type: Boolean,
        default: false,
      },
      "home_making_task_clean_bathtub/shower": {
        type: Boolean,
        default: false,
      },
      home_making_task_clean_toilet: {
        type: Boolean,
        default: false,
      },
      home_making_task_other: {
        type: Boolean,
        default: false,
      },
      home_making_task_other_text: {
        type: String,
      },
      homemaking_noted: {
        type: String,
      },
      make_bed_frequency: {
        type: String,
      },
      change_linen_frequency: {
        type: String,
      },
      laundry_frequency: {
        type: String,
      },
      light_housekeeping_frequency: {
        type: String,
      },
      other_frequency: {
        type: String,
      },
    },
    info_provided_to_client_roles_and_responsibilities: {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_code_of_ethics: {
      type: Boolean,
      default: false,
    },
    "info_provided_to_client_costs_&_billing": {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_confidentiality_of_client_information: {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_contact_information: {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_client_consent: {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_other: {
      type: Boolean,
      default: false,
    },
    info_provided_to_client_other_text: {
      type: String,
    },
    number_of_times_supervisor_will_review: {
      type: String,
    },
    service_plan_designer_name: {
      type: String,
    },
    title_of_agency_represent: {
      type: String,
    },
    service_date_start: {
      type: String,
    },
    service_date_end: {
      type: String,
    },
    days_of_service: {
      type: String,
    },
    service_start_time: {
      type: String,
    },
    service_end_time: {
      type: String,
    },
    authorized_hours: {
      type: String,
    },
    service_date_end: {
      type: String,
    },
    verbal_consent: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.plan_of_care ||
  mongoose.model("plan_of_care", PlanOfCareModel);
