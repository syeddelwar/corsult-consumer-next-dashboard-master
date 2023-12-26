import {
  ButtonPlain,
  InputCheckbox,
  InputPlain,
  SelectPlain,
  TextMd,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const Step4 = () => {
  const lastSign = useRef();
  // Contexts
  const {
    consumerFields,
    onInsuranceChange,
    onSignsEnd,
    onSignsClear,
    onGenericChange,
  } = useContext(ConsumerContractContext);
  const { user } = useContext(AuthContext);

  const formFields = [
    // {
    //   placeholder: "Patient Carrier",
    //   label: "Patient Carrier",
    //   id: "patient_carrier",
    //   type: "text",
    //   name: "patient_carrier",
    //   onChange: onInsuranceChange,
    //   value: consumerFields.insuranceBenefits?.patient_carrier,
    //   isDisabled: user.type === "consumer",
    // },
    {
      placeholder: "Patient First Name",
      label: "Patient First Name",
      id: "patient_first_name",
      type: "text",
      name: "patient_first_name",
      value: consumerFields.consumerInfo.consumer_first_name,
      isDisabled: true,
    },
    {
      placeholder: "Patient Last Name",
      label: "Patient Last Name",
      id: "patient_last_name",
      type: "text",
      name: "patient_last_name",
      value: consumerFields.consumerInfo.consumer_last_name,
      isDisabled: true,
    },
    {
      placeholder: "Patient Medicaid ID",
      label: "Patient Medicaid ID",
      id: "patient_medicaid_id",
      type: "text",
      name: "patient_medicaid_id",
      value: consumerFields.consumerInfo.consumer_medicaid_id,
      isDisabled: true,
    },
    {
      placeholder: "Patient DOB",
      label: "Patient DOB",
      id: "patient_dob",
      type: "date",
      name: "patient_dob",
      value: consumerFields.consumerInfo.consumer_dob,
      isDisabled: true,
    },
  ];

  useEffect(() => {
    if (user.type === "admin") {
      if (
        !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
          consumerFields.consumer_sign
        ) &&
        consumerFields.consumer_sign
      ) {
        lastSign.current.fromDataURL(
          consumerFields.insurance_representative_sign
        );
      }
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <form action="#">
        <div className="grid grid-cols-12 gap-2">
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
                    isDisabled={field.isDisabled}
                    value={field.value}
                  />
                )}
                {field.type === "select" && (
                  <SelectPlain
                    placeholder={field.placeholder}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    onChange={field.onChange}
                    isDisabled={field.isDisabled}
                    value={field.value}
                    options={field.options}
                  />
                )}
              </div>
            );
          })}
          <div className="col-span-12 md:col-span-4">
            <InputPlain
              label="Date"
              id="insured_date"
              type="date"
              name="insured_date"
              value={consumerFields.insuranceBenefits?.insured_date}
              onChange={onInsuranceChange}
              isDisabled={user.type === "consumer"}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-end my-5 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="By (Insured or Legal Representative)"
              id="legal_representative"
              type="text"
              name="legal_representative"
              value={consumerFields.insuranceBenefits?.legal_representative}
              onChange={onInsuranceChange}
              isDisabled={user.type === "consumer"}
            />
          </div>
        </div>
        <div className="my-8">
          <TextMd
            classes="font-medium"
            text="that my signature below indicates my agreement to comply with these terms"
          />
        </div>
        <div className="grid grid-cols-12 items-end my-5 gap-2">
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              placeholder="First And Last Name"
              id="representative_name"
              type="text"
              name="representative_name"
              value={consumerFields.insuranceBenefits?.representative_name}
              onChange={onInsuranceChange}
              isDisabled={user.type === "consumer"}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <InputPlain
              id="designation"
              placeholder="Designation"
              type="text"
              name="representative_designation"
              value={
                consumerFields.insuranceBenefits?.representative_designation
              }
              onChange={onInsuranceChange}
              isDisabled={user.type === "consumer"}
            />
          </div>
        </div>

        <div className="my-4 flex flex-col items-start md:flex-row md:items-center justify-evenly">
          {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
            consumerFields.insurance_representative_sign
          ) ? (
            <div className="border-2 w-1/3 h-32 mb-20">
              <Image
                unoptimized
                src={`/uploads/insurance_representative_sign/${consumerFields.insurance_representative_sign}`}
                width={100}
                alt="Loading...."
                height={100}
                className="w-full h-full object-contain"
              />
              <TextMd classes="font-semibold text-center" text="Signature" />
              <InputPlain
                label="Last Date"
                id="insurance_last_date"
                type="date"
                name="insurance_last_date"
                value={consumerFields.insurance_last_date}
                onChange={onGenericChange}
              />
            </div>
          ) : (
            <div>
              <SignatureCanvas
                penColor="black"
                ref={lastSign}
                onEnd={() =>
                  onSignsEnd({
                    target: {
                      name: "insurance_representative_sign",
                      value: lastSign.current.toDataURL(),
                    },
                  })
                }
                canvasProps={{
                  height: 150,
                  width: 300,
                  className: "sigCanvas mx-auto rounded-md border-2",
                }}
              />

              <TextMd classes="font-semibold text-center" text="Signature" />
              <div className="flex gap-4 my-3 justify-center">
                <ButtonPlain
                  text="Clear"
                  isRounded
                  isBordered
                  width="w-48"
                  onClick={(e) => {
                    e.preventDefault();
                    lastSign.current.clear();
                    onSignsClear({
                      target: {
                        name: "insurance_representative_sign",
                        value: "",
                      },
                    });
                  }}
                />
              </div>
              <div className="w-60 mx-auto">
                <InputPlain
                  label="Last Date"
                  id="insurance_last_date"
                  type="date"
                  name="insurance_last_date"
                  value={consumerFields?.insurance_last_date}
                  onChange={onGenericChange}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Step4;
