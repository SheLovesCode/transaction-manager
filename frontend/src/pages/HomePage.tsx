import React from 'react';
import {Container, Typography, Box, Modal, TextField} from '@mui/material';
import TransactionList from '../components/TransactionList';
import DataTable from "../components/TransactionTable.tsx";
import Button from "@mui/material/Button";
import AddTransactionModal from "../components/AddTransactionModal.tsx";
// import AddTransactionModal from '../components/AddTransactionModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const HomePage: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Financial Records
      </Typography>
        <Button onClick={handleOpen}>Open modal</Button>
        <AddTransactionModal open={open} onClose={handleClose} handleSubmit={handleClose}/>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        {/*<Button variant="contained" onClick={handleOpenModal}>*/}
        {/*  Add New Transaction*/}
        {/*</Button>*/}
      </Box>
      <DataTable />
      {/*<AddTransactionModal open={isModalOpen} onClose={handleCloseModal} />*/}
    </Container>
  );
};

export default HomePage;