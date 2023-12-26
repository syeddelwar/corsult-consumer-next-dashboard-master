import {
  InputCollapse,
  InputPlain,
  SelectPlain,
  TextMd,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { PlanOfCareContext } from "@/context/planOfCare";
import Image from "next/image";
import React, { useContext, useRef } from "react";

const Step6 = ({ consumer }) => {
  // Context
  const { onOtherGenericChange, onGenericChange, careFields } =
    useContext(PlanOfCareContext);
  const { user } = useContext(AuthContext);
  const informationtoClient = [
    "Roles and Responsibilities",
    "Code of Ethics",
    "Costs & Billing",
    "Confidentiality of Client Information",
    "Contact Information",
    "Client Consent",
    "Other",
  ];

  const formFields = [
    {
      label: "Name of Individual Preparing Service Plan",
      placeholder: "Name of Individual Preparing Service Plan",
      id: "service_plan_designer_name",
      type: "text",
      name: "service_plan_designer_name",
      onChange: onGenericChange,
      value: careFields.service_plan_designer_name,
    },
    {
      label: "Title of Agency Represent",
      placeholder: "Title of Agency Represent",
      id: "title_of_agency_represent",
      type: "text",
      name: "title_of_agency_represent",
      onChange: onGenericChange,
      value: careFields.title_of_agency_represent,
    },
    {
      label: "Days of service in a week",
      placeholder: "Days of service in a week",
      id: "days_of_service",
      type: "number",
      name: "days_of_service",
      onChange: onGenericChange,
      value: careFields.days_of_service,
    },
    {
      label: "Service Date Start",
      placeholder: "Service Date Start",
      id: "service_date_start",
      type: "date",
      name: "service_date_start",
      onChange: onGenericChange,
      value: careFields.service_date_start,
    },
    {
      label: "Service Date End",
      placeholder: "Service Date End",
      id: "service_date_end",
      type: "date",
      name: "service_date_end",
      onChange: onGenericChange,
      value: careFields.service_date_end,
    },

    {
      label: "Service Start Time",
      placeholder: "Service Start Time",
      id: "service_start_time",
      type: "time",
      name: "service_start_time",
      onChange: onGenericChange,
      value: careFields.service_start_time,
    },
    {
      label: "Service End Time",
      placeholder: "Service End Time",
      id: "service_end_time",
      type: "time",
      name: "service_end_time",
      onChange: onGenericChange,
      value: careFields.service_end_time,
    },
    {
      label: "Authorized Number Of Hours",
      placeholder: "Authorized Number Of Hours",
      id: "authorized_hours",
      type: "number",
      name: "authorized_hours",
      onChange: onGenericChange,
      value: careFields.authorized_hours,
    },
  ];

  return (
    <div>
      <InputCollapse
        type="checkboxes"
        onChange={
          user.type === "admin" || user.type === "nurse"
            ? onOtherGenericChange
            : null
        }
        checkBoxesValue={careFields}
        checkboxes={informationtoClient}
        heading="The following information has been provided to and/or discussed with the Client:"
        namePrefix="info_provided_to_client"
      />
      {careFields.info_provided_to_client_other && (
        <div className="my-4">
          <InputPlain
            placeholder="Other"
            id="info_provided_to_client_other_text"
            type="text"
            name="info_provided_to_client_other_text"
            value={careFields.info_provided_to_client_other_text}
            isDisabled={user.type == "aid"}
            onChange={onGenericChange}
          />
        </div>
      )}
      <div className="w-full md:w-1/2 my-4">
        <InputPlain
          label="Number of Times Supervisor Will Review"
          placeholder="Number of Times Supervisor Will Review"
          id="number_of_times_supervisor_will_review"
          type="number"
          name="number_of_times_supervisor_will_review"
          isDisabled={user.type == "aid"}
          onChange={onGenericChange}
          checkBoxesValue={careFields.number_of_times_supervisor_will_review}
        />
      </div>
      <div className="flex flex-col items-start md:flex-row md:items-center gap-3 justify-between">
        <div className="w-full">
          <div className="w-full border-2 h-32 rounded-md">
            {consumer?.consumer_representative_sign && (
              <Image
                unoptimized
                src={`/uploads/consumer_representative_sign/${consumer?.consumer_representative_sign}`}
                width={100}
                alt="Loading...."
                height={100}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <TextMd
            classes="font-semibold text-center"
            text="Client's Representative Signature"
          />
          <div>
            <InputPlain
              label="Date"
              id="client_date_sign"
              type="date"
              name="client_date_sign"
              value={consumer?.consumer_representative_sign_date}
              isDisabled
            />
          </div>
        </div>
        {user.type === "admin" ||
          (user.type === "nurse" && (
            <div className="w-full">
              <div className="w-full border-2 h-32 mb-24 rounded-md">
                {consumer?.authority_sign && (
                  <Image
                    unoptimized
                    src={`/uploads/authority_sign/${consumer?.authority_sign}`}
                    width={100}
                    alt="Loading...."
                    height={100}
                    className="w-full h-full object-contain"
                  />
                )}
                <TextMd
                  classes="font-semibold text-center"
                  text="Agency Authorized Signature"
                />
              </div>
              <div>
                <InputPlain
                  label="Date"
                  id="authorized_sign_date"
                  type="date"
                  name="authorized_sign_date"
                  value={consumer?.authorized_sign_date}
                  isDisabled
                />
              </div>
            </div>
          ))}
      </div>
      <div className="grid grid-cols-12 gap-2 mt-5">
        {formFields.slice(0, 3).map((field) => {
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
                  value={field.value}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                />
              )}
              {field.type === "select" && (
                <SelectPlain
                  placeholder={field.placeholder}
                  label={field.label}
                  id={field.id}
                  name={field.name}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  onChange={field.onChange}
                  value={field.value}
                  options={field.options}
                />
              )}
            </div>
          );
        })}
        {formFields.slice(3, 5).map((field) => {
          return (
            <div key={field.id} className="col-span-12 md:col-span-6">
              {field.type !== "select" && (
                <InputPlain
                  placeholder={field.placeholder}
                  label={field.label}
                  id={field.id}
                  type={field.type}
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                />
              )}
              {field.type === "select" && (
                <SelectPlain
                  placeholder={field.placeholder}
                  label={field.label}
                  id={field.id}
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  options={field.options}
                />
              )}
            </div>
          );
        })}
        {formFields.slice(5, 8).map((field) => {
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
                  value={field.value}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                />
              )}
              {field.type === "select" && (
                <SelectPlain
                  placeholder={field.placeholder}
                  label={field.label}
                  id={field.id}
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                  isDisabled={user.type === "aid" || user.type === "consumer"}
                  options={field.options}
                />
              )}
            </div>
          );
        })}
        <div className="col-span-12 md:mt-7">
          <InputCollapse
            type="radios"
            radios={["Yes", "No"]}
            radioValue={careFields.verbal_consent}
            onChange={
              user.type === "admin" || user.type === "nurse"
                ? onGenericChange
                : null
            }
            heading="Verbal Consent Received from Client Service End Time"
            radioName="verbal_consent"
          />
        </div>
      </div>
    </div>
  );
};

export default Step6;
