import React, { useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  InputCheckbox,
  SelectPlain,
  SpinnerLarge,
  SuccessMessage,
  TextLg,
  WarningMessage,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { useConsumerContract } from "@/hooks/consumerContract";
import { useRouter } from "next/router";
import { useGeneratePDF } from "@/hooks/generatePDF";
import previewPDF from "@/utils/previewPDF";
import { routes } from "@/config";
import SearchPDFs from "./GeneratePDF/SearchPDFs";

const GeneratePDF = ({ isCollapsed }) => {
  const [consumers, setConsumers] = useState([]);
  const [consumer, setConsumer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savePDFOnServer, setSavePDFOnServer] = useState(false);

  // Custom Hooks
  const { list: listConsumerContracts } = useConsumerContract();
  const { read, savePDF } = useGeneratePDF();
  // Contexts
  const { user } = useContext(AuthContext);

  // Router Helpers
  const router = useRouter();
  const { app_id } = router.query;

  // Function to fetch all the applications from database
  const getApplications = async () => {
    if (user.token && user.type === "admin") {
      const res = await listConsumerContracts(user.token);
      if (res.status === 200) {
        const numbers = res.data.map((application) => {
          return {
            text: `${application.consumerInfo.consumer_first_name} ${application.consumerInfo.consumer_last_name}  (${application.consumerInfo.consumer_cell})`,
            value: application._id,
          };
        });

        setConsumers(numbers);
        setIsLoading(false);
      } else {
        WarningMessage(res.response.data);
      }
    }
  };

  // on Change Consumer
  const onChangeConsumer = async (e) => {
    setIsLoading(true);
    setConsumer(e.target.value);
    if (!e.target.value) {
      setIsLoading(false);
      return true;
    }
    const { data } = await read(user.token, e.target.value);

    if (!data.nursingAssessment) {
      setIsLoading(false);
      return WarningMessage("Please completed nursing assessment!");
    }

    const preview = await previewPDF(data);
    if (savePDFOnServer) {
      const res = await savePDF(
        preview,
        user.token,
        data.consumerContract.consumerInfo?.consumer_cell
      );
      setIsLoading(false);
      if (res.status == 201) {
        return SuccessMessage(res.data);
      }

      ErrorMessage(res.response.data);
    }
    setIsLoading(false);
    // If this route is specifically visited for one application,redirect it back to dashboard
    if (app_id) {
      router.push(routes.dashboard);
    }
  };

  useEffect(() => {
    if (app_id) {
      const data = {
        target: {
          value: app_id,
        },
      };
      onChangeConsumer(data);
    } else {
      getApplications();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <SpinnerLarge />
        </div>
      ) : (
        <div className="my-10 mx-4">
          <SelectPlain
            options={consumers}
            placeholder="Select A Consumer"
            value={consumer}
            onChange={onChangeConsumer}
          />
          <InputCheckbox
            isChecked={savePDFOnServer}
            label="Save PDF"
            id="save-pdf"
            name="save-pdf"
            onChange={() => setSavePDFOnServer(!savePDFOnServer)}
          />
          <TextLg
            text="To save pdf on server, please check the Save PDF checkbox and then select consumer"
            classes="font-bold"
          />
          <SearchPDFs />
        </div>
      )}
    </>
  );
};

export default GeneratePDF;
