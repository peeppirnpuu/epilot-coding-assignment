import { useCallback } from "react";

import { isNumber } from "@/helpers";

type Username = string;

type Data = {
  username: Username;
  score: number;
};

export const useDatabase = () => {
  const getScoreFromDatabase = useCallback(async (username: Username) => {
    const { score } = await fetch(`/api/score?username=${username}`).then(
      (response) => response.json()
    );

    return isNumber(score) ? score : 0;
  }, []);

  const saveScoreToDatabase = useCallback((data: Data) => {
    fetch("/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return { getScoreFromDatabase, saveScoreToDatabase };
};
