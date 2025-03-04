import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExistingTransaction } from '../types/Transaction.ts';
import { useState } from 'react';
import EditTransactionModal from './EditTransactionModal.tsx';

interface TransactionTableProps {
  transactions: ExistingTransaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const paginationModel = { page: 0, pageSize: 5 };
  const [_, setRows] = useState<ExistingTransaction[]>(transactions);
  const [openEditTransaction, setOpenEditTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ExistingTransaction | null>(null);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'type', headerName: 'Type', width: 90 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 90 },
    {
      field: 'date',
      headerName: 'Date',
      type: 'string',
      width: 160,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleView = (transaction: ExistingTransaction) => {
    console.log('Viewing', transaction.id);
    // Navigate or open modal as needed
  };

  const handleEdit = (transaction: ExistingTransaction) => {
    setSelectedTransaction(transaction);
    setOpenEditTransaction(true);
  };

  const handleDelete = async (id: number) => {
    try {
      console.log(`API call to delete transaction with ID: ${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }

    console.log(`Delete transaction with ID: ${id}`);
  };

  const handleCloseEditTransaction = () => {
    setOpenEditTransaction(false);
    setSelectedTransaction(null);
  };

  const handleUpdateTransaction = (updatedTransaction: ExistingTransaction) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedTransaction.id ? updatedTransaction : row,
      ),
    );
    handleCloseEditTransaction();
  };

  return (
    <Paper sx={{ height: 400, width: '100%', padding: '20px' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6">Transactions</Typography>
      </Box>
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
      {selectedTransaction && (
        <EditTransactionModal
          open={openEditTransaction}
          onClose={handleCloseEditTransaction}
          transaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}
    </Paper>
  );
}
