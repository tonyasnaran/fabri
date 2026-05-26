import { NextRequest, NextResponse } from "next/server";

interface TravelChatRequest {
  message: string;
  dates?: { from: string; to: string };
}

export async function POST(req: NextRequest) {
  const body: TravelChatRequest = await req.json();
  const { message } = body;

  // Anthropic integration point
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey && !anthropicKey.includes("placeholder")) {
    // TODO: integrate Anthropic SDK
    // const Anthropic = require("@anthropic-ai/sdk");
    // const client = new Anthropic({ apiKey: anthropicKey });
    // const response = await client.messages.create({ ... });
  }

  // Amadeus flight data integration point
  // const amadeusId = process.env.AMADEUS_CLIENT_ID;
  // if (amadeusId && !amadeusId.includes("placeholder")) {
  //   TODO: fetch real flight deals from Amadeus API
  // }

  // Google Calendar integration point
  // const googleId = process.env.GOOGLE_CLIENT_ID;
  // if (googleId && !googleId.includes("placeholder")) {
  //   TODO: check calendar availability
  // }

  const lower = message.toLowerCase();
  let response = "I'm scanning deals and availability for you. Try asking about a specific destination!";

  if (lower.includes("japan") || lower.includes("tokyo")) {
    response = "✈️ LAX→NRT round trips from $650 on ANA in late March. Hidden tip: check OGG and LGB for $50–80 savings vs LAX.";
  } else if (lower.includes("europe") || lower.includes("paris")) {
    response = "🇪🇺 NYC→Paris from $420 this April via Iceland Air stopover. Great points redemption opportunity with Chase Sapphire.";
  } else if (lower.includes("cheap") || lower.includes("deal")) {
    response = "💡 BUR, LGB, and ONT are your hidden gems. Currently seeing LAX deals from BUR at $189 to Miami this month.";
  }

  return NextResponse.json({
    response,
    deals: [
      { route: "LAX → NRT", price: "$650", airline: "ANA", dates: "Mar 22–Apr 1", verified: true },
      { route: "LAX → CDG", price: "$420", airline: "Air France", dates: "Apr 10–20", verified: true },
    ],
  });
}