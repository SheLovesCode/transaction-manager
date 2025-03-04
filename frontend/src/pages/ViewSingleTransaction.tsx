import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CircularProgress,
  Typography,
  Paper,
  Button,
  Box,
} from '@mui/material';
import { ExistingTransaction } from '../types/Transaction.ts';
import EditTransactionModal from '../components/EditTransactionModal.tsx';

function ViewSingleTransaction() {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<ExistingTransaction | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchTransaction = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ExistingTransaction>(
        `/api/transactions/${id}`,
      );
      setTransaction(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch transaction.');
      console.error('Error fetching transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleUpdateTransaction = () => {
    fetchTransaction();
    setEditModalOpen(false);
  };

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Transaction Details
        </Typography>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit Transaction
        </Button>
      </Box>
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
      <EditTransactionModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        transaction={transaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  );
}

export default ViewSingleTransaction;
