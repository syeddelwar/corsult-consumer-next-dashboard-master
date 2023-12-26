import { InputPlain, InputTextArea, SelectPlain } from "@/components/commons";
import { FaxContext } from "@/context/fax";
import React, { useContext } from "react";

const Step1 = ({ consumer, consumerPdfs }) => {
  const { faxFields, onGenericChange } = useContext(FaxContext);

  return (
    <section>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="To"
            placeholder="To"
            id="to"
            type="text"
            name="fax_to"
            isDisabled={true}
            value={`${consumer?.pcp?.pcp_first_name} ${consumer?.pcp?.pcp_last_name}`}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="From"
            id="from"
            type="text"
            name="fax_from"
            value="Axzons Home Health Care"
            isDisabled={true}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Fax"
            placeholder="Fax"
            id="to_fax_no"
            type="text"
            name="to_fax_no"
            isDisabled={true}
            value={consumer?.pcp?.pcp_fax_no}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Fax"
            id="from_fax_no"
            type="text"
            name="from_fax_no"
            value="1-866-429-9667"
            isDisabled={true}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Phone"
            placeholder="Fax"
            id="to_fax_phone"
            type="text"
            name="to_fax_phone"
            isDisabled={true}
            value={consumer?.pcp?.pcp_phone_no}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Phone"
            id="from_fax_phone"
            type="text"
            name="from_fax_phone"
            value="1-866-429-9667"
            isDisabled={true}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Subject"
            placeholder="Subject"
            id="fax_subject"
            type="text"
            name="fax_subject"
            isDisabled={true}
            value="Home health plan of care and certification"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <InputPlain
            label="Date"
            id="fax_date"
            type="date"
            name="fax_date"
            isDisabled={true}
            onChange={onGenericChange}
            value={consumer?.consumer_representative_sign_date}
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="To Doctor"
            placeholder="Doctor Name"
            id="fax_doctor"
            type="text"
            name="fax_doctor"
            isDisabled={true}
            value={`${consumer?.pcp?.pcp_first_name} ${consumer?.pcp?.pcp_last_name}`}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Plan Of Care For"
            placeholder="Patient Name"
            id="fax_plan_of_care_for"
            type="text"
            name="fax_plan_of_care_for"
            isDisabled={true}
            value={`${consumer?.consumerInfo?.consumer_first_name} ${consumer?.consumerInfo?.consumer_last_name}`}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="DOB"
            placeholder="Patient DOB"
            id="fax_dob"
            type="date"
            name="fax_dob"
            isDisabled={true}
            value={consumer?.consumerInfo?.consumer_dob}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Address"
            placeholder="Enter Address"
            id="fax_address"
            type="text"
            name="fax_address"
            isDisabled={true}
            value={`${consumer?.consumerInfo?.consumer_street_address}, ${consumer?.consumerInfo?.consumer_city}, ${consumer?.consumerInfo?.consumer_state}, ${consumer?.consumerInfo?.consumer_zip}`}
          />
        </div>
        {/* <div className="col-span-12">
          <InputTextArea
            label="Comments"
            placeholder="Comments"
            id="fax_comments"
            name="fax_comments"
            onChange={onGenericChange}
            value={faxFields.fax_comments}
          />
        </div> */}
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Surgical Procedure"
            placeholder="Surgical Procedure"
            id="surgical_procedure"
            name="surgical_procedure"
            onChange={onGenericChange}
            value={faxFields.surgical_procedure}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="Surgical Procedure Date"
            placeholder="Surgical Procedure Date"
            type="date"
            id="surgical_procedure_date"
            name="surgical_procedure_date"
            onChange={onGenericChange}
            value={faxFields.surgical_procedure_date}
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <InputPlain
            label="DME And Supplies"
            placeholder="DME And Supplies"
            id="dme_and_supplies"
            name="dme_and_supplies"
            onChange={onGenericChange}
            value={faxFields.dme_and_supplies}
          />
        </div>

        <div className="col-span-12 md:col-span-3">
          <SelectPlain
            label="Select PDF"
            placeholder="Select PDF"
            id="consumerPDF"
            name="consumerPDF"
            onChange={onGenericChange}
            options={consumerPdfs}
            value={faxFields.consumerPDF}
          />
        </div>
      </div>
    </section>
  );
};

export default Step1;
