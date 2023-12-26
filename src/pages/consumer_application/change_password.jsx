import React, { useContext, useEffect, useState } from "react";
import {
  ButtonPlain,
  ErrorMessage,
  InputPlain,
  SuccessMessage,
  TextLg,
  WarningMessage,
} from "@/components/commons";
import { useRouter } from "next/router";
import { routes } from "@/config";
import Sidebar from "@/components/pages/dashboard/Sidebar";
import Head from "next/head";
import { useConsumerContract } from "@/hooks/consumerContract";
import { AuthContext } from "@/context/auth/AuthState";

const ChangePassword = () => {
  // Hooks
  const { changePassword } = useConsumerContract();

  // Router Helpers
  const router = useRouter();

  // States
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    c_password: "",
  });

  // Context
  const { user } = useContext(AuthContext);

  // Function to submit change password request
  const onSubmit = async () => {
    setIsLoading(true);

    if (data.password !== data.c_password) {
      setIsLoading(false);
      return WarningMessage("Password And Confirm Password Does Not Match!");
    }
    const jsonData = { app_password: data.password };
    const res = await changePassword(jsonData, user.token);
    /**
     * Check if consumer contract has been added or not
     *
     * ?True: Show Success Message And Push To Dashboard
     */
    if (res.status == 200) {
      SuccessMessage(res.data);
      setIsLoading(false);
      return router.push(routes.consumerApplication);
    }

    setIsLoading(false);
    return ErrorMessage(res.response.data);
  };

  useEffect(() => {
    // Check If User is not logged in. Throw it to signin page
    if (!user.token && router.isReady) {
      router.push(routes.signIn + "?role=consumer");
    }
    if (user.token && user.type !== "consumer") {
      router.push(routes.signIn + "?role=consumer");
    }
    //eslint-disable-next-line
  }, [user, router.isReady]);

  return (
    <>
      <Head>
        <title>Change Password</title>
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
          } relative p-7`}
        >
          <div className="my-6">
            <TextLg
              text="Enter the password you want to change in new password field and enter the same password again in confirm password field and than press submit button to save changes"
              classes="font-bold"
            />
          </div>
          <div className="my-6 md:w-1/2">
            <InputPlain
              type="password"
              label="New Password"
              name="password"
              placeholder="Enter new password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="my-6 md:w-1/2">
            <InputPlain
              type="password"
              label="Confirm Password"
              name="c_password"
              placeholder="Enter confirm password"
              value={data.c_password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="my-6">
            <ButtonPlain
              text="Submit"
              onClick={onSubmit}
              isLoading={isLoading}
              isRounded
              isDisabled={isLoading}
              classes="font-bold"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ChangePassword;
