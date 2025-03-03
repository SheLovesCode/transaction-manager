import {  useEffect } from 'react';
import { Modal, Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useForm} from 'react-hook-form';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ExistingTransaction, NewTransaction} from "../types/Transaction.ts";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction?: ExistingTransaction;
  onSave: (transactionData: NewTransaction) => void;
}

const TransactionModal = ({ open, onClose, transaction, onSave }: TransactionModalProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm<NewTransaction>({
    defaultValues: {
      amount: transaction?.amount,
      date: transaction?.date,
      type: transaction?.type,
      description: transaction?.description,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (transaction) {
      setValue('amount', transaction.amount);
      setValue('date', transaction.date);
      setValue('type', transaction.type);
      setValue('description', transaction.description);
    } else {
      reset();
    }
  }, [transaction, reset, setValue]);

  const onSubmit = (data: NewTransaction) => {
    onSave(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg leading-6 font-medium text-gray-900">{transaction ? 'Edit' : 'Add'} Transaction</h3>
          <div className="mt-2">
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.amount}
              helperText={errors.amount?.message}
              {...register('amount', { required: true })}
            />
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              error={!!errors.date}
              helperText={errors.date?.message}
              slotProps={{
                input: {
                  ...register('date', { required: true }),
                },
                inputLabel: {
                  shrink: true
                }
              }}
/>
            <FormControl fullWidth margin="normal" error={!!errors.type}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                {...register('type', { required: true })}
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
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description', { required: true })}
            />
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={!isValid}
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
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default TransactionModal;