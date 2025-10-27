import React, { useEffect, useState } from "react";
import axios from "axios";
import balanceIcon from "../assets/balance.png"; 

const Rightbar = () => {
  const [companies, setCompanies] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);

  // Fetch all companies
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  // Fetch accounts for selected company
  useEffect(() => {
    if (selectedCompany) {
      axios
        .get(`http://localhost:8080/api/accounts/${selectedCompany}`)
        .then((res) => setAccounts(res.data))
        .catch((err) => console.error("Error fetching accounts:", err));
    } else {
      setAccounts([]);
      setSelectedAccount("");
    }
  }, [selectedCompany]);

  // Fetch account details + transactions
  useEffect(() => {
    if (selectedAccount) {
      axios
        .get(`http://localhost:8080/api/accounts/account/${selectedAccount}`)
        .then((res) => setAccountDetails(res.data))
        .catch((err) => console.error("Error fetching account:", err));

      axios
        .get(`http://localhost:8080/api/transactions/${selectedAccount}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.error("Error fetching transactions:", err));
    } else {
      setAccountDetails(null);
      setTransactions([]);
    }
  }, [selectedAccount]);

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 p-6 overflow-y-auto">
      {/* 🔹 Top Bar: Dropdowns on top-right */}
      <div className="flex justify-end gap-4 mb-6">
        {/* Company Dropdown */}
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.companyName || c.name}
            </option>
          ))}
        </select>

        {/* Account Dropdown */}
        <select
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          disabled={!selectedCompany}
        >
          <option value="">Select Account</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.accountName || a.accountNumber}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Balance Card (centered, like the EazyPayouts image) */}
      {accountDetails && (
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4 w-full sm:w-[400px] md:w-[450px] border border-gray-100 mb-8">
          <div className="bg-orange-50 p-3 rounded-full">
            <img src={balanceIcon} alt="Balance Icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="font-semibold text-blue-900 text-base md:text-lg">
              Available Balance
            </p>
            <p className="text-green-600 font-bold text-lg md:text-xl leading-tight">
              ₹ {accountDetails.availableBalance?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      )}

      {/* 🔹 Subtext */}
      <p className="text-gray-600 mb-3 text-sm md:text-base">
        Latest Loads are displayed here
      </p>

      {/* 🔹 Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Credit</th>
              <th className="px-6 py-3">A/c Balance</th>
              <th className="px-6 py-3">UTR/RRN</th>
              <th className="px-6 py-3">A/c No / UPI</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{txn.date}</td>
                  <td className="px-6 py-3 text-green-600 font-medium">
                    ₹ {txn.credit}
                  </td>
                  <td className="px-6 py-3">₹ {txn.accountBalance}</td>
                  <td className="px-6 py-3">{txn.utrRrn}</td>
                  <td className="px-6 py-3">{txn.accountOrUpi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-4 text-gray-500 text-center"
                  colSpan="5"
                >
                  {selectedAccount
                    ? "No transactions available for this account."
                    : "Select a company and account to view transactions."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rightbar;
