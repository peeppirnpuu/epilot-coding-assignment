export async function GET() {
  // Fetch the BTC price from the external API
  const response = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );
  const { price: btcPrice } = await response.json();

  return new Response(btcPrice, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
