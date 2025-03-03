import { useState } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Define the interface for transaction data
interface TransactionData {
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  description: string;
}

// Define the types for your props
interface AddTransactionModalProps {
  open: boolean; // open prop should be a boolean
  onClose: () => void; // onClose should be a function with no parameters and no return value
  handleSubmit: (transactionData: TransactionData) => void; // handleSubmit should accept the transactionData
}

const AddTransactionModal = ({ open, onClose, handleSubmit }: AddTransactionModalProps) => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('credit');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const transactionData: TransactionData = {
      amount,
      date,
      type,
      description,
    };
    console.log("Form: ", transactionData)
    handleSubmit(transactionData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <form>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add Transaction</h3>
          <div className="mt-2">
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value as 'credit' | 'debit')}
                label="Type"
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;
