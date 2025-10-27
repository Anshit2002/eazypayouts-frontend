import React, { useEffect, useState } from "react";

const TopSection = () => {
  const [companies, setCompanies] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  // ✅ Fetch companies from API on mount
  useEffect(() => {
    fetch("https://api.example.com/companies") // replace with your real endpoint
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  // ✅ Fetch accounts when company changes
  useEffect(() => {
    if (selectedCompany) {
      fetch(`https://api.example.com/accounts?company=${selectedCompany}`)
        .then((res) => res.json())
        .then((data) => setAccounts(data))
        .catch((err) => console.error("Error fetching accounts:", err));
    }
  }, [selectedCompany]);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 mb-4 flex gap-4 justify-end">
      {/* Company Dropdown */}
      <select
        value={selectedCompany}
        onChange={(e) => {
          setSelectedCompany(e.target.value);
          setSelectedAccount(""); // reset account when company changes
        }}
        className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      {/* Account Dropdown */}
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        disabled={!selectedCompany}
        className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
      >
        <option value="">Select Account</option>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.accountName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TopSection;
