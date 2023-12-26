export default {
  commonFields: {
    consumerInfo: [
      "consumer_mrn",
      "consumer_first_name",
      "consumer_last_name",
      "consumer_gender",
      "consumer_dob",
      "consumer_ssn",
      "consumer_cell",
      "consumer_email_address",
    ],
    consumerDiagnosis: ["consumer_diagnosis_auth_number"],
    consumerContractEmergencyFieldsOne: [
      "emergency_one_name",
      "emergency_one_relationship",
      "emergency_one_email",
      "emergency_one_phone",
      "emergency_one_alternate_phone",
    ],
    consumerContractEmergencyFieldsTwo: [
      "emergency_two_name",
      "emergency_two_relationship",
      "emergency_two_email",
      "emergency_two_phone",
      "emergency_two_alternate_phone",
    ],
    pcp: ["pcp_npi"],
    topLevel: ["app_password"],
    consumerDiagnosisNursingAssessment: [
      "consumer_primary_diagnosis_code",
      "consumer_primary_diagnosis",
      "consumer_secondary_diagnosis_code",
      "consumer_secondary_diagnosis",
      "consumer_tos",
      "consumer_los",
    ],
  },
};
