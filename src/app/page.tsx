"use client";

import React, { useEffect, useState } from "react";

const BinanceWebSocket = () => {
  const [btcPrice, setBtcPrice] = useState<number>(0);

  useEffect(() => {
    // Subscribe to stream of trades to get real-time overview of the BTC price in USD
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setBtcPrice(parseFloat(data.p)); // p is the price in the trade message
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>BTC Price from Binance WebSocket</h1>
      {btcPrice ? <p>{btcPrice} USD</p> : <p>Fetching price...</p>}
    </div>
  );
};

export default BinanceWebSocket;
