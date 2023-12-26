import {
  InputPlain,
  SectionCollapse,
  SelectPlain,
  TextLg,
} from "@/components/commons";
import { usaStates } from "@/config";
import React from "react";

const Step1 = ({ consumer }) => {
  const formFields = [
    {
      placeholder: "Name Of Client/Responsible Person",
      id: "consumer_name",
      type: "text",
      name: "consumer_name",
      value: `${consumer?.consumerInfo?.consumer_first_name} ${consumer?.consumerInfo?.consumer_last_name}`,
    },
    {
      placeholder: "Gender",
      id: "consumer_gender",
      type: "select",
      name: "consumer_gender",
      options: ["M", "F"],
      value: consumer?.consumerInfo.consumer_gender,
    },
    {
      placeholder: "Date Of Birth",
      id: "consumer_dob",
      type: "date",
      name: "consumer_dob",
      value: consumer?.consumerInfo.consumer_dob,
    },
    {
      placeholder: "Social Security Number",
      id: "consumer_ssn",
      type: "text",
      name: "consumer_ssn",
      value: consumer?.consumerInfo.consumer_ssn,
    },
    {
      placeholder: "Insurance Name",
      id: "consumer_insurance_name",
      type: "text",
      name: "consumer_insurance_name",
      value: consumer?.consumerInfo.consumer_insurance_name,
    },
    {
      placeholder: "Insurance ID #",
      id: "consumer_insurance_id",
      type: "text",
      name: "consumer_insurance_id",
      value: consumer?.consumerInfo.consumer_insurance_id,
    },
    {
      placeholder: "Medicaid ID #",
      id: "consumer_medicaid_id",
      type: "text",
      name: "consumer_medicaid_id",
      value: consumer?.consumerInfo.consumer_medicaid_id,
    },
    {
      placeholder: "Street Address",
      id: "consumer_street_address",
      type: "text",
      name: "consumer_street_address",
      value: consumer?.consumerInfo.consumer_street_address,
    },
    {
      placeholder: "City",
      id: "consumer_city",
      type: "text",
      name: "consumer_city",
      value: consumer?.consumerInfo.consumer_city,
    },
    {
      placeholder: "State",
      id: "consumer_state",
      type: "select",
      name: "consumer_state",
      options: usaStates,
      value: consumer?.consumerInfo.consumer_state,
    },
    {
      placeholder: "ZIP Code",
      id: "consumer_zip",
      type: "number",
      name: "consumer_zip",
      value: consumer?.consumerInfo.consumer_zip,
    },
    {
      placeholder: "Home Phone",
      id: "consumer_home_phone",
      type: "text",
      name: "consumer_home_phone",
      value: consumer?.consumerInfo.consumer_home_phone,
    },
    {
      placeholder: "Cell",
      id: "consumer_cell",
      type: "text",
      name: "consumer_cell",
      value: consumer?.consumerInfo.consumer_cell,
    },
    {
      placeholder: "Email Address",
      id: "consumer_email_address",
      type: "email",
      name: "consumer_email_address",
      value: consumer?.consumerInfo.consumer_email_address,
    },
  ];

  const emergency_one_fields = [
    {
      placeholder: "Emergency Contact Name 1",
      id: "emergency_name_one",
      type: "text",
      name: "emergency_name_one",
      value: consumer?.emergencyOne.emergency_one_name,
    },
    {
      placeholder: "Relationship",
      id: "emergency_one_relationship",
      type: "text",
      name: "emergency_one_relationship",
      value: consumer?.emergencyOne.emergency_one_relationship,
    },
    {
      placeholder: "Email Address",
      id: "emergency_one_email",
      type: "email",
      name: "emergency_one_email",
      value: consumer?.emergencyOne.emergency_one_email,
    },
    {
      placeholder: "Phone Number",
      id: "emergency_one_phone",
      type: "text",
      name: "emergency_one_phone",
      value: consumer?.emergencyOne.emergency_one_phone,
    },
    {
      placeholder: "Alternate Number",
      id: "emergency_one_alternate_phone",
      type: "text",
      name: "emergency_one_alternate_phone",
      value: consumer?.emergencyOne.emergency_one_alternate_phone,
    },
  ];
  const emergency_two_fields = [
    {
      placeholder: "Emergency Contact Name 2",
      id: "emergency_name_two",
      type: "text",
      name: "emergency_name_two",
      value: consumer?.emergencyTwo.emergency_two_name,
    },
    {
      placeholder: "Relationship",
      id: "emergency_two_relationship",
      type: "text",
      name: "emergency_two_relationship",
      value: consumer?.emergencyTwo.emergency_two_relationship,
    },
    {
      placeholder: "Email Address",
      id: "emergency_two_email",
      type: "email",
      name: "emergency_two_email",
      value: consumer?.emergencyTwo.emergency_two_email,
    },
    {
      placeholder: "Phone Number",
      id: "emergency_two_phone",
      type: "text",
      name: "emergency_two_phone",
      value: consumer?.emergencyTwo.emergency_two_phone,
    },
    {
      placeholder: "Alternate Number",
      id: "emergency_two_alternate_phone",
      type: "text",
      name: "emergency_two_alternate_phone",
      value: consumer?.emergencyTwo.emergency_two_alternate_phone,
    },
  ];

  const pcp_fields = [
    {
      placeholder: "PCP Name",
      id: "pcp_name",
      type: "text",
      name: "pcp_name",
      value: `${consumer?.pcp?.pcp_first_name} ${consumer?.pcp?.pcp_last_name}`,
    },
    {
      placeholder: "NPI",
      id: "pcp_npi",
      type: "text",
      name: "pcp_npi",
      value: consumer?.pcp.pcp_npi,
    },
    {
      placeholder: "Phone No",
      id: "pcp_phone_no",
      type: "text",
      name: "pcp_phone_no",
      value: consumer?.pcp.pcp_phone_no,
    },
    {
      placeholder: "Fax No",
      id: "pcp_fax_no",
      type: "text",
      name: "pcp_fax_no",
      value: consumer?.pcp.pcp_fax_no,
    },
    {
      placeholder: "Street Address",
      id: "pcp_street_address",
      type: "text",
      name: "pcp_street_address",
      value: consumer?.pcp.pcp_street_address,
    },
    {
      placeholder: "City",
      id: "pcp_city",
      type: "text",
      name: "pcp_city",
      value: consumer?.pcp.pcp_city,
    },
    {
      placeholder: "State",
      id: "pcp_state",
      type: "select",
      name: "pcp_state",
      value: consumer?.pcp.pcp_state,
      options: usaStates,
    },
    {
      placeholder: "ZIP",
      id: "pcp_zip",
      type: "text",
      name: "pcp_zip",
      value: consumer?.pcp.pcp_zip,
    },
  ];
  return (
    <section>
      <form action="">
        <SectionCollapse title="Client Information">
          <div className="my-2">
            <InputPlain
              placeholder="MRN"
              id="mrn"
              type="text"
              name="mrn"
              value={consumer?.consumerInfo.consumer_mrn}
              isDisabled={true}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            {formFields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                      options={field.options}
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
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                      options={field.options}
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
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                      options={field.options}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </SectionCollapse>
        <SectionCollapse title="Other Information" isLast>
          <div className="grid grid-cols-12 gap-4">
            {/* {consumer_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      label={field.label}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      label={field.label}
                      id={field.id}
                      name={field.name}
                      value={field.value}
                      options={field.options}
                      isDisabled={true}
                    />
                  )}
                </div>
              );
            })} */}

            <div className="col-span-12">
              <TextLg
                classes="font-bold"
                text="Primary Care Physician Information"
              />
            </div>
            {pcp_fields.map((field) => {
              return (
                <div key={field.id} className="col-span-12 md:col-span-4">
                  {field.type !== "select" && (
                    <InputPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
                    />
                  )}
                  {field.type === "select" && (
                    <SelectPlain
                      placeholder={field.placeholder}
                      id={field.id}
                      name={field.name}
                      value={field.value}
                      isDisabled={true}
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
