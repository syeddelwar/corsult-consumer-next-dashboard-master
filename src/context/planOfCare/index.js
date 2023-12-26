import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { usePlanOfCare } from "@/hooks/planOfCare";

export const PlanOfCareContext = createContext();

export default function PlanOfCareState({ children }) {
  // Contexts
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const { create, readLoggedInPOC, read, update } = usePlanOfCare();

  const [careFields, setCareFields] = useState({
    consumer_contract_id: "",
    functionalLimitations: {
      functional_limitation_hearing: false,
      functional_limitation_speech: false,
      functional_limitation_vision: false,
      functional_limitation_mobility: false,
      functional_limitation_swallowing: false,
      functional_limitation_breathing: false,
      functional_limitation_cognition: false,
      functional_limitation_performing_activities_of_daily_living: false,
    },
    allergies: "Yes",
    allergies_no: "",
    medication_allergies: "",
    special_diet: "Yes",
    special_diet_text: "",

    personalCare: {
      cares: {
        care_brush_teeth: false,
        "care_clean_hearing_aid(s)": false,
        care_clean_nasal_cannula: false,
        "care_shave_(electric)": false,
        care_routine_skin_care: false,
        "care_dressing/undressing": false,
        "care_nail_care_(filing,do_not_cut)": false,
        care_foot_care: false,
        frequencies: {
          brush_teeth_frequency: "",
          "clean_hearing_aid(s)_frequency": "",
          clean_nasal_cannula_frequency: "",
          "shave_(electric)_frequency": "",
          routine_skin_care_frequency: "",
          "dressing/undressing_frequency": "",
          "nail_care_(filing,do_not_cut)_frequency": "",
          foot_care_frequency: "",
        },
      },
      baths: {
        care_bed: false,
        care_sponge: false,
        care_tub: false,
        care_shower: false,
        bath_frequency: "",
      },
      hairCare: {
        care_wash: false,
        care_shampoo: false,
        hair_frequency: "",
      },
      toiletings: {
        care_toilet: false,
        care_bedside_commode: false,
        care_bedpan: false,
        care_urinal: false,
        care_toilet_hygiene: false,
        toileting_frequency: "",
      },
      incontinent: {
        care_changing_diapers: false,
        care_skin_care: false,
        incontinent_frequency: "",
      },
    },
    nutrition: {
      meal_preparation_breakfast: false,
      meal_preparation_lunch: false,
      meal_preparation_dinner: false,
      meal_preparation_food_for_next_day: false,
      meal_preparation_frequency: "",
      feedings_reinforce_diet: false,
      feedings_serving: false,
      feedings_clean_up: false,
      feeding_frequency: "",
      fluids: "Yes",
      fluids_encourage: false,
      fluids_restrict: false,
      other_nutrition: "",
      other_frequency: "",
    },
    activitiesDevices: {
      p_of_c_ambulations_walking: false,
      p_of_c_ambulations_rollator: false,
      p_of_c_ambulations_walker: false,
      p_of_c_ambulations_cane: false,
      p_of_c_ambulations_wheelchair: false,
      p_of_c_ambulations_complete_bedrest: false,
      "p_of_c_ambulations_turning/positioning": false,
      p_of_c_ambulations_transferring: false,
      p_of_c_ambulations_take_client_for_walk: false,
      "p_of_c_ambulations_supervision/assistance_with_exercise_and_therapy": false,
      p_of_c_ambulations_other: false,
      complete_bedrest_frequency: "",
      "turning/positioning_frequency": "",
      transferring_frequency: "",
      take_client_for_walk_frequency: "",
      "supervision/assistance_with_exercise_and_therapy_frequency": "",
      other_frequency: "",
      ambulation_frequency: "",
      weight_restriction: "Yes",
      bed_rest_with_bath: "Yes",
      tolerated: "Yes",
    },
    relatedDuties: {
      duties_medication_reminding: false,
      duties_pick_up_mall: false,
      duties_grocery_shopping: false,
      duties_trash_management: false,
      duties_other: false,
      other_related_duties: "",
      medication_reminding_frequency: "",
      pick_up_mall_frequency: "",
      grocery_shopping_frequency: "",
      trash_management_frequency: "",
      other_frequency: "",
    },
    homeVisit: {
      home_related_friendly_home_visit_check: false,
      "home_related_telephone_check/monitor": false,
      home_related_other: false,
      other_home_related: "",
      friendly_home_visit_check_frequency: "",
      "telephone_check/monitor_frequency": "",
      other_frequency: "",
    },
    homemakingTasks: {
      home_making_task_make_bed: false,
      home_making_task_change_linen: false,
      home_making_task_laundry: false,
      "home_making_task_vaccum/sweep_floors": false,
      home_making_task_dust_furniture: false,
      "home_making_task_clean_oven/microwave": false,
      home_making_task_wet_mop_floors: false,
      home_making_task_clean_kitchen_surfaces: false,
      home_making_task_clean_bathroom_sink: false,
      "home_making_task_clean_bathtub/shower": false,
      home_making_task_clean_toilet: false,
      home_making_task_other: false,
      home_making_task_other_text: "",
      homemaking_noted: "",
      make_bed_frequency: "",
      change_linen_frequency: "",
      laundry_frequency: "",
      light_housekeeping_frequency: "",
      other_frequency: "",
    },
    info_provided_to_client_roles_and_responsibilities: false,
    info_provided_to_client_code_of_ethics: false,
    "info_provided_to_client_costs_&_billing": false,
    info_provided_to_client_confidentiality_of_client_information: false,
    info_provided_to_client_contact_information: false,
    info_provided_to_client_client_consent: false,
    info_provided_to_client_other: false,
    info_provided_to_client_other_text: "",
    number_of_times_supervisor_will_review: "",
    service_plan_designer_name: "",
    title_of_agency_represent: "",
    service_date_start: "",
    service_date_end: "",
    days_of_service: "",
    service_start_time: "",
    service_end_time: "",
    authorized_hours: "",
    verbal_consent: "Yes",
  });

  // On Generic Change
  const onGenericChange = (e) => {
    setCareFields({
      ...careFields,
      [e.target.name]: e.target.value,
    });
  };
  // On Other Generic Change
  const onOtherGenericChange = (e) => {
    setCareFields({
      ...careFields,
      [e.target.name]: e.target.checked,
    });
  };
  // On Functional Limitations Change
  const onFunctionalLimitationsChange = (e) => {
    setCareFields({
      ...careFields,
      functionalLimitations: {
        ...careFields.functionalLimitations,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Cares Change
  const onCaresChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        cares: {
          ...careFields.personalCare.cares,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Cares Frequencies Change
  const onCaresFrequenciesChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        cares: {
          ...careFields.personalCare.cares,
          frequencies: {
            ...careFields.personalCare.cares.frequencies,
            [e.target.name]: e.target.value,
          },
        },
      },
    });
  };
  // On Baths Change
  const onBathsChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        baths: {
          ...careFields.personalCare.baths,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Baths Frequency Change
  const onBathsGenericChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        baths: {
          ...careFields.personalCare.baths,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Hair Care Change
  const onHairCareChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        hairCare: {
          ...careFields.personalCare.hairCare,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Hair Care Change
  const onHairCareGenericChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        hairCare: {
          ...careFields.personalCare.hairCare,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Toiletings Change
  const onToiletingsChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        toiletings: {
          ...careFields.personalCare.toiletings,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  const onToiletingsGenericChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        toiletings: {
          ...careFields.personalCare.toiletings,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Incontinents Change
  const onIncontinentChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        incontinent: {
          ...careFields.personalCare.incontinent,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  const onIncontinentGenericChange = (e) => {
    setCareFields({
      ...careFields,
      personalCare: {
        ...careFields.personalCare,
        incontinent: {
          ...careFields.personalCare.incontinent,
          [e.target.name]: e.target.value,
        },
      },
    });
  };
  // On Nutrition Change
  const onNutritionChange = (e) => {
    setCareFields({
      ...careFields,
      nutrition: {
        ...careFields.nutrition,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Other Nutrition Change
  const onOtherNutritionChange = (e) => {
    setCareFields({
      ...careFields,
      nutrition: {
        ...careFields.nutrition,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Activities Devices Change
  const onActivitiesDevicesChange = (e) => {
    setCareFields({
      ...careFields,
      activitiesDevices: {
        ...careFields.activitiesDevices,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Other Activities Devices Change
  const onOtherActivitiesDevicesChange = (e) => {
    setCareFields({
      ...careFields,
      activitiesDevices: {
        ...careFields.activitiesDevices,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Related Duties Change
  const onRelatedDutiesChange = (e) => {
    setCareFields({
      ...careFields,
      relatedDuties: {
        ...careFields.relatedDuties,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Other Related Duties Change
  const onOtherRelatedDutiesChange = (e) => {
    setCareFields({
      ...careFields,
      relatedDuties: {
        ...careFields.relatedDuties,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Home Visit Change
  const onHomeVisitChange = (e) => {
    setCareFields({
      ...careFields,
      homeVisit: {
        ...careFields.homeVisit,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Other Home Visit Change
  const onOtherHomeVisitChange = (e) => {
    setCareFields({
      ...careFields,
      homeVisit: {
        ...careFields.homeVisit,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Home Making Task Change
  const onHomeMakingTaskChange = (e) => {
    setCareFields({
      ...careFields,
      homemakingTasks: {
        ...careFields.homemakingTasks,
        [e.target.name]: e.target.checked,
      },
    });
  };
  // On Other Home Making Task Change
  const onOtherHomeMakingTaskChange = (e) => {
    setCareFields({
      ...careFields,
      homemakingTasks: {
        ...careFields.homemakingTasks,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Plan Of Care Continue
  const createCare = () => {
    return create(careFields, user.token);
  };
  // On Plan Of Care Fetch (For AID Login)
  const readLoggedInPlanOfCare = () => {
    return readLoggedInPOC(user.token);
  };

  // On Plan Of Care Read (For ADMIN)
  const readPOC = (consumerContractID) => {
    return read(consumerContractID, user.token);
  };

  // On POC Edit Continue (FOR Admin)
  const updatePlanOfCare = () => {
    return update(careFields._id, user.token, careFields);
  };

  const resetState = () => {
    setCareFields({
      consumer_contract_id: "",
      functionalLimitations: {
        functional_limitation_hearing: false,
        functional_limitation_speech: false,
        functional_limitation_vision: false,
        functional_limitation_mobility: false,
        functional_limitation_swallowing: false,
        functional_limitation_breathing: false,
        functional_limitation_cognition: false,
        functional_limitation_performing_activities_of_daily_living: false,
      },
      allergies: "Yes",
      allergies_no: "",
      medication_allergies: "",
      special_diet: "Yes",
      special_diet_text: "",

      personalCare: {
        cares: {
          care_brush_teeth: false,
          "care_clean_hearing_aid(s)": false,
          care_clean_nasal_cannula: false,
          "care_shave_(electric)": false,
          care_routine_skin_care: false,
          "care_dressing/undressing": false,
          "care_nail_care_(filing,do_not_cut)": false,
          care_foot_care: false,
          frequencies: {
            brush_teeth_frequency: "",
            "clean_hearing_aid(s)_frequency": "",
            clean_nasal_cannula_frequency: "",
            "shave_(electric)_frequency": "",
            routine_skin_care_frequency: "",
            "dressing/undressing_frequency": "",
            "nail_care_(filing,do_not_cut)_frequency": "",
            foot_care_frequency: "",
          },
        },
        baths: {
          care_bed: false,
          care_sponge: false,
          care_tub: false,
          care_shower: false,
          bath_frequency: "",
        },
        hairCare: {
          care_wash: false,
          care_shampoo: false,
          hair_frequency: "",
        },
        toiletings: {
          care_toilet: false,
          care_bedside_commode: false,
          care_bedpan: false,
          care_urinal: false,
          care_toilet_hygiene: false,
          toileting_frequency: "",
        },
        incontinent: {
          care_changing_diapers: false,
          care_skin_care: false,
          incontinent_frequency: "",
        },
      },
      nutrition: {
        meal_preparation_breakfast: false,
        meal_preparation_lunch: false,
        meal_preparation_dinner: false,
        meal_preparation_food_for_next_day: false,
        meal_preparation_frequency: "",
        feedings_reinforce_diet: false,
        feedings_serving: false,
        feedings_clean_up: false,
        feeding_frequency: "",
        fluids: "Yes",
        fluids_encourage: false,
        fluids_restrict: false,
        other_nutrition: "",
        other_frequency: "",
      },
      activitiesDevices: {
        p_of_c_ambulations_walking: false,
        p_of_c_ambulations_rollator: false,
        p_of_c_ambulations_walker: false,
        p_of_c_ambulations_cane: false,
        p_of_c_ambulations_wheelchair: false,
        p_of_c_ambulations_complete_bedrest: false,
        "p_of_c_ambulations_turning/positioning": false,
        p_of_c_ambulations_transferring: false,
        p_of_c_ambulations_take_client_for_walk: false,
        "p_of_c_ambulations_supervision/assistance_with_exercise_and_therapy": false,
        p_of_c_ambulations_other: false,
        complete_bedrest_frequency: "",
        "turning/positioning_frequency": "",
        transferring_frequency: "",
        take_client_for_walk_frequency: "",
        "supervision/assistance_with_exercise_and_therapy_frequency": "",
        other_frequency: "",
        ambulation_frequency: "",
        weight_restriction: "Yes",
        bed_rest_with_bath: "Yes",
        tolerated: "Yes",
      },
      relatedDuties: {
        duties_medication_reminding: false,
        duties_pick_up_mall: false,
        duties_grocery_shopping: false,
        duties_trash_management: false,
        duties_other: false,
        other_related_duties: "",
        medication_reminding_frequency: "",
        pick_up_mall_frequency: "",
        grocery_shopping_frequency: "",
        trash_management_frequency: "",
        other_frequency: "",
      },
      homeVisit: {
        home_related_friendly_home_visit_check: false,
        "home_related_telephone_check/monitor": false,
        home_related_other: false,
        other_home_related: "",
        friendly_home_visit_check_frequency: "",
        "telephone_check/monitor_frequency": "",
        other_frequency: "",
      },
      homemakingTasks: {
        home_making_task_make_bed: false,
        home_making_task_change_linen: false,
        home_making_task_laundry: false,
        "home_making_task_vaccum/sweep_floors": false,
        home_making_task_dust_furniture: false,
        "home_making_task_clean_oven/microwave": false,
        home_making_task_wet_mop_floors: false,
        home_making_task_clean_kitchen_surfaces: false,
        home_making_task_clean_bathroom_sink: false,
        "home_making_task_clean_bathtub/shower": false,
        home_making_task_clean_toilet: false,
        home_making_task_other: false,
        home_making_task_other_text: "",
        homemaking_noted: "",
        make_bed_frequency: "",
        change_linen_frequency: "",
        laundry_frequency: "",
        light_housekeeping_frequency: "",
        other_frequency: "",
      },
      info_provided_to_client_roles_and_responsibilities: false,
      info_provided_to_client_code_of_ethics: false,
      "info_provided_to_client_costs_&_billing": false,
      info_provided_to_client_confidentiality_of_client_information: false,
      info_provided_to_client_contact_information: false,
      info_provided_to_client_client_consent: false,
      info_provided_to_client_other: false,
      info_provided_to_client_other_text: "",
      number_of_times_supervisor_will_review: "",
      service_plan_designer_name: "",
      title_of_agency_represent: "",
      service_date_start: "",
      service_date_end: "",
      days_of_service: "",
      service_start_time: "",
      service_end_time: "",
      authorized_hours: "",
      verbal_consent: "Yes",
    });
  };

  return (
    <PlanOfCareContext.Provider
      value={{
        onGenericChange,
        careFields,
        setCareFields,
        onFunctionalLimitationsChange,
        onCaresChange,
        onCaresFrequenciesChange,
        onBathsChange,
        onBathsGenericChange,
        onHairCareChange,
        onHairCareGenericChange,
        onToiletingsChange,
        onToiletingsGenericChange,
        onIncontinentChange,
        onIncontinentGenericChange,
        onNutritionChange,
        onOtherNutritionChange,
        onActivitiesDevicesChange,
        onOtherActivitiesDevicesChange,
        onRelatedDutiesChange,
        onOtherRelatedDutiesChange,
        onHomeVisitChange,
        onOtherHomeVisitChange,
        onHomeMakingTaskChange,
        onOtherHomeMakingTaskChange,
        onOtherGenericChange,
        createCare,
        readLoggedInPlanOfCare,
        readPOC,
        updatePlanOfCare,
        resetState,
      }}
    >
      {children}
    </PlanOfCareContext.Provider>
  );
}
