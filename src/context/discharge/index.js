import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { useDischarge } from "@/hooks/discharge";

export const DischargeContext = createContext();

export default function DischargeState({ children }) {
  // Contexts
  const { user } = useContext(AuthContext);

  // Custom Hooks
  const { create } = useDischarge();

  const [dischargeFields, setDischargeFields] = useState({
    consumer_contract_id: "",
    discharge_reason: "Hospital",
    summary_of_care: "",
    summary_of_patient_progress: "",
    patient_remaining_needs: "",
    patient_remaining_problems: "",
    other_discharge_reason: "",
    transferred_to: "",
  });

  // On Generic Change
  const onGenericChange = (e) => {
    setDischargeFields({
      ...dischargeFields,
      [e.target.name]: e.target.value,
    });
  };

  // On Discharge Continue
  const createDischarge = () => {
    return create(dischargeFields, user.token);
  };

  const resetState = () => {
    setDischargeFields({
      consumer_contract_id: "",
      discharge_reason: "Hospital",
      summary_of_care: "",
      summary_of_patient_progress: "",
      patient_remaining_needs: "",
      patient_remaining_problems: "",
      other_discharge_reason: "",
      transferred_to: "",
    });
  };

  return (
    <DischargeContext.Provider
      value={{ onGenericChange, dischargeFields, createDischarge, resetState }}
    >
      {children}
    </DischargeContext.Provider>
  );
}
