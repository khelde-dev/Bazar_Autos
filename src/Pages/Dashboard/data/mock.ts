/**
 * Mocked dashboard data. Replace with real Tanstack Query hooks once backend endpoints land.
 */

export interface KpiSummary {
  totalSales: number;
  profitThisYear: number;
  totalMovements: number;
  activeExpenses: number;
  passiveExpenses: number;
  totalInvestors: number;
  totalInvestorMoney: number;
  brandsCount: number;
}

export interface YearMetric {
  year: number;
  cars: number;
  profit: number;
  investment: number;
}

export interface TopCar {
  rank: number;
  brand: string;
  model: string;
  year: number;
  unitsSold: number;
  profit: number;
}

export const MOCK_KPIS: KpiSummary = {
  totalSales: 4_820_000,
  profitThisYear: 1_245_000,
  totalMovements: 312,
  activeExpenses: 870_500,
  passiveExpenses: 245_300,
  totalInvestors: 6,
  totalInvestorMoney: 3_150_000,
  brandsCount: 14,
};

export const MOCK_YEARLY: YearMetric[] = [
  { year: 2021, cars: 12, profit: 320_000, investment: 1_100_000 },
  { year: 2022, cars: 19, profit: 540_000, investment: 1_650_000 },
  { year: 2023, cars: 24, profit: 820_000, investment: 2_200_000 },
  { year: 2024, cars: 31, profit: 1_050_000, investment: 2_700_000 },
  { year: 2025, cars: 38, profit: 1_180_000, investment: 2_900_000 },
  { year: 2026, cars: 22, profit: 1_245_000, investment: 3_150_000 },
];

export const MOCK_TOP_CARS: TopCar[] = [
  { rank: 1, brand: "Toyota", model: "Corolla", year: 2020, unitsSold: 14, profit: 280_000 },
  { rank: 2, brand: "Nissan", model: "Sentra", year: 2019, unitsSold: 11, profit: 210_000 },
  { rank: 3, brand: "Honda", model: "Civic", year: 2021, unitsSold: 9, profit: 195_000 },
];
