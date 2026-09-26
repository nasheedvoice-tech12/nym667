"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract token from URL hash (e.g. #token=xxxxx)
    const hash = window.location.hash;
    const tokenMatch = hash.match(/token=([^&]+)/);

    if (tokenMatch && tokenMatch[1]) {
      const customToken = tokenMatch[1];
      
      // Clear the hash for security
      window.history.replaceState(null, "", window.location.pathname);

      signInWithCustomToken(auth, customToken)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.error("Authentication failed:", err);
          setError("Failed to securely log you in. Please try accessing through Avanyx again.");
        });
    } else {
      setError("No valid authentication token found.");
    }
  }, [router]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-red-600 font-medium p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="text-xl font-semibold text-gray-500 animate-pulse">Authenticating securely...</div>
    </div>
  );
}
