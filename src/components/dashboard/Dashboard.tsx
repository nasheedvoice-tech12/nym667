"use client";

import { User } from "firebase/auth";

export default function Dashboard({ user }: { user: User }) {
  // In a real implementation, we would fetch these from the Firestore ledger
  const referralCode = user.uid.substring(0, 8).toUpperCase();
  const referralLink = `${process.env.NEXT_PUBLIC_AVANYX_URL}/register?ref=${referralCode}`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referral Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your Referral Code</p>
            <div className="flex items-center space-x-2 mt-2">
              <code className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-mono text-lg border border-blue-100">
                {referralCode}
              </code>
              <button 
                onClick={() => navigator.clipboard.writeText(referralLink)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Earnings" value="$0.00" icon="💰" />
          <StatCard title="Pending Payouts" value="$0.00" icon="⏳" />
          <StatCard title="Total Referrals" value="0" icon="👥" />
          <StatCard title="Active Paying" value="0" icon="⭐" />
        </div>

        {/* Referral Rules Notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Commission Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-blue-50">
              <span className="block text-sm text-gray-500">Business Plan</span>
              <span className="text-2xl font-bold text-blue-700">$2 <span className="text-base font-normal">/ renewal</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-50">
              <span className="block text-sm text-gray-500">Pro Plan</span>
              <span className="text-2xl font-bold text-blue-700">$5 <span className="text-base font-normal">/ renewal</span></span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-50">
              <span className="block text-sm text-gray-500">Enterprise Plan</span>
              <span className="text-2xl font-bold text-blue-700">$13 <span className="text-base font-normal">/ renewal</span></span>
            </div>
          </div>
        </div>

        {/* Referral History Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Referrals</h2>
          </div>
          <div className="p-8 text-center text-gray-500">
            No referrals yet. Share your link to start earning!
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
