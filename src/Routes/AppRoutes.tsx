import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login/Login";
import { Menu } from "../Pages/Menu/Menu";
import { Layout } from "../Components/Layout";
import { ProtectedRoute } from "../Services/Auth/ProtectedRoute";
import { ManageInvestments } from "../Pages/Investments/ManageInvestments";
import { InvestmentOperation } from "../Pages/Investments/InvestmentOperation";
import { InvestmentHistory } from "../Pages/Investments/InvestmentHistory";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Menu />} />
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
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
