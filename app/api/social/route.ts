import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    platforms: [
      {
        name: "Instagram",
        handle: "@anthonyfabri",
        followers: 4820,
        growth: "+3.2%",
        engagement: "5.8%",
        posts: 142,
      },
      {
        name: "TikTok",
        handle: "@fabriaf",
        followers: 11200,
        growth: "+8.7%",
        engagement: "9.4%",
        posts: 89,
      },
      {
        name: "YouTube",
        handle: "FABRI",
        followers: 2100,
        growth: "+1.4%",
        engagement: "6.2%",
        posts: 24,
      },
    ],
    contentRecommendations: [
      "Post a behind-the-scenes of the next DEROS event",
      "Day-in-the-life format is performing 2x avg engagement",
      "TikTok trends: Founder morning routines, city walks",
    ],
    trendInsights: [
      { topic: "Founder lifestyle", score: 92 },
      { topic: "LA nightlife", score: 87 },
      { topic: "Entrepreneurship tips", score: 81 },
    ],
  });
}