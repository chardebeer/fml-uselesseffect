import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hit = searchParams.get("hit") ?? "unknown";

  const delay = 80 + Math.random() * 900;

  await new Promise(resolve => setTimeout(resolve, delay));

  return NextResponse.json({
    hit,
    delay,
    message: "the server heard your little useEffect and is now tired"
  });
}
