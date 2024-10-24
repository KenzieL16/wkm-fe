"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Datatable from "@/components/table/data-table";
import { readManyExtendBayar } from "@/server/faktur/lists";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { readManyTglMerah } from "@/server/faktur/lists";
import { deleteTanggalMerah } from "@/server/tanggal-merah/delete-tanggal-merah";

export default function TableFrame({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const queryCLient = useQueryClient();
  const deleteMut = useMutation({
    mutationFn: deleteTanggalMerah,
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["tanggal-merah", searchParams],
    queryFn: async () =>
      await readManyTglMerah({
        ...searchParams,
        search: searchParams.search_query ? searchParams.search_query : "",
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  const columns = [
    {
      header: "Tanggal Awal",
      accessorKey: "tgl_awal",
      accessorFn: (row) => formatDate(new Date(row.tgl_awal)),
    },
    {
      header: "Tanggal Akhir",
      accessorKey: "tgl_akhir",
      accessorFn: (row) => formatDate(new Date(row.tgl_akhir)),
    },
    {
      header: "Deskripsi",
      accessorKey: "deskripsi",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 text-blue-600 cursor-pointer">
          <PencilIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm"
            aria-hidden="true"
            onClick={() => router.push("/input-tanggal-merah/detail/" + row.original.id)}
          />
          <TrashIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm text-red"
            aria-hidden="true"
            onClick={() => {
              Swal.fire({
                title: "Apakah data yang dimasukan sudah benar",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#0891B2",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  deleteMut.mutate(
                    { id: row.original.id },
                    {
                      onSuccess: (data) => {
                        queryCLient.invalidateQueries({ queryKey: ["tanggal-merah"] });
                        Swal.fire("Success!", "Pengajuan Extend Bayar berhasil dihapus", "info").then(() => {
                          router.refresh();
                        });
                      },
                      onError: (e) => {
                        console.log("ini error ", e);
                        Swal.fire("Failed!", e.response.data.message, "error");
                      },
                    }
                  );
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Datatable
      columns={columns}
      data={data?.data}
      totalRows={data?.page.total_rows}
      totalPages={1}
      currentPage={pageParams}
      setRowSelection={setSelected}
    />
  );
}
