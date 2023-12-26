import Head from "next/head";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import { ButtonIconned, Text5Xl } from "@/components/commons";
import { useRouter } from "next/router";
import PlanOfCare from "@/components/pages/dashboard/PlanOfCare";
import React, { useContext, useEffect, useState } from "react";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import PatientEmergency from "@/components/pages/dashboard/PatientEmergency";

const AidApplication = () => {
  // Router Helpers
  const router = useRouter();
  const { route } = router.query;

  // Contexts
  const { user } = useContext(AuthContext);

  // States
  const [isCollapsed, setIsCollapsed] = useState(true);

  const buttons = [
    {
      text: "Plan Of Care",
      route: routes.planOfCareForAid,
    },
    {
      text: "Patient Emergency",
      route: routes.patientEmergencyForAid,
    },
  ];

  useEffect(() => {
    // Check If User is not logged in. Throw it to signin page
    if (user.type !== "aid") {
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
        <title>Aid Application</title>
      </Head>
      <div className="grid grid-cols-12 gap-4 justify-center items-center">
        <section className={`transition-all duration-500 col-span-12 relative`}>
          <div className="grid grid-cols-12">
            <div
              className={`col-span-12 ${
                isCollapsed ? "md:col-span-1" : "md:col-span-3"
              }`}
            >
              <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            </div>
            <div
              className={`col-span-12 ${
                isCollapsed ? "md:col-span-11" : "md:col-span-9"
              }`}
            >
              {!route && (
                <>
                  <Text5Xl
                    text="Welcome Back!"
                    classes="font-semibold my-10 text-center"
                  />
                  <div className="w-full px-4 grid grid-cols-12 gap-2 items-center">
                    {buttons.map((button) => {
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
                </>
              )}
              {route === "plan_of_care" && (
                <PlanOfCare isCollapsed={isCollapsed} />
              )}
              {route === "patient_emergency" && (
                <PatientEmergency isCollapsed={isCollapsed} />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AidApplication;
