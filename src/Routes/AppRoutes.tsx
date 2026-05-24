import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Dashboard } from "@/Pages/Dashboard/Dashboard";
import { CarEditPage } from "@/Pages/Cars/CarEditPage";
import { CarListPage } from "@/Pages/Cars/CarListPage";
import { ExpenseEditPage } from "@/Pages/Expense/ExpenseEditPage";
import { ExpenseListPage } from "@/Pages/Expense/ExpenseListPage";
import { ExpenseVehicle } from "@/Pages/Expense/ExpenseVehicle";
import { ShoppVehicle } from "@/Pages/Shopping/ShoppVehicle";
import { AddInvestment } from "@/Pages/Investments/AddInvestment";
import { InvestmentHistory } from "@/Pages/Investments/InvestmentHistory";
import { InvestmentOperation } from "@/Pages/Investments/InvestmentOperation";
import { ManageInvestments } from "@/Pages/Investments/ManageInvestments";
import { UsersPage } from "@/Pages/Users/UsersPage";
import { CategoriesPage } from "@/Pages/MovementCategories/CategoriesPage";
import Login from "@/Pages/Login/Login";
import { InvestorRoute } from "@/Services/Auth/InvestorRoute";
import { ProtectedRoute } from "@/Services/Auth/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public — standalone layout */}
        <Route path="/login" element={<Login />} />

        {/* Protected — inside AppShell */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shopping" element={<ShoppVehicle />} />
            <Route path="/cars" element={<CarListPage />} />
            <Route path="/cars/:id/edit" element={<CarEditPage />} />
            <Route path="/expenses" element={<ExpenseVehicle />} />
            <Route path="/expenses/list" element={<ExpenseListPage />} />
            <Route path="/expenses/:movementId/edit" element={<ExpenseEditPage />} />
            <Route element={<InvestorRoute />}>
              <Route path="/investments" element={<AddInvestment />} />
              <Route path="/investments/:userId" element={<ManageInvestments />} />
              <Route
                path="/investments/:userId/:investmentId/operation"
                element={<InvestmentOperation />}
              />
              <Route
                path="/investments/:userId/:investmentId/history"
                element={<InvestmentHistory />}
              />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/movements-category" element={<CategoriesPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
