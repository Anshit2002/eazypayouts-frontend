import React from "react";

const BottomSection = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-auto">
      <h2 className="text-gray-800 font-semibold mb-3">Latest Loads</h2>

      <table className="w-full border-collapse text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Credit</th>
            <th className="text-left p-2">A/c Balance</th>
            <th className="text-left p-2">UTR/RRN</th>
            <th className="text-left p-2">A/c No / UPI</th>
          </tr>
        </thead>
        <tbody>
          {/* You’ll replace this with dynamic API data later */}
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">07/05/2024 01:04 PM</td>
            <td className="p-2 text-green-600 font-semibold">₹21,337</td>
            <td className="p-2">₹21,337</td>
            <td className="p-2">1000000</td>
            <td className="p-2">AC0CF7RRUY407QHU</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BottomSection;
