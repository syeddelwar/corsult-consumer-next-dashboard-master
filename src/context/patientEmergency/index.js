import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { usePatientEmergency } from "@/hooks/patientEmergency";

export const PatientEmergencyContext = createContext();

export default function PatientEmergencyState({ children }) {
  // Contexts
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const { read, create, readLoggedInPatientEmergency, update } =
    usePatientEmergency();

  const [emergencyFields, setEmergencyFields] = useState({
    consumer_contract_id: "",
    patient_emergency_address_one: "",
    patient_emergency_address_two: "",
    med_equipment_provider_name: "",
    med_equipment_provider_phone: "",
    med_supplies_provider_name: "",
    med_supplies_provider_phone: "",
    smoke_alarm_how_many: "",
    smoke_alarm_location: "",
    carbon_monoxide_how_many: "",
    carbon_monoxide_location: "",
    escape_routes_how_many: "",
    escape_routes_location: "",
    person_to_call_name: "",
    person_to_call_phone: "",
    survival_kit: "Yes",
    patient_uses_oxygen: "Yes",
    light_support_equipment: "Yes",
    food_and_water_storage: "Yes",
  });

  // On Generic Change
  const onGenericChange = (e) => {
    setEmergencyFields({
      ...emergencyFields,
      [e.target.name]: e.target.value,
    });
  };

  // On Patient Emergency Continue
  const createEmergency = () => {
    return create(emergencyFields, user.token);
  };
  // On Patient Emergency Read  (For ADMIN)
  const readEmergency = (consumerContractID) => {
    return read(consumerContractID, user.token);
  };
  // Fetch Patient Emergency  (For AID Login)
  const readLoggedInEmergency = () => {
    return readLoggedInPatientEmergency(user.token);
  };

  // On Patient Emergency Edit Continue (FOR Admin)
  const updatePatientEmergency = () => {
    return update(emergencyFields._id, user.token, emergencyFields);
  };

  const resetState = () => {
    setEmergencyFields({
      consumer_contract_id: "",
      patient_emergency_address_one: "",
      patient_emergency_address_two: "",
      med_equipment_provider_name: "",
      med_equipment_provider_phone: "",
      med_supplies_provider_name: "",
      med_supplies_provider_phone: "",
      smoke_alarm_how_many: "",
      smoke_alarm_location: "",
      carbon_monoxide_how_many: "",
      carbon_monoxide_location: "",
      escape_routes_how_many: "",
      escape_routes_location: "",
      person_to_call_name: "",
      person_to_call_phone: "",
      survival_kit: "Yes",
      patient_uses_oxygen: "Yes",
      light_support_equipment: "Yes",
      food_and_water_storage: "Yes",
    });
  };

  return (
    <PatientEmergencyContext.Provider
      value={{
        onGenericChange,
        emergencyFields,
        setEmergencyFields,
        createEmergency,
        readLoggedInEmergency,
        readEmergency,
        updatePatientEmergency,
        resetState,
      }}
    >
      {children}
    </PatientEmergencyContext.Provider>
  );
}
