import {
  ChartPieIcon,
  Cog6ToothIcon,
  UsersIcon,
  FolderIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

const form = [
  {
    title: "Nama Produk",
    name: "product_nama",
    id: "product_nama",
    disabled: true,
    type: "text",
  },
  {
    title: "Motor Price Kode",
    name: "motorprice_kode",
    id: "motorprice_kode",
    disabled: true,
    type: "text",
  },
  {
    title: "On The Road",
    name: "otr",
    id: "otr",
    disabled: false,
    type: "number",
  },
  {
    title: "Produk Kode",
    name: "product_kode",
    id: "product_kode",
    disabled: false,
    type: "text",
  },
  {
    title: "Wrn Kode",
    name: "wrn_kode",
    id: "wrn_kode",
    disabled: false,
    type: "text",
  },
  {
    title: "Tahun",
    name: "tahun",
    id: "tahun",
    disabled: true,
    type: "number",
  },
];

export { form };
