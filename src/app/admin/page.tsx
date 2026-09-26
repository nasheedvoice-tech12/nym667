"use client";

import { useAuth } from "@/context/AuthContext";

export default function SuperAdminReferralManagement() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8 text-gray-500 text-center">Loading Admin...</div>;
  }

  // Basic guard (Replace with actual admin claim verification)
  if (!user || !user.email?.includes("@avanyx")) {
    return <div className="p-8 text-red-500 font-bold text-center">Unauthorized Admin Access</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="bg-gray-900 p-6 rounded-2xl shadow-sm text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Referral Super Admin</h1>
            <p className="text-gray-400 mt-1">Manage global referral rules, payouts, and relationships.</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            System Status: <span className="text-green-400 font-bold">Online</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Global Commission Pending</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">$0.00</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Total Referrers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 font-medium">Total Paid Out</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">$0.00</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">All Referral Relationships</h2>
            <input type="text" placeholder="Search referrer or customer..." className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div className="p-8 text-center text-gray-500">
            No referral records exist in the new ledger yet.
          </div>
        </div>
        
      </div>
    </div>
  );
}
