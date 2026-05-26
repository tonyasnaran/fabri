import StatCard from "@/components/StatCard";
import DashboardCard from "@/components/DashboardCard";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  CreditCard,
  Star,
  Users,
  Plane,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Your personal operating system.</p>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Income"
          value="$12,500"
          change="13.6% vs last month"
          changePositive
          icon={<DollarSign size={16} />}
        />
        <StatCard
          label="Expenses"
          value="$7,800"
          change="2.6% vs last month"
          changePositive={false}
          icon={<TrendingDown size={16} />}
        />
        <StatCard
          label="Net Cash Flow"
          value="$4,700"
          change="$800 improvement"
          changePositive
          icon={<TrendingUp size={16} />}
        />
        <StatCard
          label="Credit Utilization"
          value="24%"
          change="Down from 31%"
          changePositive
          icon={<CreditCard size={16} />}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Points Balance"
          value="184,200"
          change="+12,000 this month"
          changePositive
          icon={<Star size={16} />}
        />
        <StatCard
          label="Social Followers"
          value="18.1K"
          change="+4.8% this week"
          changePositive
          icon={<Users size={16} />}
        />
        <StatCard
          label="Travel Deals Found"
          value="3 active"
          change="Expire within 7 days"
          changePositive={false}
          icon={<Plane size={16} />}
        />
      </div>

      {/* Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Activity">
          <div className="space-y-3">
            {[
              { label: "Chase Sapphire — dinner charge", amount: "-$142", time: "2h ago" },
              { label: "Freelance invoice received", amount: "+$2,500", time: "Yesterday" },
              { label: "AMEX annual fee charged", amount: "-$695", time: "3 days ago" },
              { label: "TikTok brand deal deposit", amount: "+$800", time: "5 days ago" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
                <span
                  className={`text-sm font-mono font-medium ${
                    item.amount.startsWith("+") ? "text-green-500" : "text-foreground"
                  }`}
                >
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Opportunities">
          <div className="space-y-3">
            {[
              { label: "Japan — Spring deal expiring", tag: "Travel", urgent: true },
              { label: "Chase signup bonus window", tag: "Credit", urgent: false },
              { label: "DEROS event planning window", tag: "Projects", urgent: false },
              { label: "Content posting streak due", tag: "Social", urgent: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="text-sm">{item.label}</div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.urgent
                      ? "bg-red-500/10 text-red-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}