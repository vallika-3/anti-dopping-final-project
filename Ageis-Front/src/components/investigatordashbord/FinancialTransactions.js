import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CSVLink } from 'react-csv';
import axios from "axios";

// Mock Data (replace with actual API data or data from your backend)
// const transactionsData = [
//   { id: 1, type: 'Payment', amount: 5000, date: '2024-10-15', recipient: 'Supplier A', category: 'Training', suspicious: false },
//   { id: 2, type: 'Transfer', amount: 10000, date: '2024-10-20', recipient: 'Overseas Supplier', category: 'Medical', suspicious: true },
//   { id: 3, type: 'Payment', amount: 2000, date: '2024-10-22', recipient: 'Trainer B', category: 'Sponsorship', suspicious: false },
//   { id: 4, type: 'Transfer', amount: 30000, date: '2024-11-01', recipient: 'Cryptocurrency Wallet', category: 'Misc', suspicious: true },
//   { id: 5, type: 'Payment', amount: 1500, date: '2024-11-05', recipient: 'Supplier C', category: 'Training', suspicious: false },
//   { id: 6, type: 'Refund', amount: 8000, date: '2024-11-08', recipient: 'Sponsor X', category: 'Refund', suspicious: false },
//   { id: 7, type: 'Payment', amount: 2500, date: '2024-11-10', recipient: 'Supplier D', category: 'Medical', suspicious: false }
// ];

// const cryptocurrencyTransactions = [
//   { id: 1, amount: 5000, date: '2024-10-10', walletAddress: '0xA2345...', suspicious: true },
//   { id: 2, amount: 2000, date: '2024-10-18', walletAddress: '0xB6789...', suspicious: false },
// ];

const FinancialTransactions = ({ athleteId }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filter, setFilter] = useState('');
  const [transactionsData, setTransactionsData] = useState([]);
  const [cryptocurrencyTransactions, setCryptocurrencyTransactions] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8080/athletes/get-athlete-details-by-id", { athleteId: athleteId });
      setTransactionsData(response?.data?.FinancialTransactions?.TransactionHistory);
      setCryptocurrencyTransactions(response?.data?.FinancialTransactions?.CryptocurrencyTransactions);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // Filter transactions based on category and search
  const filteredTransactions = transactionsData?.filter((transaction) =>
    (selectedCategory === 'All' || transaction.category === selectedCategory) &&
    (transaction.recipient.toLowerCase().includes(filter.toLowerCase()) || transaction.date.includes(filter))
  );

  // Data for the graph
  const graphData = transactionsData?.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

  return (
    <div style={containerStyle}>
      <h4
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.5rem',
          fontWeight: '600',
          color: '#333',
          textTransform: 'uppercase',
        }}
      >
        Financial Transactions
      </h4>

      <div style={filtersStyle}>
        <select style={selectStyle} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Training">Training</option>
          <option value="Medical">Medical</option>
          <option value="Sponsorship">Sponsorship</option>
          <option value="Misc">Misc</option>
          <option value="Refund">Refund</option>
        </select>

        <input
          style={inputStyle}
          type="text"
          placeholder="Search by recipient or date"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Export Data */}
      <div style={exportStyle}>
        <CSVLink data={filteredTransactions} filename={"transactions_report.csv"}>
          <button style={buttonStyle}>Export to CSV</button>
        </CSVLink>
      </div>

      {/* Card Container for Transaction History */}
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Transaction History</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Recipient</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Suspicious</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.map((transaction) => (
                <tr key={transaction.id} style={transaction.suspicious ? suspiciousRowStyle : {}}>
                  <td>{transaction.date}</td>
                  <td>{transaction.recipient}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.suspicious ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cryptocurrency Transactions Card */}
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Cryptocurrency Transactions</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Wallet Address</th>
                <th>Amount</th>
                <th>Suspicious</th>
              </tr>
            </thead>
            <tbody>
              {cryptocurrencyTransactions?.map((transaction) => (
                <tr key={transaction.id} style={transaction.suspicious ? suspiciousRowStyle : {}}>
                  <td>{transaction.date}</td>
                  <td>{transaction.walletAddress}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.suspicious ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Relationships Card */}
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Financial Relationships</h3>
          <ul style={listStyle}>
            <li>Connection between Athlete and Supplier A: Suspicious transfer of 10,000 to Supplier A, flagged for potential doping-related purchases.</li>
            <li>Trainer B receives consistent payments for sponsorship services.</li>
            <li>Cryptocurrency wallet usage flagged for suspicious transfers linked to known illicit markets.</li>
          </ul>
        </div>
      </div>

      {/* Pre/Post-Competition Financial Activity Card */}
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Pre-Competition and Post-Competition Financial Activity</h3>
          <p>Spikes in spending before key competitions (e.g., $10,000 spent before Competition XYZ, potentially indicating purchases of performance-enhancing substances).</p>
        </div>
      </div>

      {/* Financial Transactions Graph */}
      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h3>Financial Transactions Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

// Styles
const containerStyle = {
  fontFamily: "'Arial', sans-serif",
  padding: '20px',
};

const headerStyle = {
  textAlign: 'center',
  fontSize: '24px',
  marginBottom: '30px',
};

const filtersStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const selectStyle = {
  padding: '10px',
  fontSize: '16px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  width: '250px',
};

const exportStyle = {
  textAlign: 'right',
  marginBottom: '20px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
};

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '30px',
};

const cardStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  padding: '20px',
  width: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
};

const cardStyleHover = {
  transform: 'scale(1.05)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Adding a more intense shadow on hover
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const suspiciousRowStyle = {
  backgroundColor: '#f8d7da', // Highlight suspicious rows in red
};

const listStyle = {
  listStyleType: 'none',
  paddingLeft: '0',
};

export default FinancialTransactions;