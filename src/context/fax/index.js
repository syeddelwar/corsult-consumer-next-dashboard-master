import { useFax } from "@/hooks/fax";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "../auth/AuthState";
import { WarningMessage } from "@/components/commons";

export const FaxContext = createContext();

export default function FaxState({ children }) {
  // Custom Hooks
  const { create } = useFax();
  // Contexts
  const { user } = useContext(AuthContext);

  const [faxFields, setFaxFields] = useState({
    consumer_contract_id: "",
    surgical_procedure: "",
    surgical_procedure_date: "",
    dme_and_supplies: "",
    consumerPDF: "",
  });

  // On Generic Change
  const onGenericChange = (e) => {
    setFaxFields({
      ...faxFields,
      [e.target.name]: e.target.value,
    });
  };

  // On Fax Continue
  const createFax = () => {
    if (!faxFields.consumerPDF) {
      return WarningMessage("Please select PDF");
    }
    return create(faxFields, user.token);
  };

  const resetState = () => {
    setFaxFields({
      consumer_contract_id: "",
      surgical_procedure: "",
      surgical_procedure_date: "",
      dme_and_supplies: "",
    });
  };

  return (
    <FaxContext.Provider
      value={{ onGenericChange, faxFields, createFax, resetState }}
    >
      {children}
    </FaxContext.Provider>
  );
}
