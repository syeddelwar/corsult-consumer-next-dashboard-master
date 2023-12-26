import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { useConsumerContract } from "@/hooks/consumerContract";
import { ErrorMessage } from "@/components/commons";
import { formRequiredFields } from "@/config";
import {
  formatSSN,
  formatUSPhoneNumber,
  isEmail,
  isValidSSN,
  isValidUSNumber,
} from "@/utils";

export const ConsumerContractContext = createContext();

export default function ConsumerContractState({ children }) {
  // Contexts
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const {
    create,
    readLoggedinApplication,
    updateLoggedinApplication,
    read,
    update,
  } = useConsumerContract();

  const [consumerFields, setConsumerFields] = useState({
    consumerInfo: {
      effective_date: "",
      consumer_mrn: "",
      consumer_first_name: "",
      consumer_last_name: "",
      consumer_gender: "",
      consumer_dob: "",
      consumer_ssn: "",
      consumer_insurance_name: "",
      consumer_insurance_id: "",
      consumer_medicaid_id: "",
      consumer_street_address: "",
      consumer_city: "",
      consumer_state: "",
      consumer_zip: "",
      consumer_home_phone: "",
      consumer_cell: "",
      consumer_email_address: "",
    },
    emergencyOne: {
      emergency_one_name: "",
      emergency_one_relationship: "",
      emergency_one_email: "",
      emergency_one_phone: "",
      emergency_one_alternate_phone: "",
    },
    emergencyTwo: {
      emergency_two_name: "",
      emergency_two_relationship: "",
      emergency_two_email: "",
      emergency_two_phone: "",
      emergency_two_alternate_phone: "",
    },
    consumerDiagnosis: {
      nursing_assessment: "",
      consumer_diagnosis_auth_number: "",
      consumer_diagnosis_from_date: "",
      consumer_diagnosis_to_date: "",
      consumer_code: "",
      consumer_modifier: "",
    },
    pcp: {
      pcp_first_name: "",
      pcp_last_name: "",
      pcp_npi: "",
      pcp_phone_no: "",
      pcp_fax_no: "",
      pcp_street_address: "",
      pcp_city: "",
      pcp_state: "",
      pcp_zip: "",
    },
    consumer_representative_sign_date: "",
    consumer_representative_sign: "",
    authorized_sign_date: "",
    authority_sign: "",
    authorizationForRelease: {
      person_to_send_info: "",
      medical_record_from: "",
      medical_record_to: "",
      other_auth_information: "",
      treatments: {
        alcohol_treatment: false,
        mental_health_treatment: false,
        hiv_treatment: false,
      },
    },
    authorizationToDiscussHealth: {
      initials: "",
      individual_health_care_provider: "",
      health_info_with_attorney: "",
      other_reason_for_info_release: "",
      auth_expire_date: "",
      person_signing_form: "",
      auth_to_sign_on_behalf_of_consumer: "",
    },
    // consumer_sign: "",
    // consumer_sign_date: "",
    // insuranceBenefits: {
    //   patient_carrier: "",
    //   legal_representative: "",
    //   insured_date: "",
    //   representative_name: "",
    //   representative_designation: "",
    // },
    // insurance_representative_sign: "",
    // insurance_last_date: "",
    app_password: "",
    agreed_to_terms: false,
    acceptance_of_responsibility: false,
    acceptance_of_hipaa_form: false,
    acceptance_of_insurance: false,
    acceptance_of_service_agreement: false,
    acceptance_of_conacent: false,
  });

  const [isTouched, setIsTouched] = useState({
    consumerInfo: {
      consumer_mrn: false,
      consumer_first_name: false,
      consumer_last_name: false,
      consumer_gender: false,
      consumer_dob: false,
      consumer_ssn: false,
      consumer_cell: false,
      consumer_email_address: false,
      consumer_home_phone: false,
    },
    emergencyOne: {
      emergency_one_name: false,
      emergency_one_relationship: false,
      emergency_one_email: false,
      emergency_one_phone: false,
      emergency_one_alternate_phone: false,
    },
    emergencyTwo: {
      emergency_two_name: false,
      emergency_two_relationship: false,
      emergency_two_email: false,
      emergency_two_phone: false,
      emergency_two_alternate_phone: false,
    },
    consumerDiagnosis: {
      consumer_diagnosis_auth_number: false,
    },
    pcp: {
      pcp_npi: false,
    },
    app_password: false,
  });

  const isConsumerInfoRequiredFieldsFilled = () => {
    for (const field of formRequiredFields.commonFields.consumerInfo) {
      if (
        !consumerFields.consumerInfo[field] ||
        !isEmail(consumerFields.consumerInfo.consumer_email_address) ||
        !isValidSSN(consumerFields.consumerInfo["consumer_ssn"]) ||
        !isValidUSNumber(consumerFields.consumerInfo["consumer_cell"]) ||
        !isValidUSNumber(consumerFields.consumerInfo["consumer_home_phone"])
      ) {
        // set all is touched to true
        setIsTouched({
          ...isTouched,
          consumerInfo: {
            consumer_mrn: true,
            consumer_first_name: true,
            consumer_last_name: true,
            consumer_gender: true,
            consumer_dob: true,
            consumer_ssn: true,
            consumer_cell: true,
            consumer_email_address: true,
            consumer_home_phone: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  const isEmergencyOneFilled = () => {
    for (const field of formRequiredFields.commonFields
      .consumerContractEmergencyFieldsOne) {
      if (
        !consumerFields.emergencyOne[field] ||
        !isValidUSNumber(consumerFields.emergencyOne.emergency_one_phone) ||
        !isValidUSNumber(
          consumerFields.emergencyOne.emergency_one_alternate_phone
        ) ||
        !isEmail(consumerFields.emergencyOne.emergency_one_email)
      ) {
        setIsTouched({
          ...isTouched,
          emergencyOne: {
            emergency_one_name: true,
            emergency_one_relationship: true,
            emergency_one_email: true,
            emergency_one_phone: true,
            emergency_one_alternate_phone: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  const isEmergencyTwoFilled = () => {
    for (const field of formRequiredFields.commonFields
      .consumerContractEmergencyFieldsTwo) {
      if (
        !consumerFields.emergencyTwo[field] ||
        !isValidUSNumber(consumerFields.emergencyTwo.emergency_two_phone) ||
        !isValidUSNumber(
          consumerFields.emergencyTwo.emergency_two_alternate_phone
        ) ||
        !isEmail(consumerFields.emergencyTwo.emergency_two_email)
      ) {
        setIsTouched({
          ...isTouched,
          emergencyTwo: {
            emergency_two_name: true,
            emergency_two_relationship: true,
            emergency_two_email: true,
            emergency_two_phone: true,
            emergency_two_alternate_phone: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  const isConsumerDiagnosisRequiredFieldsFilled = () => {
    for (const field of formRequiredFields.commonFields.consumerDiagnosis) {
      if (!consumerFields.consumerDiagnosis[field]) {
        // set all is touched to true
        setIsTouched({
          ...isTouched,
          consumerDiagnosis: {
            consumer_diagnosis_auth_number: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  const isPCPRequiredFieldsFilled = () => {
    for (const field of formRequiredFields.commonFields.pcp) {
      if (!consumerFields.pcp[field]) {
        // set all is touched to true
        setIsTouched({
          ...isTouched,
          pcp: {
            pcp_npi: true,
          },
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };
  const isAppPasswordFilled = () => {
    for (const field of formRequiredFields.commonFields.topLevel) {
      if (!consumerFields[field]) {
        // set all is touched to true
        setIsTouched({
          ...isTouched,
          app_password: true,
        });
        return false; // Field is invalid, validation fails
      }
    }
    return true; // All required fields have values, validation passes
  };

  // On Consumer Info Change
  const onConsumerInfoChange = (e) => {
    if (isTouched.consumerInfo[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        consumerInfo: { ...isTouched.consumerInfo, [e.target.name]: true },
      });
    }
    if (e.target.name === "consumer_ssn") {
      e.target.value = formatSSN(e.target.value);
    }
    if (e.target.name === "consumer_home_phone") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    if (e.target.name === "consumer_cell") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    setConsumerFields({
      ...consumerFields,
      consumerInfo: {
        ...consumerFields.consumerInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Emergency One Info Change
  const onEmergencyOneInfoChange = (e) => {
    if (isTouched.emergencyOne[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        emergencyOne: { ...isTouched.emergencyOne, [e.target.name]: true },
      });
    }
    if (e.target.name === "emergency_one_phone") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    if (e.target.name === "emergency_one_alternate_phone") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    setConsumerFields({
      ...consumerFields,
      emergencyOne: {
        ...consumerFields.emergencyOne,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Emergency Two Info Change
  const onEmergencyTwoInfoChange = (e) => {
    if (isTouched.emergencyTwo[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        emergencyTwo: { ...isTouched.emergencyTwo, [e.target.name]: true },
      });
    }
    if (e.target.name === "emergency_two_phone") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    if (e.target.name === "emergency_two_alternate_phone") {
      e.target.value = formatUSPhoneNumber(e.target.value);
    }
    setConsumerFields({
      ...consumerFields,
      emergencyTwo: {
        ...consumerFields.emergencyTwo,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Diagnosis Info Change
  const onConsumerDiagnosisInfoChange = (e) => {
    if (isTouched.consumerDiagnosis[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        consumerDiagnosis: {
          ...isTouched.consumerDiagnosis,
          [e.target.name]: true,
        },
      });
    }
    setConsumerFields({
      ...consumerFields,
      consumerDiagnosis: {
        ...consumerFields.consumerDiagnosis,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Primary Care Physician Info Change
  const onPCPInfoChange = (e) => {
    if (isTouched.pcp[e.target.name] !== undefined) {
      setIsTouched({
        ...isTouched,
        pcp: { ...isTouched.pcp, [e.target.name]: true },
      });
    }
    setConsumerFields({
      ...consumerFields,
      pcp: {
        ...consumerFields.pcp,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Signature Date Info Change
  const onSignDateInfoChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      [e.target.name]: e.target.value,
    });
  };

  // On Consumer Contract Signs End
  const onSignsEnd = (e) => {
    setConsumerFields({
      ...consumerFields,
      [e.target.name]: e.target.value,
    });
  };
  // On Consumer Contract Signs Clear
  const onSignsClear = (e) => {
    setConsumerFields({
      ...consumerFields,
      [e.target.name]: e.target.value,
    });
  };
  // On Authorization Form Change
  const onAuthorizationChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      authorizationForRelease: {
        ...consumerFields.authorizationForRelease,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Treatment Change
  const onTreatmentChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      authorizationForRelease: {
        ...consumerFields.authorizationForRelease,
        treatments: {
          ...consumerFields.authorizationForRelease.treatments,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };
  // On Treatment Change
  const onAgreementChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      [e.target.name]: e.target.checked,
    });
  };
  // On Authorization Discussion Form Change
  const onAuthorizationDiscussionChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      authorizationToDiscussHealth: {
        ...consumerFields.authorizationToDiscussHealth,
        [e.target.name]: e.target.value,
      },
    });
  };
  // On Insurance Form Change
  // const onInsuranceChange = (e) => {
  //   setConsumerFields({
  //     ...consumerFields,
  //     insuranceBenefits: {
  //       ...consumerFields.insuranceBenefits,
  //       [e.target.name]: e.target.value,
  //     },
  //   });
  // };
  // On App Password Change
  const onGenericChange = (e) => {
    setConsumerFields({
      ...consumerFields,
      [e.target.name]: e.target.value,
    });
  };

  // On Consumer Contract Continue
  const createConsumerContract = () => {
    return create(consumerFields, user.token);
  };
  // On Consumer Contract Continue
  const updateConsumerContract = (id) => {
    return update(consumerFields, user.token, id);
  };
  // Function to read an application
  const readConsumerContract = async (id) => {
    const res = await read(user.token, id);

    if (res.status == 200) {
      setConsumerFields({ ...res.data, app_password: "" });
      return;
    }

    // return ErrorMessage(res.response.data);
  };

  // Function to fetch consumer contract application on consumer login
  const readConsumerLoggedinContract = async () => {
    const res = await readLoggedinApplication(user.token);

    if (res.status == 200) {
      setConsumerFields({
        ...res.data,
        agreed_to_terms: false,
        acceptance_of_responsibility: false,
        acceptance_of_hipaa_form: false,
        acceptance_of_insurance: false,
        acceptance_of_service_agreement: false,
        acceptance_of_conacent: false,
      });
      return;
    }

    return ErrorMessage(res.response.data);
  };
  // Function to update consumer contract application on consumer login
  const updateConsumerLoggedinContract = async () => {
    const data = {
      // consumer_sign: consumerFields.consumer_sign,
      // consumer_sign_date: consumerFields.consumer_sign_date,
      consumer_representative_sign: consumerFields.consumer_representative_sign,
      consumer_representative_sign_date:
        consumerFields.consumer_representative_sign_date,
      // insurance_representative_sign:
      //   consumerFields.insurance_representative_sign,
      // insurance_last_date: consumerFields.insurance_last_date,
    };
    const res = await updateLoggedinApplication(user.token, data);

    if (res.status == 200) {
      return res;
    }

    return ErrorMessage(res.response.data);
  };

  const resetState = () => {
    setConsumerFields({
      consumerInfo: {
        effective_date: "",
        consumer_mrn: "",
        consumer_first_name: "",
        consumer_last_name: "",
        consumer_gender: "",
        consumer_dob: "",
        consumer_ssn: "",
        consumer_insurance_name: "",
        consumer_insurance_id: "",
        consumer_medicaid_id: "",
        consumer_street_address: "",
        consumer_city: "",
        consumer_state: "",
        consumer_zip: "",
        consumer_home_phone: "",
        consumer_cell: "",
        consumer_email_address: "",
      },
      emergencyOne: {
        emergency_one_name: "",
        emergency_one_relationship: "",
        emergency_one_email: "",
        emergency_one_phone: "",
        emergency_one_alternate_phone: "",
      },
      emergencyTwo: {
        emergency_two_name: "",
        emergency_two_relationship: "",
        emergency_two_email: "",
        emergency_two_phone: "",
        emergency_two_alternate_phone: "",
      },
      consumerDiagnosis: {
        nursing_assessment: "",
        consumer_diagnosis_auth_number: "",
        consumer_diagnosis_from_date: "",
        consumer_diagnosis_to_date: "",
        consumer_code: "",
        consumer_modifier: "",
      },
      pcp: {
        pcp_first_name: "",
        pcp_last_name: "",
        pcp_npi: "",
        pcp_phone_no: "",
        pcp_fax_no: "",
        pcp_street_address: "",
        pcp_city: "",
        pcp_state: "",
        pcp_zip: "",
      },
      consumer_representative_sign_date: "",
      consumer_representative_sign: "",
      authorized_sign_date: "",
      authority_sign: "",
      authorizationForRelease: {
        person_to_send_info: "",
        medical_record_from: "",
        medical_record_to: "",
        other_auth_information: "",
        treatments: {
          alcohol_treatment: false,
          mental_health_treatment: false,
          hiv_treatment: false,
        },
      },
      authorizationToDiscussHealth: {
        initials: "",
        individual_health_care_provider: "",
        health_info_with_attorney: "",
        other_reason_for_info_release: "",
        auth_expire_date: "",
        person_signing_form: "",
        auth_to_sign_on_behalf_of_consumer: "",
      },
      // consumer_sign: "",
      // consumer_sign_date: "",
      // insuranceBenefits: {
      //   patient_carrier: "",
      //   legal_representative: "",
      //   insured_date: "",
      //   representative_name: "",
      //   representative_designation: "",
      // },
      // insurance_representative_sign: "",
      // insurance_last_date: "",
      app_password: "",
      agreed_to_terms: false,
      acceptance_of_responsibility: false,
      acceptance_of_hipaa_form: false,
      acceptance_of_insurance: false,
      acceptance_of_service_agreement: false,
      acceptance_of_conacent: false,
    });
    setIsTouched({
      consumerInfo: {
        consumer_mrn: false,
        consumer_first_name: false,
        consumer_last_name: false,
        consumer_gender: false,
        consumer_dob: false,
        consumer_ssn: false,
        consumer_cell: false,
        consumer_email_address: false,
        consumer_home_phone: false,
      },
      emergencyOne: {
        emergency_one_name: false,
        emergency_one_relationship: false,
        emergency_one_email: false,
        emergency_one_phone: false,
        emergency_one_alternate_phone: false,
      },
      emergencyTwo: {
        emergency_two_name: false,
        emergency_two_relationship: false,
        emergency_two_email: false,
        emergency_two_phone: false,
        emergency_two_alternate_phone: false,
      },
      app_password: false,
      consumerDiagnosis: {
        consumer_diagnosis_auth_number: false,
      },
      pcp: {
        pcp_npi: false,
      },
    });
  };

  return (
    <ConsumerContractContext.Provider
      value={{
        consumerFields,
        setConsumerFields,
        onConsumerInfoChange,
        onEmergencyOneInfoChange,
        onEmergencyTwoInfoChange,
        onConsumerDiagnosisInfoChange,
        onPCPInfoChange,
        onSignDateInfoChange,
        onSignsEnd,
        onSignsClear,
        onAuthorizationChange,
        onTreatmentChange,
        onAuthorizationDiscussionChange,
        // onInsuranceChange,
        isConsumerInfoRequiredFieldsFilled,
        createConsumerContract,
        onGenericChange,
        readConsumerLoggedinContract,
        updateConsumerLoggedinContract,
        readConsumerContract,
        updateConsumerContract,
        onAgreementChange,
        isAppPasswordFilled,
        isConsumerDiagnosisRequiredFieldsFilled,
        isPCPRequiredFieldsFilled,
        isEmergencyOneFilled,
        isEmergencyTwoFilled,
        isTouched,
        resetState,
      }}
    >
      {children}
    </ConsumerContractContext.Provider>
  );
}
