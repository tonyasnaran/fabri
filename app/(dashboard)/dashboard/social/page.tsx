"use client";

import DashboardCard from "@/components/DashboardCard";
import StatCard from "@/components/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, TrendingUp, Lightbulb } from "lucide-react";

const platforms = [
  {
    name: "Instagram",
    handle: "@anthonyfabri",
    followers: 4820,
    growth: "+3.2%",
    engagement: "5.8%",
    color: "#E1306C",
  },
  {
    name: "TikTok",
    handle: "@fabriaf",
    followers: 11200,
    growth: "+8.7%",
    engagement: "9.4%",
    color: "#010101",
  },
  {
    name: "YouTube",
    handle: "FABRI",
    followers: 2100,
    growth: "+1.4%",
    engagement: "6.2%",
    color: "#FF0000",
  },
];

const growthData = [
  { week: "W1", instagram: 4600, tiktok: 10200, youtube: 2020 },
  { week: "W2", instagram: 4680, tiktok: 10500, youtube: 2050 },
  { week: "W3", instagram: 4730, tiktok: 10900, youtube: 2080 },
  { week: "W4", instagram: 4820, tiktok: 11200, youtube: 2100 },
];

const recommendations = [
  "Post a behind-the-scenes of the next DEROS event",
  "Day-in-the-life format is performing 2× avg engagement",
  "TikTok trends: founder morning routines, city walks",
  "YouTube Shorts repurpose: cut top 3 TikToks this week",
];

const trends = [
  { topic: "Founder lifestyle", score: 92 },
  { topic: "LA nightlife", score: 87 },
  { topic: "Entrepreneurship tips", score: 81 },
  { topic: "Food & dining", score: 74 },
];

export default function SocialPage() {
  const totalFollowers = platforms.reduce((a, p) => a + p.followers, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Social</h1>
        <p className="text-muted-foreground text-sm mt-1">Growth, engagement, and content performance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Followers" value={`${(totalFollowers / 1000).toFixed(1)}K`} change="+4.8% this week" changePositive icon={<Users size={16} />} />
        <StatCard label="Best Platform" value="TikTok" change="+8.7% growth" changePositive icon={<TrendingUp size={16} />} />
        <StatCard label="Avg Engagement" value="7.1%" change="+0.4% vs last week" changePositive />
        <StatCard label="Posts This Week" value="5" change="On track for 7" changePositive />
      </div>

      {/* Platform cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {platforms.map((p) => (
          <div key={p.name} className="border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-sm">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.handle}</div>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: p.color }}
              />
            </div>
            <div className="text-2xl font-bold mb-1">{p.followers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">followers</div>
            <div className="flex gap-4 mt-4 text-xs">
              <div>
                <span className="text-muted-foreground">Growth </span>
                <span className="text-green-500 font-medium">{p.growth}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Eng </span>
                <span className="font-medium">{p.engagement}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth chart */}
      <DashboardCard title="Follower Growth">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
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
            <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="tiktok" stroke="#722F37" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommendations */}
        <DashboardCard title="Content Recommendations" action={<Lightbulb size={14} className="text-[#722F37]" />}>
          <div className="space-y-3">
            {recommendations.map((r, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <span className="text-[#722F37] text-xs font-mono mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">{r}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Trend insights */}
        <DashboardCard title="Trend Insights">
          <div className="space-y-4">
            {trends.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{t.topic}</span>
                  <span className="font-medium text-[#722F37]">{t.score}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#722F37] rounded-full transition-all"
                    style={{ width: `${t.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}