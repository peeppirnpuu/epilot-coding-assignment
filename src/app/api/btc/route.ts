import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
    );

    // Handle non-200 responses from the Binance API
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch BTC price from Binance" },
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { price: btcPrice } = await response.json();

    return NextResponse.json(
      { btcPrice },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching BTC price:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
