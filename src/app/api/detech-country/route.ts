import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country");
  console.log("Country", country);
  return NextResponse.json({ isIndia: country === "IN" });
}
