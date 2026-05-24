import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { InvestorRoute } from "@/Services/Auth/InvestorRoute";
import { ProtectedRoute } from "@/Services/Auth/ProtectedRoute";

const Login = lazy(() => import("@/Pages/Login/Login"));
const Dashboard = lazy(() =>
  import("@/Pages/Dashboard/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const CarListPage = lazy(() =>
  import("@/Pages/Cars/CarListPage").then((m) => ({ default: m.CarListPage }))
);
const CarEditPage = lazy(() =>
  import("@/Pages/Cars/CarEditPage").then((m) => ({ default: m.CarEditPage }))
);
const ShoppVehicle = lazy(() =>
  import("@/Pages/Shopping/ShoppVehicle").then((m) => ({ default: m.ShoppVehicle }))
);
const ExpenseVehicle = lazy(() =>
  import("@/Pages/Expense/ExpenseVehicle").then((m) => ({ default: m.ExpenseVehicle }))
);
const ExpenseListPage = lazy(() =>
  import("@/Pages/Expense/ExpenseListPage").then((m) => ({ default: m.ExpenseListPage }))
);
const ExpenseEditPage = lazy(() =>
  import("@/Pages/Expense/ExpenseEditPage").then((m) => ({ default: m.ExpenseEditPage }))
);
const AddInvestment = lazy(() =>
  import("@/Pages/Investments/AddInvestment").then((m) => ({ default: m.AddInvestment }))
);
const ManageInvestments = lazy(() =>
  import("@/Pages/Investments/ManageInvestments").then((m) => ({ default: m.ManageInvestments }))
);
const InvestmentOperation = lazy(() =>
  import("@/Pages/Investments/InvestmentOperation").then((m) => ({
    default: m.InvestmentOperation,
  }))
);
const InvestmentHistory = lazy(() =>
  import("@/Pages/Investments/InvestmentHistory").then((m) => ({ default: m.InvestmentHistory }))
);
const UsersPage = lazy(() =>
  import("@/Pages/Users/UsersPage").then((m) => ({ default: m.UsersPage }))
);
const CategoriesPage = lazy(() =>
  import("@/Pages/MovementCategories/CategoriesPage").then((m) => ({ default: m.CategoriesPage }))
);

const PageLoader = () => (
  <div className="flex h-full min-h-[60vh] items-center justify-center">
    <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
  </div>
);

export const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
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
    </Suspense>
  </BrowserRouter>
);
