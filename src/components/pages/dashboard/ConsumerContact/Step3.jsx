import {
  ButtonPlain,
  InputCheckbox,
  InputPlain,
  TextMd,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { ConsumerContractContext } from "@/context/consumerContract/ConsumerContractState";
import { convertToBase64 } from "@/utils";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const Step3 = () => {
  // Contexts
  const {
    onSignDateInfoChange,
    onSignsEnd,
    onSignsClear,
    consumerFields,
    onAgreementChange,
  } = useContext(ConsumerContractContext);
  const { user } = useContext(AuthContext);

  const consumerSign = useRef();
  const authoritySign = useRef();

  const terms = [
    {
      label: "Responsibility",
      id: "acceptance_of_responsibility",
      onChange: onAgreementChange,
      isChecked: consumerFields.acceptance_of_responsibility,
    },
    {
      label: "HIPPA Form",
      id: "acceptance_of_hipaa_form",
      onChange: onAgreementChange,
      isChecked: consumerFields.acceptance_of_hipaa_form,
    },
    {
      label: "Insurance",
      id: "acceptance_of_insurance",
      onChange: onAgreementChange,
      isChecked: consumerFields.acceptance_of_insurance,
    },
    {
      label: "Service Agreement",
      id: "acceptance_of_service_agreement",
      onChange: onAgreementChange,
      isChecked: consumerFields.acceptance_of_service_agreement,
    },
    {
      label: "Conacent",
      id: "acceptance_of_conacent",
      onChange: onAgreementChange,
      isChecked: consumerFields.acceptance_of_conacent,
    },
    {
      label:
        "I hereby acknowledge that I have read and understand and my signature below indicates my agreement to comply with these terms",
      id: "agreed_to_terms",
      onChange: onAgreementChange,
      isChecked: consumerFields.agreed_to_terms,
    },
  ];

  useEffect(() => {
    if (
      !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
        consumerFields.consumer_representative_sign
      ) &&
      consumerFields.consumer_representative_sign
    ) {
      consumerSign.current.fromDataURL(
        consumerFields.consumer_representative_sign
      );
    }
    if (
      !/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
        consumerFields.authority_sign
      ) &&
      consumerFields.authority_sign
    ) {
      authoritySign.current.fromDataURL(consumerFields.authority_sign);
    }

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <TextMd
        classes="font-bold"
        text="This Consumer Contract including the Rights And Responsibilities form has been reviewed with, and a copy given to, the named Consumer/Consumer's representative."
      />
      <TextMd
        classes="font-medium mt-4"
        text="In Witness Whereof, the undersigned with the intent and authority of the legally bind the perspective party, have caused this Agreement to be duly executed and effective as of the Effective Date"
      />
      <div className="my-4 flex flex-col lg:flex-row justify-evenly gap-2">
        {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
          consumerFields.consumer_representative_sign
        ) ? (
          <div>
            <div className="border-2 mx-auto w-80 lg:w-full h-40 md:h-[9.5rem] rounded">
              <Image
                unoptimized
                src={`/uploads/consumer_representative_sign/${consumerFields.consumer_representative_sign}`}
                width={100}
                alt="Loading...."
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
            <TextMd
              classes="font-semibold text-center"
              text="Consumer/Consumer's Representative Signature"
            />
            <div className="my-4">
              <InputPlain
                label="Consumer Sign Date"
                id="consumer_representative_sign_date"
                type="date"
                name="consumer_representative_sign_date"
                value={consumerFields.consumer_representative_sign_date}
                onChange={onSignDateInfoChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <SignatureCanvas
              penColor="black"
              ref={consumerSign}
              onEnd={() =>
                onSignsEnd({
                  target: {
                    name: "consumer_representative_sign",
                    value: consumerSign.current.toDataURL(),
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
              text="Consumer/Consumer's Representative Signature"
            />
            <div className="flex gap-4 my-3 justify-center">
              <ButtonPlain
                text="Clear"
                isRounded
                isBordered
                width="w-48"
                onClick={() => {
                  consumerSign.current.clear();
                  onSignsClear({
                    target: {
                      name: "consumer_representative_sign",
                      value: "",
                    },
                  });
                }}
              />
            </div>
            <div className="my-2 md:my-4 w-60 mx-auto">
              <InputPlain
                label="Consumer Sign Date"
                id="consumer_representative_sign_date"
                type="date"
                name="consumer_representative_sign_date"
                value={consumerFields.consumer_representative_sign_date}
                onChange={onSignDateInfoChange}
              />
            </div>
          </div>
        )}
        {user.type === "admin" ? (
          <>
            {/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
              consumerFields.authority_sign
            ) ? (
              <div className="border-2 w-full md:w-[30%] md:h-[8.2rem]">
                <Image
                  unoptimized
                  src={`/uploads/authority_sign/${consumerFields.authority_sign}`}
                  width={100}
                  alt="Loading...."
                  height={100}
                  className="w-full h-full object-contain"
                />
                <TextMd
                  classes="font-semibold text-center"
                  text="Agency Authorized Signature And Position"
                />

                <div className="flex gap-4 my-3 justify-center">
                  <ButtonPlain
                    text="Clear"
                    isRounded
                    isDisabled={user.type === "consumer"}
                    isBordered
                    width="w-48"
                    onClick={() => {
                      onSignsClear({
                        target: {
                          name: "authority_sign",
                          value: "",
                        },
                      });
                    }}
                  />
                </div>
                <div className="w-60 mx-auto">
                  <InputPlain
                    label="Authorized Sign Date"
                    id="authorized_sign_date"
                    isDisabled={user.type === "consumer"}
                    type="date"
                    name="authorized_sign_date"
                    value={consumerFields.authorized_sign_date}
                    onChange={onSignDateInfoChange}
                  />
                </div>
              </div>
            ) : (
              <div className=" w-full md:w-[30%] md:h-[8.2rem]">
                <SignatureCanvas
                  penColor="black"
                  ref={authoritySign}
                  onEnd={() =>
                    onSignsEnd({
                      target: {
                        name: "authority_sign",
                        value: authoritySign.current.toDataURL(),
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
                  text="Agency Authorized Signature And Position"
                />
                <div className="flex justify-center my-4">
                  <ButtonPlain
                    text="Clear"
                    isRounded
                    isDisabled={user.type === "consumer"}
                    isBordered
                    width="w-48"
                    onClick={() => {
                      authoritySign.current.clear();
                      onSignsClear({
                        target: {
                          name: "authority_sign",
                          value: "",
                        },
                      });
                    }}
                  />
                </div>
                <div>
                  <InputPlain
                    label="Authorized Sign Date"
                    id="authorized_sign_date"
                    isDisabled={user.type === "consumer"}
                    type="date"
                    name="authorized_sign_date"
                    value={consumerFields.authorized_sign_date}
                    onChange={onSignDateInfoChange}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <div className="border-2 mx-auto w-80 lg:w-full h-40 md:h-[9.5rem] rounded">
              {consumerFields.authority_sign && (
                <Image
                  src={`/uploads/authority_sign/${consumerFields.authority_sign}`}
                  width={100}
                  className="w-full h-full object-contain"
                  unoptimized
                  height={130}
                  alt="Loading..."
                />
              )}
            </div>
            <TextMd
              classes="font-semibold text-center"
              text="Agency Authorized Signature And Position"
            />
          </div>
        )}
      </div>
      <div>
        {user.type === "consumer" && (
          <TextMd text="Acceptance of terms:" classes="font-bold" />
        )}
        {user.type === "consumer" &&
          terms.map((term) => {
            return (
              <div key={term.id} className="w-full">
                <InputCheckbox
                  label={term.label}
                  id={term.id}
                  name={term.id}
                  isChecked={
                    /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
                      consumerFields.consumer_representative_sign
                    )
                      ? true
                      : term.isChecked
                  }
                  onChange={onAgreementChange}
                  isDisabled={
                    /(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(
                      consumerFields.consumer_representative_sign
                    )
                      ? true
                      : false
                  }
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Step3;
