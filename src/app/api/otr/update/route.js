import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
import { revalidatePath, revalidateTag } from "next/cache";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/otr/update-otr");
  revalidatePath("/(dashboard)/otr", "page");
  return NextResponse.json({ revalidated: true, message: response.message });
};
