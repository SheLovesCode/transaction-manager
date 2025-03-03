import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  description: string;
}

// interface TransactionListProps {
//   transactions: Transaction[];
// }

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    amount: 75.50,
    date: '2023-10-26',
    type: 'debit',
    description: 'Weekly grocery run',
  },
  {
    id: 2,
    amount: 3000.00,
    date: '2023-10-25',
    type: 'credit',
    description: 'Monthly salary',
  },
  {
    id: 3,
    amount: 120.00,
    date: '2023-10-24',
    type: 'debit',
    description: 'New shoes',
  },
  {
    id: 4,
    amount: 50.00,
    date: '2023-10-23',
    type: 'credit',
    description: 'Returned item',
  },
  {
    id: 5,
    amount: 45.75,
    date: '2023-10-22',
    type: 'debit',
    description: 'Dinner with friends',
  },
  {
    id: 6,
    amount: 15.20,
    date: '2023-10-21',
    type: 'credit',
    description: 'Savings account interest',
  },
  {
    id: 7,
    amount: 150.00,
    date: '2023-10-20',
    type: 'debit',
    description: 'Electricity and water bill',
  },
  {
    id: 8,
    amount: 500.00,
    date: '2023-10-19',
    type: 'credit',
    description: 'Project completion payment',
  },
  {
    id: 9,
    amount: 7.80,
    date: '2023-10-18',
    type: 'debit',
    description: 'Morning coffee',
  },
  {
    id: 10,
    amount: 200.00,
    date: '2023-10-17',
    type: 'credit',
    description: 'Performance bonus',
  },
  {
    id: 11,
    amount: 60.00,
    date: '2023-10-16',
    type: 'debit',
    description: 'Fuel refill',
  },
  {
    id: 12,
    amount: 80.00,
    date: '2023-10-15',
    type: 'debit',
    description: 'Web development course',
  },
  {
    id: 13,
    amount: 30.00,
    date: '2023-10-14',
    type: 'credit',
    description: 'Birthday gift',
  },
  {
    id: 14,
    amount: 55.00,
    date: '2023-10-13',
    type: 'debit',
    description: 'Monthly phone service',
  },
  {
    id: 15,
    amount: 110.00,
    date: '2023-10-12',
    type: 'credit',
    description: 'Dividend payment',
  },
];

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Transaction[]>('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Error fetching transactions');
      }
    };
    fetchData();
  }, []);

  // const balance = transactions.reduce((total, transaction) => {
  //   if (transaction.type === 'credit') {
  //     return total + transaction.amount;
  //   } else {
  //     return total - transaction.amount;
  //   }
  // }, 0);

  return (
    <Box>
      {/*<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>*/}
      {/*  <Typography variant="h6">Balance: {balance.toFixed(2)}</Typography>*/}
      {/*</Box>*/}
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TransactionList;