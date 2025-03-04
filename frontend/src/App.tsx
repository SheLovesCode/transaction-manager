import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import ViewSingleTransaction from './pages/ViewSingleTransaction.tsx';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#333333',
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transactions/:id" element={<ViewSingleTransaction />} />
      </Routes>
    </Box>
  );
}

export default App;