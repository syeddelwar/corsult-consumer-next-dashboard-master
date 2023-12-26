import {
  ButtonPlain,
  IconPlain,
  InputPlain,
  SpinnerSmall,
  SuccessMessage,
  TextMd,
  TextSm,
  TimeAgo,
  WarningMessage,
} from "@/components/commons";
import { routes } from "@/config";
import { AuthContext } from "@/context/auth/AuthState";
import { useConsumerContract } from "@/hooks/consumerContract";
import { debounce } from "@/utils";
import Link from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ConsumerApplications = () => {
  // Custom Hooks
  const { list, deleteApplication } = useConsumerContract();

  // Contexts
  const { user } = useContext(AuthContext);
  // States
  const [applications, setApplications] = useState([]);
  const [viewMoreApps, setViewMoreApps] = useState([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch all the applications from database
  const getApplications = async () => {
    if (user.token && (user.type === "admin" || user.type === "nurse")) {
      setIsLoading(true);
      const res = await list(user.token);
      if (res.status === 200) {
        const remainingData = res.data.slice(11, 9999999999);
        setViewMoreApps(remainingData);
        setApplications(res.data.slice(0, 10));

        setIsLoading(false);
      } else {
        WarningMessage(res?.response?.data);
      }
    }
  };
  // Function to delete application from database on clicking trash button
  const onClickTrash = async (id) => {
    if (
      confirm("Are you sure you want to delete this patient?") &&
      user.token &&
      user.type === "admin"
    ) {
      let delete_pdfs = false;
      if (confirm("Do you want to delete patient pdfs?")) {
        delete_pdfs = true;
      }
      setIsDeleting(true);

      const res = await deleteApplication(user.token, id, delete_pdfs);
      if (res.status === 200) {
        const filteredData = applications.filter((app) => {
          return app._id !== id;
        });
        setApplications(filteredData);
        setIsDeleting(false);
        SuccessMessage(res.data);
      } else {
        WarningMessage(res?.response?.data);
        setIsDeleting(false);
      }
    }
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
    setApplications(data);
    setIsLoading(false);
  };

  const pageContent = () => {
    if (applications.length > 0) {
      return applications.map((application) => {
        return (
          <tr className="bg-white border-b" key={application._id}>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {application.consumerInfo.consumer_mrn}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {application.createdAt.substr(0, 10)}
            </th>
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {application.consumerInfo.consumer_dob
                ? application.consumerInfo.consumer_dob.substr(0, 10)
                : "Not Available"}
            </th>
            <td className="px-6 py-4">
              {`${application.consumerInfo.consumer_first_name} ${application.consumerInfo.consumer_last_name}`}
            </td>
            <td className="px-6 py-4">
              {application.consumerInfo.consumer_email_address}
            </td>
            <td className="px-6 py-4">
              {application.consumerInfo.consumer_cell}
            </td>
            <td className="px-6 py-4">
              {application.consumerInfo.consumer_medicaid_id || "Not Available"}
            </td>
            <td className="px-6 py-4">
              {application.consumer_representative_sign &&
              application.authority_sign ? (
                <TextMd
                  color="text-green-400"
                  classes="font-bold"
                  text="Completed"
                />
              ) : (
                <TextMd
                  color="text-red-400"
                  classes="font-bold"
                  text="Not Completed"
                />
              )}
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center gap-2">
                <Link href={`${routes.consumerApplication}/${application._id}`}>
                  <IconPlain
                    iconClass="fa-pencil rounded-md"
                    bgColor="bg-blue-500"
                  />
                </Link>
                <Link href={`${routes.generatePDF}&app_id=${application._id}`}>
                  <IconPlain
                    iconClass="fa-file rounded-md"
                    bgColor="bg-yellow-400"
                  />
                </Link>
                {user.type === "admin" && (
                  <button
                    type="button"
                    onClick={() => onClickTrash(application._id)}
                  >
                    {isDeleting ? (
                      <SpinnerSmall />
                    ) : (
                      <IconPlain
                        iconClass="fa-trash rounded-md"
                        bgColor="bg-red-500"
                      />
                    )}
                  </button>
                )}
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr className="bg-white border-b">
          <td className="px-6 py-4 text-center font-bold" colSpan={12}>
            No Applications Found
          </td>
        </tr>
      );
    }
  };

  const handleClickViewMore = () => {
    setApplications([...applications, ...viewMoreApps]);
    setIsViewMore(true);
  };

  const debouncedFunction = useCallback(debounce(onSearchChange), []);
  useEffect(() => {
    getApplications();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="my-4 px-4">
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
                <TextMd text="MRN" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Created" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="DOB" color="text-purple-500" />
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
                <TextMd text="Medicaid ID" color="text-purple-500" />
              </th>
              <th scope="col" className="px-6 py-3">
                <TextMd text="Status" color="text-purple-500" />
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
              <>
                {pageContent()}
                {!isViewMore && applications.length > 10 && (
                  <tr>
                    <td colSpan={12}>
                      <ButtonPlain
                        text="View More"
                        width="w-full"
                        onClick={handleClickViewMore}
                      />
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsumerApplications;
