import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Typography, Paper } from '@mui/material';
import {ExistingTransaction} from "../types/Transaction.ts";

export function ViewSingleTransaction() {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<ExistingTransaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ExistingTransaction>(`/api/transactions/${id}`);
        setTransaction(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch transaction.');
        console.error('Error fetching transaction:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Transaction not found</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Transaction Details
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>

        <Typography variant="subtitle1">Amount:</Typography>
        <Typography>R {transaction.amount}</Typography>

        <Typography variant="subtitle1">Date:</Typography>
        <Typography>{transaction.date}</Typography>

        <Typography variant="subtitle1">Type:</Typography>
        <Typography>{transaction.type}</Typography>

        <Typography variant="subtitle1">Description:</Typography>
        <Typography>{transaction.description}</Typography>
      </Paper>
    </div>
  );
}

export default ViewSingleTransaction;