"use client";

import { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import StatCard from "@/components/StatCard";
import { CreditCard, Star, Zap } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const cards = [
  {
    name: "Amex Platinum",
    last4: "4821",
    balance: 2400,
    limit: 25000,
    points: 124500,
    color: "#C0A060",
  },
  {
    name: "Chase Sapphire Reserve",
    last4: "7743",
    balance: 1850,
    limit: 20000,
    points: 59700,
    color: "#404040",
  },
  {
    name: "Chase Freedom Unlimited",
    last4: "2291",
    balance: 440,
    limit: 10000,
    points: 0,
    color: "#2a4a8a",
  },
];

const redemptions = [
  {
    title: "Japan Flight — ANA Business Class",
    points: 75000,
    cashValue: "$3,200",
    program: "Amex → ANA",
    rating: 5,
  },
  {
    title: "Paris via Iceland Air",
    points: 60000,
    cashValue: "$2,100",
    program: "Chase → United",
    rating: 4,
  },
  {
    title: "Hotel — Park Hyatt Tokyo",
    points: 25000,
    cashValue: "$650",
    program: "Chase → Hyatt",
    rating: 5,
  },
];

export default function CreditPage() {
  const [fromPoints, setFromPoints] = useState(50000);
  const [fromProgram, setFromProgram] = useState("Amex MR");
  const [toProgram, setToProgram] = useState("ANA Miles");

  const conversionRate = 1.0;
  const converted = Math.floor(fromPoints * conversionRate);

  const totalDebt = cards.reduce((a, c) => a + c.balance, 0);
  const totalLimit = cards.reduce((a, c) => a + c.limit, 0);
  const utilization = Math.round((totalDebt / totalLimit) * 100);
  const totalPoints = cards.reduce((a, c) => a + c.points, 0);

  const radialData = [{ name: "Used", value: utilization, fill: "#722F37" }];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Credit</h1>
        <p className="text-muted-foreground text-sm mt-1">Cards, points, and utilization.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Points" value={totalPoints.toLocaleString()} change="+12,000 this month" changePositive icon={<Star size={16} />} />
        <StatCard label="Total Debt" value={`$${totalDebt.toLocaleString()}`} change="Down $340 vs last month" changePositive icon={<CreditCard size={16} />} />
        <StatCard label="Utilization" value={`${utilization}%`} change="Down from 31%" changePositive icon={<Zap size={16} />} />
        <StatCard label="Credit Cards" value={`${cards.length} active`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground tracking-widest uppercase">Cards</h2>
          {cards.map((card) => {
            const util = Math.round((card.balance / card.limit) * 100);
            return (
              <div
                key={card.last4}
                className="border border-border rounded-lg p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-sm">{card.name}</div>
                    <div className="text-xs text-muted-foreground">••• {card.last4}</div>
                  </div>
                  {card.points > 0 && (
                    <div className="text-xs text-[#722F37] font-medium">
                      {card.points.toLocaleString()} pts
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Balance: ${card.balance.toLocaleString()}</span>
                  <span>Limit: ${card.limit.toLocaleString()}</span>
                  <span>{util}% used</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${util}%`,
                      background: util > 30 ? "#722F37" : "#22c55e",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Utilization gauge */}
        <div>
          <DashboardCard title="Overall Utilization">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart
                  cx="50%"
                  cy="80%"
                  innerRadius="60%"
                  outerRadius="100%"
                  startAngle={180}
                  endAngle={0}
                  data={radialData}
                >
                  <RadialBar dataKey="value" cornerRadius={4} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-3xl font-bold -mt-4">{utilization}%</div>
              <div className="text-xs text-muted-foreground mt-1">of ${totalLimit.toLocaleString()} total limit</div>
              <div className={`text-xs mt-3 px-3 py-1 rounded-full ${utilization < 30 ? "bg-green-500/10 text-green-400" : "bg-[#722F37]/10 text-[#722F37]"}`}>
                {utilization < 30 ? "Excellent" : utilization < 50 ? "Good" : "High"}
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      {/* Point converter */}
      <DashboardCard title="Point Converter">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">From (points)</label>
            <input
              type="number"
              value={fromPoints}
              onChange={(e) => setFromPoints(Number(e.target.value))}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Program</label>
            <select
              value={fromProgram}
              onChange={(e) => setFromProgram(e.target.value)}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option>Amex MR</option>
              <option>Chase UR</option>
              <option>Citi ThankYou</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1.5">Transfer To</label>
            <select
              value={toProgram}
              onChange={(e) => setToProgram(e.target.value)}
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option>ANA Miles</option>
              <option>United MileagePlus</option>
              <option>Hyatt Points</option>
            </select>
          </div>
        </div>
        <div className="mt-4 p-4 bg-muted rounded-lg text-center">
          <div className="text-xs text-muted-foreground mb-1">{fromPoints.toLocaleString()} {fromProgram} =</div>
          <div className="text-2xl font-bold text-[#722F37]">{converted.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">{toProgram}</div>
        </div>
      </DashboardCard>

      {/* Redemption ideas */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">Best Redemptions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {redemptions.map((r) => (
            <div key={r.title} className="border border-border rounded-lg p-5">
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < r.rating ? "text-[#722F37] fill-[#722F37]" : "text-muted-foreground"} />
                ))}
              </div>
              <div className="font-medium text-sm mb-1">{r.title}</div>
              <div className="text-xs text-muted-foreground mb-3">{r.program}</div>
              <div className="flex justify-between text-xs">
                <span>{r.points.toLocaleString()} pts</span>
                <span className="text-green-500 font-medium">{r.cashValue} value</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}