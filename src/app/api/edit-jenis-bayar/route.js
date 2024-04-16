import { NextResponse } from "next/server";
import { PostFileApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.formData();
  console.log("ini body ", body);
  let response = await PostFileApi(body, "/edit-jenis-bayar");
  console.log("ini response ", response);
  return new NextResponse({ message: "Edit sukses" });
};
