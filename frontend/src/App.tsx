import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage.tsx";
import SingleTransaction from "./pages/ViewSingleTransaction.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*<Route path="/transactions/:id" element={<SingleTransaction />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;