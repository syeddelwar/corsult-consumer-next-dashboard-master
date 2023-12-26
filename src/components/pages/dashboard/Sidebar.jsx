import {
  IconPlain,
  Text3Xl,
  Text4Xl,
  TextLg,
  TextMd,
} from "@/components/commons";
import { menu, routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { useSignOut } from "@/hooks/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { signOut } = useSignOut();

  // Router Helpers
  const router = useRouter();
  const { route } = router.query;

  // Context
  const { user } = useContext(AuthContext);
  return (
    <aside
      className={`transition-all bg-purple-800 duration-500 md:h-screen md:fixed top-0 ${
        isCollapsed ? "md:w-[6%]" : "md:w-1/4"
      } bottom-0 p-6 py-8 overflow-y-scroll`}
    >
      <div className="flex items-center justify-between">
        {!isCollapsed && (
          <Link
            href={
              user.type === "consumer"
                ? routes.consumerApplication
                : routes.dashboard
            }
            className="hidden md:block"
          >
            <Text3Xl classes="text-white font-semibold" text="Corsult" />
          </Link>
        )}
        <Link
          href={
            user.type === "consumer"
              ? routes.consumerApplication
              : routes.dashboard
          }
          className="md:hidden"
        >
          <Text3Xl classes="text-white font-bold" text="Corsult" />
        </Link>
        {user.type === "admin" || user.type === "nurse" ? (
          <button
            type="button"
            className={`hover:bg-purple-300 ${
              !isCollapsed && "p-2"
            } rounded-lg transition-all duration-300 md:hidden`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <IconPlain
              bgColor="bg-inherit"
              iconClass="fa-bars"
              iconColor="text-white"
            />
          </button>
        ) : (
          <button onClick={signOut}>
            <Text3Xl classes="text-white font-bold md:hidden" text="Logout" />
          </button>
        )}
        <button
          type="button"
          className={`hover:bg-purple-300 ${
            !isCollapsed && "p-2"
          } rounded-lg transition-all duration-300 hidden md:block`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <IconPlain
            bgColor="bg-inherit"
            iconClass="fa-bars"
            iconColor="text-white"
          />
        </button>
      </div>

      <ul className={`my-8 ${isCollapsed && "hidden md:block"}`}>
        {(user.type === "admin" || user.type === "nurse") &&
          menu.admin.map((menu) => {
            if (menu.isAdminOnly && user.type !== "admin") {
              return <></>;
            }
            return (
              <Link
                key={menu.text}
                className={`flex items-center gap-3 my-6 hover:bg-purple-400 ${
                  !isCollapsed && "p-3"
                } rounded-lg transition-all duration-300 ${
                  menu.route === `/?route=${route}` && "bg-purple-400"
                }`}
                href={menu.route}
              >
                <IconPlain
                  bgColor="bg-inherit"
                  size="text-lg"
                  iconClass={menu.icon}
                  iconColor="text-white"
                />
                {!isCollapsed && (
                  <TextLg classes="text-white font-semibold" text={menu.text} />
                )}
              </Link>
            );
          })}

        {user.type === "aid" &&
          menu.aid.map((menu) => {
            return (
              <Link
                key={menu.text}
                className={`flex items-center gap-3 my-6 hover:bg-purple-400 ${
                  !isCollapsed && "p-3"
                } rounded-lg transition-all duration-300 ${
                  menu.route === `/?route=${route}` && "bg-purple-400"
                }`}
                href={menu.route}
              >
                <IconPlain
                  bgColor="bg-inherit"
                  size="text-lg"
                  iconClass={menu.icon}
                  iconColor="text-white"
                />
                {!isCollapsed && (
                  <TextLg classes="text-white font-semibold" text={menu.text} />
                )}
              </Link>
            );
          })}
        {user.type === "consumer" &&
          menu.consumer.map((menu) => {
            return (
              <Link
                key={menu.text}
                className={`flex items-center gap-3 my-6 hover:bg-purple-400 ${
                  !isCollapsed && "p-3"
                } rounded-lg transition-all duration-300 ${
                  menu.route === `/?route=${route}` && "bg-purple-400"
                }`}
                href={menu.route}
              >
                <IconPlain
                  bgColor="bg-inherit"
                  size="text-lg"
                  iconClass={menu.icon}
                  iconColor="text-white"
                />
                {!isCollapsed && (
                  <TextLg classes="text-white font-semibold" text={menu.text} />
                )}
              </Link>
            );
          })}

        <button
          onClick={signOut}
          className={`flex items-center gap-3 my-6 hover:bg-purple-400 ${
            !isCollapsed && "p-3"
          } rounded-lg transition-all duration-300 w-full`}
        >
          <IconPlain
            bgColor="bg-inherit"
            size="text-lg"
            iconClass="fa-solid fa-right-from-bracket"
            iconColor="text-white"
          />
          {!isCollapsed && (
            <TextLg classes="text-white font-semibold" text="Logout" />
          )}
        </button>
      </ul>
    </aside>
  );
};

export default Sidebar;
