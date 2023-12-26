import {
  InputCheckbox,
  InputPlain,
  SelectPlain,
  TextMd,
  TextSm,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import React, { useContext } from "react";

const Step2 = () => {
  // const patientSign = useRef();

  // Contexts
  const {
    consumerFields,
    onAuthorizationChange,
    onTreatmentChange,
    onAuthorizationDiscussionChange,
    onSignDateInfoChange,
    onSignsClear,
    onSignsEnd,
    onGenericChange,
    isTouched,
  } = useContext(ConsumerContractContext);

  const { user } = useContext(AuthContext);
  const formFields = [
    {
      placeholder: "Patient First Name",
      label: "Patient First Name",
      id: "patient_first_name",
      type: "text",
      name: "patient_first_name",
      value: consumerFields.consumerInfo.consumer_first_name,
    },
    {
      placeholder: "Patient Last Name",
      label: "Patient Last Name",
      id: "patient_last_name",
      type: "text",
      name: "patient_last_name",
      value: consumerFields.consumerInfo.consumer_last_name,
    },
    {
      placeholder: "Date Of Birth",
      label: "Date Of Birth",
      id: "patient_dob",
      type: "date",
      name: "patient_dob",
      value: consumerFields.consumerInfo.consumer_dob,
    },
    {
      placeholder: "Social Security Number",
      label: "Social Security Number",
      id: "patient_ssn",
      type: "text",
      name: "patient_ssn",
      value: consumerFields.consumerInfo.consumer_ssn,
    },
    {
      placeholder: "Patient Address",
      label: "Patient Address",
      id: "patient_address",
      type: "text",
      name: "patient_address",
      value: consumerFields.consumerInfo.consumer_street_address,
    },
    {
      placeholder: consumerFields.consumerInfo.consumer_state,
      label: "Select State",
      id: "patient_state",
      type: "select",
      name: "patient_state",
      value: consumerFields.consumerInfo.consumer_state,
      options: [],
    },
  ];

  // useEffect(() => {
  //   if (
  //     !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(consumerFields.consumer_sign)
  //   ) {
  //     patientSign.current.fromDataURL(consumerFields.consumer_sign);
  //   }
  //   //eslint-disable-next-line
  // }, []);

  return (
    <div>
      <TextMd
        classes="font-bold text-center"
        text="AUTHORIZATION FOR RELEASE OF HEALTH INFORMATION PURSUANT TO HIPPA"
      />
      <TextMd
        classes="font-medium mt-1 text-center"
        text="(This form has been approved by the New York State Department of Health)"
      />
      <form action="" className="mt-4">
        <div className="grid grid-cols-12 gap-4">
          {formFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-4">
                {field.type !== "select" && (
                  <InputPlain
                    placeholder={field.placeholder}
                    label={field.label}
                    value={field.value}
                    isDisabled
                    id={field.id}
                    type={field.type}
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
                {field.type === "select" && (
                  <SelectPlain
                    placeholder={field.placeholder}
                    label={field.label}
                    value={field.value}
                    isDisabled
                    id={field.id}
                    name={field.name}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={field.options}
                  />
                )}
              </div>
            );
          })}
          <div className="col-span-12">
            <TextMd
              classes="font-bold mt-1"
              text="6. This Authorization does not authorize you to discuss my health information or medical care with anyone other than attorney or governmental agency specified in item 9 (b)"
            />
            <TextMd
              classes="font-medium mt-1"
              text="7. Name and address of health provider or entity to release information:"
            />
            <TextMd
              classes="font-semibold mt-1"
              text="Axzons health system corp 70 E sunrise Hwy, Ste 500, Valley Stream, NY 11581"
            />
            <TextMd
              classes="font-medium mt-1"
              text="8. Name and address of person(s) or category of person to whom this information will be sent"
            />
            <InputPlain
              placeholder="Name and address"
              id="person_to_send_info"
              type="text"
              name="person_to_send_info"
              value={consumerFields.authorizationForRelease.person_to_send_info}
              onChange={onAuthorizationChange}
              isDisabled={user.type === "consumer"}
            />
            <TextMd
              classes="font-medium mt-1"
              text="9(a). Specify information to be released"
            />
            <div className="grid grid-cols-12 gap-2 my-4">
              <div className="col-span-12 md:col-span-6">
                <InputPlain
                  label="Medical Record from (insert date)"
                  placeholder="Date"
                  id="medical_record_from"
                  type="date"
                  name="medical_record_from"
                  value={
                    consumerFields.authorizationForRelease.medical_record_from
                  }
                  onChange={onAuthorizationChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <InputPlain
                  label="Medical Record to (insert date)"
                  placeholder="Date"
                  id="medical_record_to"
                  type="date"
                  name="medical_record_to"
                  value={
                    consumerFields.authorizationForRelease.medical_record_to
                  }
                  onChange={onAuthorizationChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
            </div>
            <div>
              <TextMd
                classes="font-semibold"
                text="Entire medical record, including patient histories, office notes (except psychotherapy notes), test results, radiology studies,films,referrals,consults,billing records,insurance records, and records sent to you by other health care providers"
              />
            </div>
            <div className="my-4">
              <TextSm text="Other:" classes="font-bold" />
              <InputPlain
                placeholder="Other Information"
                id="other_auth_information"
                type="text"
                name="other_auth_information"
                value={
                  consumerFields.authorizationForRelease.other_auth_information
                }
                onChange={onAuthorizationChange}
                isDisabled={user.type === "consumer"}
              />
            </div>
            <div className="my-4 flex flex-col items-start md:flex-row md:items-center gap-2">
              <TextSm text="Include:" classes="font-bold" />
              <InputCheckbox
                id="alcohol_treatment"
                name="alcohol_treatment"
                isChecked={
                  consumerFields.authorizationForRelease.treatments
                    .alcohol_treatment
                }
                onChange={onTreatmentChange}
                isDisabled={user.type === "consumer"}
                label="Alcohol/Drug Treatment"
              />
              <InputCheckbox
                id="mental_health_treatment"
                name="mental_health_treatment"
                isChecked={
                  consumerFields.authorizationForRelease.treatments
                    .mental_health_treatment
                }
                onChange={onTreatmentChange}
                isDisabled={user.type === "consumer"}
                label="Mental Health Treatment"
              />
              <InputCheckbox
                id="hiv_treatment"
                name="hiv_treatment"
                isChecked={
                  consumerFields.authorizationForRelease.treatments
                    .hiv_treatment
                }
                onChange={onTreatmentChange}
                isDisabled={user.type === "consumer"}
                label="HIV-Related Information"
              />
            </div>
            <div className="my-4 flex flex-col gap-2">
              <TextMd
                text="Authorization To Discuss Health Information:"
                classes="font-bold"
              />
            </div>

            <div className="flex flex-col gap-2">
              <TextSm text="(b) By initialing here" />
              <InputPlain
                placeholder="Initials"
                id="initials"
                type="text"
                name="initials"
                value={consumerFields.authorizationToDiscussHealth.initials}
                onChange={onAuthorizationDiscussionChange}
                isDisabled={user.type === "consumer"}
              />
              <TextSm text="I authorize" />
              <InputPlain
                placeholder="Name of individual health care provider"
                id="individual_health_care_provider"
                type="text"
                name="individual_health_care_provider"
                value={
                  consumerFields.authorizationToDiscussHealth
                    .individual_health_care_provider
                }
                onChange={onAuthorizationDiscussionChange}
                isDisabled={user.type === "consumer"}
              />
              <InputPlain
                placeholder="To discuss my health information with my attorney, or a governmental agency, listed here:"
                id="health_info_with_attorney"
                type="text"
                name="health_info_with_attorney"
                value={
                  consumerFields.authorizationToDiscussHealth
                    .health_info_with_attorney
                }
                onChange={onAuthorizationDiscussionChange}
                isDisabled={user.type === "consumer"}
              />
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="my-2 col-span-12 md:col-span-6">
                <InputPlain
                  label="10. Reason for release of information"
                  placeholder="At request of individual"
                  id="other_reason_for_info_release"
                  type="text"
                  name="other_reason_for_info_release"
                  value={
                    consumerFields.authorizationToDiscussHealth
                      .other_reason_for_info_release
                  }
                  onChange={onAuthorizationDiscussionChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
              <div className="my-2 col-span-12 md:col-span-6">
                <InputPlain
                  label="11. Date or event on which this authorization will expire"
                  placeholder="Write something..."
                  id="auth_expire_date"
                  type="date"
                  name="auth_expire_date"
                  value={
                    consumerFields.authorizationToDiscussHealth.auth_expire_date
                  }
                  onChange={onAuthorizationDiscussionChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
              <div className="my-2 col-span-12 md:col-span-6">
                <InputPlain
                  label="12. If not the patient, name of person signing form"
                  placeholder="Name of person"
                  id="person_signing_form"
                  type="text"
                  name="person_signing_form"
                  value={
                    consumerFields.authorizationToDiscussHealth
                      .person_signing_form
                  }
                  onChange={onAuthorizationDiscussionChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
              <div className="my-2 col-span-12 md:col-span-6">
                <InputPlain
                  label="13. Authority to sign on behalf of patient"
                  placeholder="Name of person"
                  id="auth_to_sign_on_behalf_of_consumer"
                  type="text"
                  name="auth_to_sign_on_behalf_of_consumer"
                  value={
                    consumerFields.authorizationToDiscussHealth
                      .auth_to_sign_on_behalf_of_consumer
                  }
                  onChange={onAuthorizationDiscussionChange}
                  isDisabled={user.type === "consumer"}
                />
              </div>
            </div>
            <div>
              <TextMd
                classes="font-medium mt-1"
                text="All items on this form have been completed and my questions about this form have been answered. In addition, I have been provided a copy of the form"
              />
            </div>
            {/* <div className="my-4 flex flex-col items-start md:flex-row md:items-center justify-evenly">
              {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
                consumerFields.consumer_sign
              ) ? (
                <div className="border-2 w-1/3 h-32 mb-32">
                  <Image
                    unoptimized
                    src={`/uploads/consumer_sign/${consumerFields.consumer_sign}`}
                    width={100}
                    alt="Loading...."
                    height={100}
                    className="w-full h-full object-contain"
                  />
                  <TextMd
                    classes="font-semibold text-center"
                    text="Signature of patient or representative authorized by law"
                  />
                  <InputPlain
                    label="Date"
                    id="consumer_sign_date"
                    type="date"
                    name="consumer_sign_date"
                    value={consumerFields.consumer_sign_date}
                    onChange={onSignDateInfoChange}
                  />
                </div>
              ) : (
                <div>
                  <SignatureCanvas
                    penColor="black"
                    ref={patientSign}
                    onEnd={() =>
                      onSignsEnd({
                        target: {
                          name: "consumer_sign",
                          value: patientSign.current.toDataURL(),
                        },
                      })
                    }
                    canvasProps={{
                            height: 150,
                width: 300,
                className: "sigCanvas mx-auto rounded-md border-2",
                    }}
                  />
                  <TextMd
                    classes="font-semibold text-center"
                    text="Signature of patient or representative authorized by law"
                  />
                  <div className="flex gap-4 my-3 justify-center">
                    <ButtonPlain
                      text="Clear"
                      isRounded
                      isBordered
                      width="w-48"
                      onClick={() => {
                        patientSign.current.clear();
                        onSignsClear({
                          target: {
                            name: "consumer_sign",
                            value: "",
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="w-60 mx-auto">
                    <InputPlain
                      label="Date"
                      id="consumer_sign_date"
                      type="date"
                      name="consumer_sign_date"
                      value={consumerFields.consumer_sign_date}
                      onChange={onSignDateInfoChange}
                    />
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
        {(user.type === "admin" || user.type === "nurse") && (
          <div className="w-full">
            <InputPlain
              placeholder="Application Password"
              label="Application Password"
              id="app_password"
              type="text"
              name="app_password"
              value={consumerFields.app_password}
              onChange={onGenericChange}
              error={
                isTouched["app_password"] && !consumerFields["app_password"]
              }
              errorText={"Field is required"}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Step2;
