import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { CarEditPage } from "../Pages/Cars/CarEditPage";
import { CarListPage } from "../Pages/Cars/CarListPage";
import { ExpenseEditPage } from "../Pages/Expense/ExpenseEditPage";
import { ExpenseListPage } from "../Pages/Expense/ExpenseListPage";
import { InvestmentHistory } from "../Pages/Investments/InvestmentHistory";
import { InvestmentOperation } from "../Pages/Investments/InvestmentOperation";
import { ManageInvestments } from "../Pages/Investments/ManageInvestments";
import Login from "../Pages/Login/Login";
import { Menu } from "../Pages/Menu/Menu";
import { InvestorRoute } from "../Services/Auth/InvestorRoute";
import { ProtectedRoute } from "../Services/Auth/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Menu />} />
            <Route path="/cars" element={<CarListPage />} />
            <Route path="/cars/:id/edit" element={<CarEditPage />} />
            <Route path="/expenses/list" element={<ExpenseListPage />} />
            <Route path="/expenses/:movementId/edit" element={<ExpenseEditPage />} />
            <Route element={<InvestorRoute />}>
              <Route path="/investments/:userId" element={<ManageInvestments />} />
              <Route
                path="/investments/:userId/:investmentId/operation"
                element={<InvestmentOperation />}
              />
              <Route
                path="/investments/:userId/:investmentId/history"
                element={<InvestmentHistory />}
              />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
