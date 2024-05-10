"use server"

import Pagination from "@/components/Pagination/index";
import { readManyAsuransiPending } from "@/server/asuransi/lists";
import dynamic from "next/dynamic";
import Site from "./item"

export default async function ListSites({searchParams}) {

  const pageParams = searchParams?.page || 1;
  const limit = searchParams?.limit || 10;
  const search = searchParams?.search_query;
  const active = searchParams?.active;
  const period = searchParams?.period;
  const offset = limit * (pageParams - 1);
  const sortBy = searchParams?.sortBy;

  const {data, page} = await readManyAsuransiPending({
    pageParams:pageParams,
    limit:limit,
    search:search,
    offset:offset,
    sortBy:sortBy,
    active:active,
    period:period
  })


  const tableContent = data.map((item, i) => {

      return (
        <Site
          key={i}
          id={i}
          site={{ ...item }}
        />
      );
    });

    return (
      <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nomor Mesin
                </th>
                <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">
                        Nama Customer
                </th>
              </tr>
          </thead>
          <tbody className="bg-white">
              {tableContent.length > 0 ? (
              tableContent
              ) : (
              <tr>
                  <td
                  colSpan={7}
                  className="px-3 py-4 text-sm text-center text-gray-500 whitespace-nowrap"
                  >
                  Data not found
                  </td>
              </tr>
              )}
              <tr>
              <td colSpan={7}>
                  <Pagination
                  rows={data.length}
                  postsPerPage={10}
                  currentPage={pageParams}
                  totalRows={page.total_rows}
                  totalPages={page.total_pages}
                  />
              </td>
              </tr>
          </tbody>
      </table>
    );
}