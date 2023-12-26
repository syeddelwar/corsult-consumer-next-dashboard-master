import Head from "next/head";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import { ButtonIconned, Text5Xl } from "@/components/commons";
import { useRouter } from "next/router";
import ConsumerContact from "@/components/pages/dashboard/ConsumerContract";
import NursingAssessment from "@/components/pages/dashboard/NursingAssessment";
import Discharge from "@/components/pages/dashboard/Discharge";
import Fax from "@/components/pages/dashboard/Fax";
import PlanOfCare from "@/components/pages/dashboard/PlanOfCare";
import { useContext, useEffect, useState } from "react";
import { routes } from "@/config";
import PatientEmergency from "@/components/pages/dashboard/PatientEmergency";
import { AuthContext } from "@/context/auth/AuthState";
import ConsumerApplications from "@/components/pages/dashboard/ConsumerContact/ConsumerApplications";
import GeneratePDF from "@/components/pages/dashboard/GeneratePDF";

const Dashboard = () => {
  // Router Helpers
  const router = useRouter();
  const { route } = router.query;

  // Contexts
  const { user } = useContext(AuthContext);

  // States
  const [isCollapsed, setIsCollapsed] = useState(true);
  const buttons = [
    {
      text: "New Consumer Contract",
      route: routes.consumerContract,
      isAdminOnly: true,
    },
    {
      text: "Nursing Assessment",
      route: routes.nursingAssessment,
    },
    {
      text: "Plan Of Care",
      route: routes.planOfCare,
    },
    {
      text: "Patient Emergency",
      route: routes.patientEmergency,
    },
    {
      text: "Generate PDF",
      route: routes.generatePDF,
      isAdminOnly: true,
    },
    {
      text: "Fax To Doctor",
      route: routes.fax,
    },
    {
      text: "Discharge/Transfer",
      route: routes.discharge,
    },
  ];
  useEffect(() => {
    // Check If User is not logged in. Throw it to signin page
    if (router.isReady && user.type !== "admin" && user.type !== "nurse") {
      router.push(routes.signIn);
    }
    if (!user.token && router.isReady) {
      router.push(routes.signIn);
    }
    //eslint-disable-next-line
  }, [user, router.isReady]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-12 gap-4 justify-center items-center">
        <section
          className={`col-span-12 ${
            isCollapsed ? "md:col-span-1" : "md:col-span-3"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </section>
        <section
          className={`transition-all duration-500 col-span-12 ${
            isCollapsed ? "md:col-span-11" : "md:col-span-9"
          } relative`}
        >
          {!route && (
            <>
              <Text5Xl
                text="Welcome Back!"
                classes="font-semibold my-10 text-center"
              />
              <div className="w-full px-4 grid grid-cols-12 gap-2 items-center">
                {buttons.map((button) => {
                  if (button.isAdminOnly && user.type !== "admin") {
                    return <></>;
                  }
                  return (
                    <div
                      key={button.text}
                      className="col-span-12 md:col-span-6"
                    >
                      <ButtonIconned
                        text={button.text}
                        onClick={() => router.push(button.route)}
                        width="w-full"
                        justify="justify-start"
                        icon="fa-solid fa-chevron-right rounded font-extrabold "
                        color="bg-white"
                        textColor="text-black font-extrabold"
                        iconColor="text-purple-500 !bg-purple-200"
                        iconPosition="left"
                        padding="p-10 pr-5"
                      />
                    </div>
                  );
                })}
              </div>
              <ConsumerApplications />
            </>
          )}
          {route === "consumer_contract" && (
            <ConsumerContact isCollapsed={isCollapsed} />
          )}
          {route === "nursing_assessment" && (
            <NursingAssessment isCollapsed={isCollapsed} />
          )}
          {route === "discharge" && <Discharge isCollapsed={isCollapsed} />}
          {route === "fax" && <Fax isCollapsed={isCollapsed} />}
          {route === "plan_of_care" && <PlanOfCare isCollapsed={isCollapsed} />}
          {route === "patient_emergency" && (
            <PatientEmergency isCollapsed={isCollapsed} />
          )}
          {route === "generate_pdf" && (
            <GeneratePDF isCollapsed={isCollapsed} />
          )}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
