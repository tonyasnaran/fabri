"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import DashboardCard from "@/components/DashboardCard";
import StatCard from "@/components/StatCard";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

const monthlyData = [
  { month: "Jan", income: 11000, expenses: 7200 },
  { month: "Feb", income: 11500, expenses: 7400 },
  { month: "Mar", income: 12000, expenses: 8100 },
  { month: "Apr", income: 12800, expenses: 7600 },
  { month: "May", income: 12500, expenses: 7800 },
];

const categories = [
  { name: "Housing", amount: 2400 },
  { name: "Food", amount: 850 },
  { name: "Transport", amount: 420 },
  { name: "Entertainment", amount: 600 },
  { name: "Business", amount: 1800 },
  { name: "Other", amount: 1730 },
];

const COLORS = ["#722F37", "#8B3A44", "#a04550", "#b5525e", "#c96070", "#dc7080"];

export default function FinancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Finance</h1>
        <p className="text-muted-foreground text-sm mt-1">Income, expenses, and financial health.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Income" value="$12,500" change="13.6% vs last month" changePositive icon={<DollarSign size={16} />} />
        <StatCard label="Monthly Expenses" value="$7,800" change="2.6% vs last month" changePositive={false} icon={<TrendingDown size={16} />} />
        <StatCard label="Net Cash Flow" value="$4,700" change="$800 improvement" changePositive icon={<TrendingUp size={16} />} />
        <StatCard label="Health Score" value="74 / 100" change="Up 3 points" changePositive icon={<Activity size={16} />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <DashboardCard title="Income vs Expenses">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#722F37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#722F37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#722F37"
                fill="url(#incomeGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--muted-foreground))"
                fill="transparent"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Expense Categories">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categories.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="font-medium">${cat.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Monthly Trend">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="#722F37" radius={[3, 3, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--muted))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}