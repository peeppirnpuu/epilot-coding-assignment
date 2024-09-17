export async function GET() {
  // Delay the response by 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
