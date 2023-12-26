import {
  IconPlain,
  InputPlain,
  SpinnerSmall,
  TextMd,
  WarningMessage,
} from "@/components/commons";
import { AuthContext } from "@/context/auth/AuthState";
import { useGeneratePDF } from "@/hooks/generatePDF";
import { debounce, prettifyPDFName } from "@/utils";
import React, { useCallback, useContext, useState } from "react";

const SearchPDFs = () => {
  // Custom Hooks
  const { list } = useGeneratePDF();

  // Contexts
  const { user } = useContext(AuthContext);
  // States
  const [pdfs, setPDFs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  /**
   * @function onSearchChange
   *
   * Triggers after 700ms When Someone Types In Search Input
   *
   * Filter the state
   */
  const onSearchChange = async (e) => {
    setQuery("");
    setIsLoading(true);
    const query = e.target.value;

    if (!query) {
      setPDFs([]);
      return setIsLoading(false);
    }

    const res = await list(user.token, query);
    if (res.status == 200) {
      setPDFs(res.data);
      setIsLoading(false);
      setQuery(query);
      return;
    }
    WarningMessage(res.response.data);
    setPDFs([]);
    setIsLoading(false);
  };

  const pageContent = () => {
    if (pdfs.length > 0) {
      return pdfs.map((pdf, i) => {
        return (
          <tr className="bg-white border-b" key={i}>
            <th className="px-6 py-4">{i + 1}</th>
            <th className="px-6 py-4">{prettifyPDFName(pdf.file)}</th>

            <td className="px-6 py-4">{pdf?.consumerName}</td>
            <td className="px-6 py-4">{query}</td>

            <td className="px-6 py-4 flex items-center gap-2">
              <a
                href={`${process.env.NEXT_PUBLIC_PDFS_BASE_URL}/${query}/${pdf.file}`}
                download={`${query}-${pdf.file}`}
              >
                <IconPlain
                  iconClass="fa-download rounded-md"
                  bgColor="bg-blue-500"
                />
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_PDFS_BASE_URL}/${query}/${pdf.file}`}
                target="_blank"
              >
                <IconPlain
                  iconClass="fa-eye rounded-md"
                  bgColor="bg-yellow-400"
                />
              </a>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr className="bg-white border-b">
          <td className="px-6 py-4 text-center font-bold" colSpan={12}>
            Search By Consumer Phone To Find PDFs
          </td>
        </tr>
      );
    }
  };

  const debouncedFunction = useCallback(debounce(onSearchChange), []);

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

export default SearchPDFs;
