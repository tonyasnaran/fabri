import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    income: 12500,
    expenses: 7800,
    netCashFlow: 4700,
    healthScore: 74,
    categories: [
      { name: "Housing", amount: 2400 },
      { name: "Food", amount: 850 },
      { name: "Transport", amount: 420 },
      { name: "Entertainment", amount: 600 },
      { name: "Business", amount: 1800 },
      { name: "Other", amount: 1730 },
    ],
    monthly: [
      { month: "Jan", income: 11000, expenses: 7200 },
      { month: "Feb", income: 11500, expenses: 7400 },
      { month: "Mar", income: 12000, expenses: 8100 },
      { month: "Apr", income: 12800, expenses: 7600 },
      { month: "May", income: 12500, expenses: 7800 },
    ],
  });
}