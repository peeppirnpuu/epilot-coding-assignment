"use client";

import { useEffect, useState, useTransition } from "react";

import { useCryptoWebSocket } from "../hooks/useCryptoWebSocket";

type Prediction = undefined | "up" | "down";

export default function Home() {
  const btcRealtimePrice = useCryptoWebSocket();
  const [btcPrice, setBtcPrice] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchInitialData = async () => {
      const btcPrice = await fetch("/api/btc").then((response) =>
        response.json()
      );

      setBtcPrice(btcPrice);
    };

    fetchInitialData();
  }, []);

  const validatePrediction = (
    prediction: Prediction,
    btcPrice: number,
    newBtcPrice: number
  ) => {
    switch (true) {
      case newBtcPrice < btcPrice && prediction === "down":
      case newBtcPrice > btcPrice && prediction === "up":
        return 1;
      case newBtcPrice === btcPrice:
        return 0;
      default:
        return -1;
    }
  };

  const handleClick = (prediction: Prediction) => {
    startTransition(async () => {
      const newBtcPrice = await fetch("/api/btc-update").then((response) =>
        response.json()
      );

      const scorePoints = validatePrediction(prediction, btcPrice, newBtcPrice);

      setBtcPrice(newBtcPrice);
      setScore((score) => score + scorePoints);
    });
  };

  return (
    <main>
      <div>Real-time BTC price: {btcRealtimePrice}</div>
      <div>In-app BTC price: {btcPrice}</div>
      <div>Score: {score}</div>
      <button
        disabled={isPending}
        onClick={() => {
          handleClick("up");
        }}
      >
        up
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          handleClick("down");
        }}
      >
        down
      </button>
    </main>
  );
}
