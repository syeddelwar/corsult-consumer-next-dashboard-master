import {
  IconPlain,
  InputPlain,
  SpinnerSmall,
  TextMd,
  WarningMessage,
} from "@/components/commons";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { usePlanOfCare } from "@/hooks/planOfCare";
import { debounce } from "@/utils";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";

const PlanOfCares = () => {
  // Custom Hooks
  const { list } = usePlanOfCare();

  // Contexts
  const { user } = useContext(AuthContext);
  // States
  const [pocs, setPocs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch all the applications from database
  const getPocs = async () => {
    setIsLoading(true);
    if (user.token && (user.type === "admin" || user.type === "nurse")) {
      const res = await list(user.token);
      if (res.status === 200) {
        setPocs(res.data);
      } else {
        WarningMessage(res.response.data);
      }
    }
    setIsLoading(false);
  };

  /**
   * @function onSearchChange
   *
   * Triggers after 700ms When Someone Types In Search Input
   *
   * Filter the state
   */
  const onSearchChange = async (e) => {
    setIsLoading(true);
    const query = e.target.value;

    const { data } = await list(user.token, query);
    setPocs(data);
    setIsLoading(false);
  };

  const pageContent = () => {
    if (pocs.length > 0) {
      return pocs.map((poc, i) => {
        return (
          <tr className="bg-white border-b" key={poc._id}>
            <th className="px-6 py-4">{i + 1}</th>
            <th className="px-6 py-4">{poc.createdAt.substr(0, 10)}</th>

            <td className="px-6 py-4">
              {`${poc.consumer_contract_id?.consumerInfo?.consumer_first_name} ${poc.consumer_contract_id?.consumerInfo?.consumer_last_name}`}
            </td>
            <td className="px-6 py-4">
              {poc.consumer_contract_id?.consumerInfo?.consumer_email_address}
            </td>
            <td className="px-6 py-4">
              {poc.consumer_contract_id?.consumerInfo?.consumer_cell}
            </td>

            <td className="px-6 py-4 flex items-center gap-2">
              <Link
                href={`${routes.generatePDF}&app_id=${poc.consumer_contract_id?._id}`}
              >
                <IconPlain
                  iconClass="fa-file rounded-md"
                  bgColor="bg-yellow-400"
                />
              </Link>
              <Link
                href={`${routes.planOfCareRead}/${poc.consumer_contract_id?._id}`}
              >
                <IconPlain
                  iconClass="fa-pencil rounded-md"
                  bgColor="bg-blue-500"
                />
              </Link>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr className="bg-white border-b">
          <td className="px-6 py-4 text-center font-bold" colSpan={12}>
            No Plan Of Cares Found
          </td>
        </tr>
      );
    }
  };

  const debouncedFunction = useCallback(debounce(onSearchChange), []);
  useEffect(() => {
    getPocs();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-4">
      <div className="my-4 w-full md:w-1/4 ml-auto">
        <InputPlain
          type="text"
          name="search"
          placeholder="Search By Phone"
          onChange={debouncedFunction}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase  bg-purple-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                <TextMd text="SR No." color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Created" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Name" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Email" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Phone" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Action" color="text-purple-500" />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="bg-white border-b">
                <td className="px-6 py-4" colSpan={12} align="center">
                  <SpinnerSmall />
                </td>
              </tr>
            ) : (
              pageContent()
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanOfCares;