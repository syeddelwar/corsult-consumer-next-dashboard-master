import {
  ButtonPlain,
  ErrorMessage,
  InputPlain,
  InputRadio,
  SuccessMessage,
  Text4Xl,
} from "@/components/commons";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { useSignIn } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const SignInForm = () => {
  // Helpers
  const router = useRouter();
  const { role } = router.query;

  // Contexts
  const { setUser } = useContext(AuthContext);

  // States
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    login_role: "admin",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Custom Hooks
  const { signInAdmin, signInConsumer } = useSignIn();

  // Form Fields
  const formFields = [
    {
      placeholder:
        userInfo.login_role === "admin" || userInfo.login_role === "nurse"
          ? "Email Address"
          : "Phone",
      id: "email",
      type:
        userInfo.login_role === "admin" || userInfo.login_role === "nurse"
          ? "email"
          : "text",
      name: "email",
      value: userInfo.email,
    },
    {
      placeholder: "Password",
      id: "password",
      type: "password",
      name: "password",
      value: userInfo.password,
    },
  ];

  // Handle On Change Form Fields
  const onChangeAuthInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Handle On Form Submit
  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let response;
    // Error Message ----------------------->
    if (userInfo.login_role === "admin")
      response = await signInAdmin(
        userInfo.email,
        userInfo.password,
        userInfo.login_role
      );
    if (userInfo.login_role === "nurse")
      response = await signInAdmin(
        userInfo.email,
        userInfo.password,
        userInfo.login_role
      );
    if (userInfo.login_role === "consumer")
      response = await signInConsumer(userInfo.email, userInfo.password);
    if (userInfo.login_role === "aid")
      response = await signInConsumer(userInfo.email, userInfo.password);
    // Error Message ----------------------->

    setIsLoading(false);
    if (response.status !== 200) return ErrorMessage("Invalid Credentials");

    if (userInfo.login_role === "admin") {
      // Admin ------------------------->
      const adminStorage = JSON.stringify({
        token: response.data,
        type: "admin",
      });
      localStorage.setItem("corsult-user", adminStorage);
      setUser({ token: response.data, type: "admin" });
      return router.push(routes.dashboard);
      // Admin ------------------------->
    } else if (userInfo.login_role === "consumer") {
      SuccessMessage("Welcome to Your Dashboard");
      // Consumer ------------------------->
      const consumerStorage = JSON.stringify({
        token: response.data,
        type: "consumer",
      });
      localStorage.setItem("corsult-user", consumerStorage);
      setUser({ token: response.data, type: "consumer" });
      return router.push(routes.consumerApplication);
      // Consumer ------------------------->
    } else if (userInfo.login_role === "nurse") {
      // Nurse ------------------------->
      const nurseStorage = JSON.stringify({
        token: response.data,
        type: "nurse",
      });
      localStorage.setItem("corsult-user", nurseStorage);
      setUser({ token: response.data, type: "nurse" });
      return router.push(routes.dashboard);
      // Nurse ------------------------->
    } else {
      // Aid ------------------------->
      const aidStorage = JSON.stringify({
        token: response.data,
        type: "aid",
      });
      localStorage.setItem("corsult-user", aidStorage);
      setUser({ token: response.data, type: "aid" });
      return router.push(routes.aidApplication);
      // Aid ------------------------->
    }
  };

  useEffect(() => {
    if (router.isReady && role === "consumer") {
      setUserInfo({ ...userInfo, login_role: "consumer" });
    }
    //eslint-disable-next-line
  }, [router.isReady]);

  return (
    <section className="col-span-12 md:col-span-6">
      <div className="w-full md:w-2/3 mx-auto">
        <form>
          <Text4Xl
            text={`Corsult ${userInfo.login_role}`}
            classes="font-bold text-center capitalize"
          />
          {formFields.map((field) => {
            return (
              <div key={field.id} className="my-4">
                <InputPlain
                  placeholder={field.placeholder}
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  onChange={onChangeAuthInfo}
                  value={field.value}
                />
              </div>
            );
          })}

          <div className="my-4">
            <ButtonPlain
              text="Login"
              isRounded
              classes="font-bold"
              onClick={onSubmit}
              isDisabled={isLoading}
              isLoading={isLoading}
            />
          </div>
          {!role && (
            <div className="my-4 flex gap-2">
              <InputRadio
                id="login_admin"
                name="login_role"
                isChecked={userInfo.login_role === "admin"}
                onChange={onChangeAuthInfo}
                value="admin"
                label="Admin"
              />
              <InputRadio
                id="login_consumer"
                name="login_role"
                isChecked={userInfo.login_role === "consumer"}
                onChange={onChangeAuthInfo}
                value="consumer"
                label="Consumer"
              />
              <InputRadio
                id="login_aid"
                name="login_role"
                isChecked={userInfo.login_role === "aid"}
                onChange={onChangeAuthInfo}
                value="aid"
                label="Aid"
              />
              <InputRadio
                id="login_nurse"
                name="login_role"
                isChecked={userInfo.login_role === "nurse"}
                onChange={onChangeAuthInfo}
                value="nurse"
                label="Nurse"
              />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
