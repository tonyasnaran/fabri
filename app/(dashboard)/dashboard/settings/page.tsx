import DashboardCard from "@/components/DashboardCard";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Account and dashboard preferences.</p>
      </div>

      <DashboardCard title="Profile">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground tracking-widest uppercase block mb-1.5">Display Name</label>
            <input
              defaultValue="Anthony Fabri"
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground tracking-widest uppercase block mb-1.5">Email</label>
            <input
              defaultValue="anthony@fabri.com"
              className="w-full bg-muted border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#722F37]"
            />
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Integrations">
        <div className="space-y-3">
          {[
            { name: "Supabase", status: "Connected", note: "Auth + Database" },
            { name: "Anthropic API", status: "Pending", note: "Travel AI" },
            { name: "Google Calendar", status: "Pending", note: "Travel scheduling" },
            { name: "Amadeus", status: "Pending", note: "Flight data" },
          ].map((i) => (
            <div key={i.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <div className="text-sm font-medium">{i.name}</div>
                <div className="text-xs text-muted-foreground">{i.note}</div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full ${
                  i.status === "Connected"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i.status}
              </span>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Danger Zone">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Delete Account</div>
            <div className="text-xs text-muted-foreground mt-0.5">Permanently remove your account and all data.</div>
          </div>
          <button className="text-xs border border-destructive text-destructive px-4 py-2 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors">
            Delete
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}