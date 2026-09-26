"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">Loading Referral Profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-gray-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You must access your referral dashboard securely through the Avanyx application. Please log in to your Avanyx account and navigate to Plan Settings &gt; Referral Program.
        </p>
        <a 
          href={process.env.NEXT_PUBLIC_AVANYX_URL || "https://huraira4545.vercel.app"} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Return to Avanyx
        </a>
      </div>
    );
  }

  return <Dashboard user={user} />;
}
