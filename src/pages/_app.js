import AuthState from "@/context/auth/AuthState";
import ConsumerContractState from "@/context/consumerContract/ConsumerContractState";
import DischargeState from "@/context/discharge";
import FaxState from "@/context/fax";
import NursingAssessmentState from "@/context/nursingAssessment/NursingAssessmentState";
import PatientEmergencyState from "@/context/patientEmergency";
import PlanOfCareState from "@/context/planOfCare";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <AuthState>
        <ConsumerContractState>
          <NursingAssessmentState>
            <DischargeState>
              <PatientEmergencyState>
                <FaxState>
                  <PlanOfCareState>
                    <Component {...pageProps} />
                  </PlanOfCareState>
                </FaxState>
              </PatientEmergencyState>
            </DischargeState>
          </NursingAssessmentState>
        </ConsumerContractState>
      </AuthState>
    </>
  );
}
