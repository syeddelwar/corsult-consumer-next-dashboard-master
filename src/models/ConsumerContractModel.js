const mongoose = require("mongoose");
const ConsumerContractModel = new mongoose.Schema(
  {
    consumerInfo: {
      effective_date: {
        type: String,
      },
      consumer_mrn: {
        type: String,
        unique: true,
      },
      consumer_first_name: {
        type: String,
      },
      consumer_last_name: {
        type: String,
      },
      consumer_gender: {
        type: String,
        enum: ["M", "F"],
      },
      consumer_dob: {
        type: String,
      },
      consumer_ssn: {
        type: String,
        unique: true,
      },
      consumer_insurance_name: {
        type: String,
      },
      consumer_insurance_id: {
        type: String,
        unique: true,
      },
      consumer_medicaid_id: {
        type: String,
        unique: true,
      },
      consumer_street_address: {
        type: String,
      },
      consumer_city: {
        type: String,
      },
      consumer_state: {
        type: String,
      },
      consumer_zip: {
        type: String,
      },
      consumer_home_phone: {
        type: String,
      },
      consumer_cell: {
        type: String,
        unique: true,
        required: true,
      },
      consumer_email_address: {
        type: String,
        unique: true,
      },
    },
    emergencyOne: {
      emergency_one_name: {
        type: String,
      },
      emergency_one_relationship: {
        type: String,
      },
      emergency_one_email: {
        type: String,
      },
      emergency_one_phone: {
        type: String,
      },
      emergency_one_alternate_phone: {
        type: String,
      },
    },
    emergencyTwo: {
      emergency_two_name: {
        type: String,
      },
      emergency_two_relationship: {
        type: String,
      },
      emergency_two_email: {
        type: String,
      },
      emergency_two_phone: {
        type: String,
      },
      emergency_two_alternate_phone: {
        type: String,
      },
    },
    consumerDiagnosis: {
      nursing_assessment: {
        type: String,
      },
      consumer_diagnosis_auth_number: {
        type: String,
        unique: true,
      },
      consumer_diagnosis_from_date: {
        type: String,
      },
      consumer_diagnosis_to_date: {
        type: String,
      },
      consumer_code: {
        type: String,
      },
      consumer_modifier: {
        type: String,
      },
    },
    pcp: {
      pcp_first_name: {
        type: String,
      },
      pcp_last_name: {
        type: String,
      },
      pcp_npi: {
        type: String,
        unique: true,
      },
      pcp_phone_no: {
        type: String,
      },
      pcp_fax_no: {
        type: String,
      },
      pcp_street_address: {
        type: String,
      },
      pcp_city: {
        type: String,
      },
      pcp_state: {
        type: String,
      },
      pcp_zip: {
        type: String,
      },
    },
    consumer_representative_sign_date: {
      type: String,
    },
    consumer_representative_sign: {
      type: String,
    },
    authorized_sign_date: {
      type: String,
    },
    authority_sign: {
      type: String,
    },
    authorizationForRelease: {
      person_to_send_info: {
        type: String,
      },
      medical_record_from: {
        type: String,
      },
      medical_record_to: {
        type: String,
      },
      other_auth_information: {
        type: String,
      },
      treatments: {
        alcohol_treatment: {
          type: Boolean,
          default: false,
        },
        mental_health_treatment: {
          type: Boolean,
          default: false,
        },
        hiv_treatment: {
          type: Boolean,
          default: false,
        },
      },
    },
    authorizationToDiscussHealth: {
      initials: {
        type: String,
      },
      individual_health_care_provider: {
        type: String,
      },
      health_info_with_attorney: {
        type: String,
      },
      other_reason_for_info_release: {
        type: String,
      },
      auth_expire_date: {
        type: String,
      },
      person_signing_form: {
        type: String,
      },
      auth_to_sign_on_behalf_of_consumer: {
        type: String,
      },
    },
    // consumer_sign: {
    //   type: String,
    // },
    // consumer_sign_date: {
    //   type: String,
    // },
    // insuranceBenefits: {
    //   patient_carrier: {
    //     type: String,
    //   },
    //   legal_representative: {
    //     type: String,
    //   },
    //   insured_date: {
    //     type: String,
    //   },
    //   representative_name: {
    //     type: String,
    //   },
    //   representative_designation: {
    //     type: String,
    //   },
    // },
    // insurance_representative_sign: {
    //   type: String,
    // },
    // insurance_last_date: {
    //   type: String,
    // },
    app_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.consumer_contracts ||
  mongoose.model("consumer_contracts", ConsumerContractModel);
