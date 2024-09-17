export async function GET() {
  // Fetch the BTC price from the external API
  const response = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  );
  const data = await response.json();

  // Extract the USD price of BTC
  const btcPrice = data.price;

  // Return the response as JSON
  return new Response(btcPrice, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
