import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { adminAuth } from "@/lib/firebase/admin";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  
  if (!token) {
    return NextResponse.json({ error: "Missing handoff token" }, { status: 400 });
  }

  try {
    const secret = process.env.REFERRAL_HANDOFF_SECRET;
    if (!secret) {
      throw new Error("Server configuration error");
    }

    // Verify the JWT from the Avanyx Main App
    const decoded = jwt.verify(token, secret) as { uid: string; email: string };
    
    // Create a Custom Firebase Token for the isolated Referral Firebase project
    const customToken = await adminAuth.createCustomToken(decoded.uid);

    // Redirect the user back to the frontend with the custom token in a hash fragment
    // so the frontend can intercept it and sign them in.
    const baseUrl = request.nextUrl.origin;
    return NextResponse.redirect(`${baseUrl}/auth/callback#token=${customToken}`);

  } catch (error) {
    console.error("Handoff verification failed:", error);
    return NextResponse.json({ error: "Invalid or expired handoff token" }, { status: 401 });
  }
}
