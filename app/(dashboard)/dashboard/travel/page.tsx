import ChatInterface from "@/components/ChatInterface";

export default function TravelPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold font-display">Travel AI</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Flight deals, hidden airports, and smart scheduling.
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}