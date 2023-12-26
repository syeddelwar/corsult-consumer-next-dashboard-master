import Image from "next/image";
import SignInForm from "@/components/pages/signin//SignInForm.jsx";
import { images, routes } from "@/config";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth/AuthState.js";
import { useRouter } from "next/router.js";
import { Text2Xl, TextLg } from "@/components/commons/index.js";
import { useSignOut } from "@/hooks/auth/index.js";

const Signin = () => {
  // Custom Hooks

  const { signOut } = useSignOut();

  // Helpers
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { action } = router.query;
  useEffect(() => {
    // Check If Admin is logged in. Throw it to dashboard page
    if (user.token && user.type === "admin" && router.isReady) {
      router.push(routes.dashboard);
    }
    // Check If Consumer is logged in. Throw it to consumer application page
    if (user.token && user.type === "consumer" && router.isReady) {
      router.push(routes.consumerApplication);
    }
    // Check If Aid is logged in. Throw it to aid application page
    if (user.token && user.type === "aid" && router.isReady) {
      router.push(routes.aidApplication);
    }
    // Check If Nurse is logged in. Throw it to dashboard page
    if (user.token && user.type === "nurse" && router.isReady) {
      router.push(routes.dashboard);
    }
    if (action === "remove_token" && router.isReady) {
      signOut();
    }
    //eslint-disable-next-line
  }, [user, router.isReady]);
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="grid grid-cols-12 gap-4 mx-4 justify-center items-center h-screen">
        <section className="hidden md:block col-span-12 md:col-span-6">
          <Image
            src={images.signin}
            width={400}
            className="w-full"
            height={400}
            alt="Loading..."
            priority
          />
          <Text2Xl
            text="Instructions To Login"
            classes="font-bold text-center"
          />
          <TextLg
            text="1. First check the radio button according to your role. If you are admin than select admin from radio buttons. If you are aid, than select aid from radio buttons and rest follows the same."
            classes="font-medium  mt-5"
          />
          <TextLg
            text="2. Once you selected the role, you can now login with your credentials easily"
            classes="font-medium mt-2"
          />
        </section>
        <SignInForm />
      </div>
    </>
  );
};

export default Signin;
