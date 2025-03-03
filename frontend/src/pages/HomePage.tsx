import { Container, Typography, Box, Button } from '@mui/material';
import AddTransactionModal from '../components/AddTransactionModal.tsx';
import TransactionTable from '../components/TransactionTable.tsx';
import { useState, useEffect } from 'react';
import { ExistingTransaction } from "../types/Transaction.ts";
// import axios from 'axios'; // Commented out axios

export function HomePage() {
  const [open, setOpenAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState<ExistingTransaction[]>([]);

  const rows: ExistingTransaction[] = [
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

  useEffect(() => {
    // const fetchTransactions = async () => {
    //   try {
    //     const response = await axios.get<ExistingTransaction[]>('/api/transactions');
    //     setTransactions(response.data);
    //   } catch (error) {
    //     console.error('Error fetching transactions:', error);
    //   }
    // };
    // fetchTransactions();

    setTransactions(rows);

  }, []);

  const handleOpenAddTransaction = () => setOpenAddTransaction(true);
  const handleCloseAddTransaction = () => setOpenAddTransaction(false);

  const handleAddTransaction = (newTransaction: ExistingTransaction) => {
    setTransactions([...transactions, newTransaction]);
    handleCloseAddTransaction();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Financial Records
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button onClick={handleOpenAddTransaction}>Add Transaction</Button>
      </Box>
      <AddTransactionModal open={open} onClose={handleCloseAddTransaction} onAdd={handleAddTransaction} />
      <TransactionTable transactions={transactions} />
    </Container>
  );
}

export default HomePage;