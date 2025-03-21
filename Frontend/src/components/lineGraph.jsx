import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: 'march 2020', previousPrice: 4000, currentPrice: 2400, amt: 2400 },
//   { name: 'april 2020', previousPrice: 3000, currentPrice: 1398, amt: 2210 },
//   { name: 'may 2020', previousPrice: 2000, currentPrice: 9800, amt: 2290 },
//   { name: 'june 2020', previousPrice: 2780, currentPrice: 3908, amt: 2000 },
//   { name: 'july 2021', previousPrice: 1890, currentPrice: 4800, amt: 2181 },
//   { name: 'august 2022', previousPrice: 2390, currentPrice: 3800, amt: 2500 },
//   { name: 'jan 2025', previousPrice: 3490, currentPrice: 4300, amt: 2100 },
// ];

const LineGraph = ({data}) => {
  return (
    <ResponsiveContainer width="70%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="companyName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="previousPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="currentPrice" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
