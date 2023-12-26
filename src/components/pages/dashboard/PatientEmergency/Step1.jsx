import {
  InputCollapse,
  InputPlain,
  SectionCollapse,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { PatientEmergencyContext } from "@/context/patientEmergency";
import React, { useContext } from "react";

const Step1 = ({ consumer }) => {
  // Context
  const { onGenericChange, emergencyFields } = useContext(
    PatientEmergencyContext
  );
  const { user } = useContext(AuthContext);
  const formFields = [
    {
      label: "Emergency Phone One",
      placeholder: "Emergency Phone One",
      id: "patient_emergency_phone_one",
      type: "text",
      name: "patient_emergency_phone_one",
      value: consumer?.emergencyOne?.emergency_one_phone,
      isDisabled: true,
    },
    {
      label: "Emergency Phone Two",
      placeholder: "Emergency Phone Two",
      id: "patient_emergency_phone_two",
      type: "text",
      name: "patient_emergency_phone_two",
      value: consumer?.emergencyTwo?.emergency_two_phone,
      isDisabled: true,
    },
    {
      label: "Emergency Address One",
      placeholder: "Emergency Address One",
      id: "patient_emergency_address_one",
      type: "text",
      name: "patient_emergency_address_one",
      value: emergencyFields.patient_emergency_address_one,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Emergency Address Two",
      placeholder: "Emergency Address Two",
      id: "patient_emergency_address_two",
      type: "text",
      name: "patient_emergency_address_two",
      value: emergencyFields.patient_emergency_address_two,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];

  const medEquipmentProviderFields = [
    {
      label: "Name",
      placeholder: "Name",
      id: "med_equipment_provider_name",
      type: "text",
      name: "med_equipment_provider_name",
      value: emergencyFields.med_equipment_provider_name,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Phone",
      placeholder: "Phone",
      id: "med_equipment_provider_phone",
      type: "text",
      name: "med_equipment_provider_phone",
      value: emergencyFields.med_equipment_provider_phone,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  const medSuppliesProviderFields = [
    {
      label: "Name",
      placeholder: "Name",
      id: "med_supplies_provider_name",
      type: "text",
      name: "med_supplies_provider_name",
      value: emergencyFields.med_supplies_provider_name,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Phone",
      placeholder: "Phone",
      id: "med_supplies_provider_phone",
      type: "text",
      name: "med_supplies_provider_phone",
      value: emergencyFields.med_supplies_provider_phone,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  const smokeAlarmsFields = [
    {
      label: "How Many",
      placeholder: "How Many",
      id: "smoke_alarm_how_many",
      type: "number",
      name: "smoke_alarm_how_many",
      value: emergencyFields.smoke_alarm_how_many,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Location",
      placeholder: "Location",
      id: "moke_alarm_location",
      type: "text",
      name: "smoke_alarm_location",
      value: emergencyFields.smoke_alarm_location,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  const carbonMonoxideFields = [
    {
      label: "How Many",
      placeholder: "How Many",
      id: "carbon_monoxide_how_many",
      type: "number",
      name: "carbon_monoxide_how_many",
      value: emergencyFields.carbon_monoxide_how_many,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Location",
      placeholder: "Location",
      id: "carbon_monoxide_location",
      type: "text",
      name: "carbon_monoxide_location",
      value: emergencyFields.carbon_monoxide_location,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  const escapeRoutesFields = [
    {
      label: "How Many",
      placeholder: "How Many",
      id: "escape_routes_how_many",
      type: "number",
      name: "escape_routes_how_many",
      value: emergencyFields.escape_routes_how_many,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Location",
      placeholder: "Location",
      id: "escape_routes_location",
      type: "text",
      name: "escape_routes_location",
      value: emergencyFields.escape_routes_location,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  const personToCallFields = [
    {
      label: "Name",
      placeholder: "Name",
      id: "person_to_call_name",
      type: "text",
      name: "person_to_call_name",
      value: emergencyFields.person_to_call_name,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
    {
      label: "Ph",
      placeholder: "Ph",
      id: "person_to_call_phone",
      type: "text",
      name: "person_to_call_phone",
      value: emergencyFields.person_to_call_phone,
      isDisabled: user.type === "aid" || user.type === "consumer",
    },
  ];
  return (
    <>
      <SectionCollapse title="Emergency Contact Information">
        <div className="grid grid-cols-12 gap-3">
          {formFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Medical equipment provider">
        <div className="grid grid-cols-12 gap-3">
          {medEquipmentProviderFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Medical supplies provider">
        <div className="grid grid-cols-12 gap-3">
          {medSuppliesProviderFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Smoke Alarm">
        <div className="grid grid-cols-12 gap-3">
          {smokeAlarmsFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Carbon Monoxide Alarm">
        <div className="grid grid-cols-12 gap-3">
          {carbonMonoxideFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Escape Routes">
        <div className="grid grid-cols-12 gap-3">
          {escapeRoutesFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Person to Call in case of separation">
        <div className="grid grid-cols-12 gap-3">
          {personToCallFields.map((field) => {
            return (
              <div key={field.id} className="col-span-12 md:col-span-6">
                <InputPlain
                  label={field.label}
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onGenericChange}
                  value={field.value}
                  isDisabled={field.isDisabled}
                />
              </div>
            );
          })}
        </div>
      </SectionCollapse>
      <SectionCollapse title="Ready List" isLast>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              heading="Emergency Survival Kit"
              radios={["Yes", "No"]}
              radioValue={emergencyFields.survival_kit}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onGenericChange
                  : null
              }
              radioName="survival_kit"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              heading="Is the patient using oxygen"
              radios={["Yes", "No"]}
              radioValue={emergencyFields.patient_uses_oxygen}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onGenericChange
                  : null
              }
              radioName="patient_uses_oxygen"
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <InputCollapse
              type="radios"
              heading="Ventilator/Light support equipment"
              radios={["Yes", "No"]}
              radioValue={emergencyFields.light_support_equipment}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onGenericChange
                  : null
              }
              radioName="light_support_equipment"
            />
          </div>
          <div className="col-span-12">
            <InputCollapse
              type="radios"
              heading="Food and Water store for 3 days for each person (1 Gallon per day per person)"
              radios={["Yes", "No"]}
              radioValue={emergencyFields.food_and_water_storage}
              onChange={
                user.type === "admin" || user.type === "nurse"
                  ? onGenericChange
                  : null
              }
              radioName="food_and_water_storage"
            />
          </div>
        </div>
      </SectionCollapse>
    </>
  );
};

export default Step1;
