import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function DashboardCard({
  title,
  children,
  className,
  action,
}: DashboardCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-6", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}