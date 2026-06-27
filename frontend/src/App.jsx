

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import DeleteExpense from "./pages/DeleteExpense";

import IncomePage from "./pages/IncomePage";
import AddIncome from "./pages/AddIncome";


import CategoryPage from "./pages/CategoryPage";

import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Expense */}

        <Route path="/add-expense" element={<AddExpense />} />

        <Route path="/edit-expense/:id" element={<EditExpense />} />

        <Route path="/delete-expense/:id" element={<DeleteExpense />} />

        {/* Income */}

        <Route path="/income" element={<IncomePage />} />

        <Route path="/add-income" element={<AddIncome />} />

       

        {/* Categories */}

        <Route path="/categories" element={<CategoryPage />} />

        {/* Profile */}

        <Route path="/profile" element={<ProfilePage />} />
        

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;