import { InputPlain, SectionCollapse, SelectPlain } from "@/components/commons";
import { usaStates } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import { isEmail, isValidSSN, isValidUSNumber } from "@/utils";
import React, { useContext } from "react";

const Step1 = () => {
  // Contexts
  const {
    onConsumerInfoChange,
    onEmergencyOneInfoChange,
    onEmergencyTwoInfoChange,
    onConsumerDiagnosisInfoChange,
    onPCPInfoChange,
    consumerFields,
    isTouched,
  } = useContext(ConsumerContractContext);
  const { user } = useContext(AuthContext);

  const formFields = [
    {
      placeholder: "Consumer First Name",
      label: "Consumer First Name",
      id: "consumer_first_name",
      type: "text",
      name: "consumer_first_name",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_first_name,
      isRequired: true,
    },
    {
      placeholder: "Consumer Last Name",
      label: "Consumer Last Name",
      id: "consumer_last_name",
      type: "text",
      name: "consumer_last_name",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_last_name,
      isRequired: true,
    },
    {
      placeholder: "Gender",
      label: "Gender",
      id: "consumer_gender",
      type: "select",
      name: "consumer_gender",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_gender,
      isRequired: true,
      options: ["M", "F"],
    },
    {
      placeholder: "Date Of Birth",
      label: "Date Of Birth",
      id: "consumer_dob",
      type: "date",
      name: "consumer_dob",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_dob,
      isRequired: true,
    },
    {
      placeholder: "Social Security Number",
      label: "Social Security Number",
      id: "consumer_ssn",
      type: "text",
      name: "consumer_ssn",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_ssn,
      isRequired: true,
      error: !isValidSSN(consumerFields.consumerInfo["consumer_ssn"]),
      errorMessage: "Please type valid SSN",
    },
    {
      placeholder: "Insurance Name",
      label: "Insurance Name",
      id: "consumer_insurance_name",
      type: "text",
      name: "consumer_insurance_name",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_insurance_name,
    },
    {
      placeholder: "Insurance ID #",
      label: "Insurance ID #",
      id: "consumer_insurance_id",
      type: "text",
      name: "consumer_insurance_id",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_insurance_id,
    },
    {
      placeholder: "Medicaid ID #",
      label: "Medicaid ID #",
      id: "consumer_medicaid_id",
      type: "text",
      name: "consumer_medicaid_id",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_medicaid_id,
    },
    {
      placeholder: "Street Address",
      label: "Street Address",
      id: "consumer_street_address",
      type: "text",
      name: "consumer_street_address",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_street_address,
    },
    {
      placeholder: "City",
      label: "City",
      id: "consumer_city",
      type: "text",
      name: "consumer_city",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_city,
    },
    {
      placeholder: "State",
      label: "State",
      id: "consumer_state",
      type: "select",
      name: "consumer_state",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_state,
      options: usaStates,
    },
    {
      placeholder: "ZIP Code",
      label: "ZIP Code",
      id: "consumer_zip",
      name: "consumer_zip",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_zip,
      maxLength: 10,
    },
    {
      placeholder: "Home Phone",
      label: "Home Phone",
      id: "consumer_home_phone",
      type: "text",
      name: "consumer_home_phone",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_home_phone,
      error: !isValidUSNumber(
        consumerFields.consumerInfo["consumer_home_phone"]
      ),
      errorMessage: "Please type valid US Phone Number",
      isRequired: true,
      maxLength: 14,
    },
    {
      placeholder: "Cell",
      label: "Cell",
      id: "consumer_cell",
      type: "text",
      name: "consumer_cell",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_cell,
      error: !isValidUSNumber(consumerFields.consumerInfo["consumer_cell"]),
      errorMessage: "Please type valid US Phone Number",
      isRequired: true,
      maxLength: 14,
    },
    {
      placeholder: "Email Address",
      label: "Email Address",
      id: "consumer_email_address",
      type: "email",
      name: "consumer_email_address",
      onChange: onConsumerInfoChange,
      value: consumerFields.consumerInfo.consumer_email_address,
      isRequired: true,
      errorMessage: "Enter a valid email address",
      error: !isEmail(consumerFields.consumerInfo.consumer_email_address),
    },
  ];

  const emergency_one_fields = [
    {
      placeholder: "Emergency Contact Name 1",
      id: "emergency_one_name",
      type: "text",
      name: "emergency_one_name",
      onChange: onEmergencyOneInfoChange,
      value: consumerFields.emergencyOne.emergency_one_name,
    },
    {
      placeholder: "Relationship",
      id: "emergency_one_relationship",
      type: "text",
      name: "emergency_one_relationship",
      onChange: onEmergencyOneInfoChange,
      value: consumerFields.emergencyOne.emergency_one_relationship,
    },
    {
      placeholder: "Email Address",
      id: "emergency_one_email",
      type: "email",
      name: "emergency_one_email",
      onChange: onEmergencyOneInfoChange,
      value: consumerFields.emergencyOne.emergency_one_email,
      errorMessage: "Enter a valid email address",
      error: !isEmail(consumerFields.emergencyOne.emergency_one_email),
    },
    {
      placeholder: "Phone Number",
      id: "emergency_one_phone",
      type: "text",
      name: "emergency_one_phone",
      onChange: onEmergencyOneInfoChange,
      value: consumerFields.emergencyOne.emergency_one_phone,
      error: !isValidUSNumber(
        consumerFields.emergencyOne["emergency_one_phone"]
      ),
      errorMessage: "Please type valid US Phone Number",
      maxLength: 14,
    },
    {
      placeholder: "Alternate Number",
      id: "emergency_one_alternate_phone",
      type: "text",
      name: "emergency_one_alternate_phone",
      onChange: onEmergencyOneInfoChange,
      value: consumerFields.emergencyOne.emergency_one_alternate_phone,
      error: !isValidUSNumber(
        consumerFields.emergencyOne["emergency_one_alternate_phone"]
      ),
      errorMessage: "Please type valid US Phone Number",
      maxLength: 14,
    },
  ];
  const emergency_two_fields = [
    {
      placeholder: "Emergency Contact Name 2",
      id: "emergency_two_name",
      type: "text",
      name: "emergency_two_name",
      onChange: onEmergencyTwoInfoChange,
      value: consumerFields.emergencyTwo.emergency_two_name,
    },
    {
      placeholder: "Relationship",
      id: "emergency_two_relationship",
      type: "text",
      name: "emergency_two_relationship",
      onChange: onEmergencyTwoInfoChange,
      value: consumerFields.emergencyTwo.emergency_two_relationship,
    },
    {
      placeholder: "Email Address",
      id: "emergency_two_email",
      type: "email",
      name: "emergency_two_email",
      onChange: onEmergencyTwoInfoChange,
      value: consumerFields.emergencyTwo.emergency_two_email,
      errorMessage: "Enter a valid email address",
      error: !isEmail(consumerFields.emergencyTwo.emergency_two_email),
    },
    {
      placeholder: "Phone Number",
      id: "emergency_two_phone",
      type: "text",
      name: "emergency_two_phone",
      onChange: onEmergencyTwoInfoChange,
      value: consumerFields.emergencyTwo.emergency_two_phone,
      error: !isValidUSNumber(
        consumerFields.emergencyTwo["emergency_two_phone"]
      ),
      errorMessage: "Please type valid US Phone Number",
      maxLength: 14,
    },
    {
      placeholder: "Alternate Number",
      id: "emergency_two_alternate_phone",
      type: "text",
      name: "emergency_two_alternate_phone",
      onChange: onEmergencyTwoInfoChange,
      value: consumerFields.emergencyTwo.emergency_two_alternate_phone,
      error: !isValidUSNumber(
        consumerFields.emergencyTwo["emergency_two_alternate_phone"]
      ),
      errorMessage: "Please type valid US Phone Number",
      maxLength: 14,
    },
  ];
  const client_fields = [
    {
      placeholder: "Nursing Assessment",
      id: "nursing_assessment",
      type: "select",
      name: "nursing_assessment",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.nursing_assessment,
      options: ["Required", "Not Required", "To Be Decided"],
    },
    {
      placeholder: "Authorization Number",
      id: "consumer_diagnosis_auth_number",
      type: "text",
      name: "consumer_diagnosis_auth_number",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.consumer_diagnosis_auth_number,
    },
    {
      placeholder: "From Date",
      id: "consumer_diagnosis_from_date",
      type: "date",
      name: "consumer_diagnosis_from_date",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.consumer_diagnosis_from_date,
    },
    {
      placeholder: "To Date",
      id: "consumer_diagnosis_to_date",
      type: "date",
      name: "consumer_diagnosis_to_date",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.consumer_diagnosis_to_date,
    },
    {
      placeholder: "Code",
      id: "consumer_code",
      type: "text",
      name: "consumer_code",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.consumer_code,
    },
    {
      placeholder: "Modifier",
      id: "consumer_modifier",
      type: "text",
      name: "consumer_modifier",
      onChange: onConsumerDiagnosisInfoChange,
      value: consumerFields.consumerDiagnosis.consumer_modifier,
    },
  ];
  const pcp_fields = [
    {
      placeholder: "PCP First Name",
      id: "pcp_first_name",
      type: "text",
      name: "pcp_first_name",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_first_name,
    },
    {
      placeholder: "PCP Last Name",
      id: "pcp_last_name",
      type: "text",
      name: "pcp_last_name",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_last_name,
    },
    {
      placeholder: "NPI",
      id: "pcp_npi",
      type: "text",
      name: "pcp_npi",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_npi,
    },
    {
      placeholder: "Phone No",
      id: "pcp_phone_no",
      type: "text",
      name: "pcp_phone_no",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_phone_no,
    },
    {
      placeholder: "Fax No",
      id: "pcp_fax_no",
      type: "text",
      name: "pcp_fax_no",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_fax_no,
    },
    {
      placeholder: "Street Address",
      id: "pcp_street_address",
      type: "text",
      name: "pcp_street_address",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_street_address,
    },
    {
      placeholder: "City",
      id: "pcp_city",
      type: "text",
      name: "pcp_city",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_city,
    },
    {
      placeholder: "State",
      id: "pcp_state",
      type: "select",
      name: "pcp_state",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_state,
      options: usaStates,
    },
    {
      placeholder: "ZIP",
      id: "pcp_zip",
      type: "text",
      name: "pcp_zip",
      onChange: onPCPInfoChange,
      value: consumerFields.pcp.pcp_zip,
    },
  ];
  return (
    <section>
      <form action="">
        <SectionCollapse title="Consumer">
          <div className="my-2">
            <InputPlain
              label="Effective Date"
              id="effective_date"
              type="date"
              name="effective_date"
              value={consumerFields.consumerInfo.effective_date}
              onChange={onConsumerInfoChange}
              isDisabled={user.type === "consumer"}
            />
          </div>
          <div className="my-2">
            <InputPlain
              placeholder="MRN"
              label="MRN"
              id="mrn"
              type="text"
              name="consumer_mrn"
              value={consumerFields.consumerInfo.consumer_mrn}
              onChange={onConsumerInfoChange}
              isDisabled={user.type === "consumer"}
              isRequired={true}
              error={
                isTouched.consumerInfo["consumer_mrn"] &&
                !consumerFields.consumerInfo["consumer_mrn"]
              }
              errorText={"Field is required"}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            {formFields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.label}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      onChange={field.onChange}
                      maxLength={field.maxLength}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      onBlur={field.onBlur}
                      isRequired={field.isRequired}
                      error={
                        isTouched.consumerInfo[field.name] &&
                        (field.error ||
                          !consumerFields.consumerInfo[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.label}
                      id={field.id}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      onBlur={field.onBlur}
                      options={field.options}
                      isRequired={field.isRequired}
                      error={
                        isTouched.consumerInfo[field.name] &&
                        (field.error ||
                          !consumerFields.consumerInfo[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
        <SectionCollapse title="Emergency One Information">
          <div className="grid grid-cols-12 gap-4">
            {emergency_one_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.placeholder || field.label}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      maxLength={field.maxLength}
                      isRequired={true}
                      value={field.value}
                      onBlur={field.onBlur}
                      error={
                        isTouched.emergencyOne[field.name] &&
                        (field.error ||
                          !consumerFields.emergencyOne[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.placeholder || field.label}
                      id={field.id}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      isRequired={true}
                      value={field.value}
                      onBlur={field.onBlur}
                      options={field.options}
                      error={
                        isTouched.emergencyOne[field.name] &&
                        (field.error ||
                          !consumerFields.emergencyOne[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
        <SectionCollapse title="Emergency Two Information">
          <div className="grid grid-cols-12 gap-4">
            {emergency_two_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.placeholder || field.label}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      maxLength={field.maxLength}
                      isRequired={true}
                      value={field.value}
                      onBlur={field.onBlur}
                      error={
                        isTouched.emergencyTwo[field.name] &&
                        (field.error ||
                          !consumerFields.emergencyTwo[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.placeholder || field.label}
                      id={field.id}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      isRequired={true}
                      value={field.value}
                      onBlur={field.onBlur}
                      options={field.options}
                      error={
                        isTouched.emergencyTwo[field.name] &&
                        (field.error ||
                          !consumerFields.emergencyTwo[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
        <SectionCollapse title="Diagnosis">
          <div className="grid grid-cols-12 gap-4">
            {client_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.placeholder}
                      maxLength={field.maxLength}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      error={
                        isTouched.consumerDiagnosis[field.name] &&
                        (field.error ||
                          !consumerFields.consumerDiagnosis[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                      onBlur={field.onBlur}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.placeholder}
                      id={field.id}
                      name={field.name}
                      onChange={field.onChange}
                      error={
                        isTouched.consumerDiagnosis[field.name] &&
                        (field.error ||
                          !consumerFields.consumerDiagnosis[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      onBlur={field.onBlur}
                      options={field.options}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
        <SectionCollapse title="Primary Care Physician Information" isLast>
          <div className="grid grid-cols-12 gap-4">
            {pcp_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.label || field.placeholder}
                      id={field.id}
                      maxLength={field.maxLength}
                      type={field.type}
                      name={field.name}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      error={
                        isTouched.pcp[field.name] &&
                        (field.error || !consumerFields.pcp[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                      onBlur={field.onBlur}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.label || field.placeholder}
                      id={field.id}
                      name={field.name}
                      error={
                        isTouched.pcp[field.name] &&
                        (field.error || !consumerFields.pcp[field.name])
                      }
                      errorText={field.errorMessage || "Field is required"}
                      onChange={field.onChange}
                      isDisabled={user.type === "consumer"}
                      value={field.value}
                      onBlur={field.onBlur}
                      options={field.options}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
      </form>
    </section>
  );
};

export default Step1;
