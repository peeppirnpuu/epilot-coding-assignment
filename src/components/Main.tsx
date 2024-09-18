import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Space, Typography, theme } from "antd";
import { useCallback, useState, useTransition } from "react";
import type { ReactElement } from "react";

import Button from "@/components/Button";
import PasttimeQuiz from "@/components/PasttimeQuiz";
import RealtimePriceIndicator from "@/components/RealtimePriceIndicator";
import View from "@/components/View";
import { delayInSeconds } from "@/constants";
import { saveToLocalStorage } from "@/helpers/localStorage";
import { useDatabase } from "@/hooks/useDatabase";

type ButtonType = {
  color: string;
  description: string;
  icon: ReactElement;
  onClick: () => void;
};

type Prediction = "up" | "down" | undefined;

type MainProps = {
  savedScore: number;
  showEntryPage: () => void;
  username: string;
};

export default function Main({
  savedScore,
  showEntryPage,
  username,
}: MainProps): ReactElement {
  const { saveScoreToDatabase } = useDatabase();
  const [btcPrice, setBtcPrice] = useState<number | undefined>(undefined);
  const [prediction, setPrediction] = useState<Prediction>(undefined);
  const [score, setScore] = useState<number>(savedScore);
  const [isPending, startTransition] = useTransition();

  const { token } = theme.useToken();

  const isWaitingForPriceUpdate = !!btcPrice && isPending;

  const validatePrediction = useCallback(
    (
      prediction: Prediction,
      oldBtcPrice: number,
      newBtcPrice: number
    ): number => {
      if (prediction === "down" && oldBtcPrice > newBtcPrice) return 1;
      if (prediction === "up" && oldBtcPrice < newBtcPrice) return 1;
      if (newBtcPrice === oldBtcPrice) return 0;
      return -1;
    },
    []
  );

  const handlePredictionClick = useCallback(
    (prediction: Prediction) => {
      setPrediction(prediction);

      const fetchGuessInputData = async () => {
        const btcPrice = await fetch("/api/btc").then((response) =>
          response.json()
        );

        setBtcPrice(btcPrice);

        startTransition(async () => {
          const newBtcPrice = await fetch("/api/btc-update").then((response) =>
            response.json()
          );

          const scorePoints = validatePrediction(
            prediction,
            btcPrice,
            newBtcPrice
          );
          const newScore = score + scorePoints;
          saveToLocalStorage(JSON.stringify({ score: newScore, username }));
          saveScoreToDatabase({ score: newScore, username });
          setScore(newScore);

          setBtcPrice(undefined);
        });
      };

      fetchGuessInputData();
    },
    [saveScoreToDatabase, score, username, validatePrediction]
  );

  const handleRestartClick = () => {
    setBtcPrice(undefined);
    setScore(0);

    showEntryPage();
  };

  const buttons: ButtonType[] = [
    {
      color: token.colorSuccess,
      description: "UP",
      icon: <ArrowUpOutlined />,
      onClick: () => handlePredictionClick("up"),
    },
    {
      color: token.colorError,
      description: "DOWN",
      icon: <ArrowDownOutlined />,
      onClick: () => handlePredictionClick("down"),
    },
  ];

  return (
    <View
      actionElement={
        isWaitingForPriceUpdate ? (
          <Space align="center" direction="vertical">
            <Typography.Title level={4}>
              HOW CONFIDENT ARE YOU?
            </Typography.Title>
            <Space direction="horizontal">
              <PasttimeQuiz
                answers={[
                  "Unstoppable like Satoshi!",
                  "Laser eyes on target!",
                  "Confident as a whale!",
                  "Going to the moon!",
                  "Victory is inevitable!",
                  "I've got diamond hands!",
                  "This is the one!",
                  "Betting like a bull!",
                  "Riding the rocket!",
                  "This is my moment!",
                  "BTC to the moon!",
                  "Winning like a pro!",
                  "Feeling super bullish!",
                  "HODL strong and prosper!",
                  "Price is going up!",
                  "I’m in for the win!",
                  "Moon-bound, no doubt!",
                  "Victory is certain!",
                  "Feeling invincible today!",
                  "BTC can’t be stopped!",
                ]}
                color={token.colorSuccess}
              />
              <PasttimeQuiz
                answers={[
                  "Hopeful but sweating",
                  "Please don't crash",
                  "Feeling wobbly",
                  "Might HODL, might cry",
                  "Praying for green",
                  "Paper hands shaking",
                  "Could be worse",
                  "Staring at the abyss",
                  "Just one more dip",
                  "Need a miracle",
                  "On thin ice",
                  "Nervously waiting",
                  "Hoping for a rebound",
                  "Barely HODLing",
                  "Hoping not to crash",
                  "Unsure but trying",
                  "It’s in the hands of fate",
                  "Fingers crossed",
                  "Praying for a bounce",
                  "Is it too late?",
                ]}
                color={token.colorError}
              />
            </Space>
          </Space>
        ) : (
          <Space size="large">
            {buttons.map(({ color, description, icon, onClick }, index) => (
              <Space align="center" direction="vertical" key={index}>
                <Button
                  color={color}
                  icon={icon}
                  onClick={onClick}
                  shape="circle"
                  type="primary"
                />
                <Typography.Text>{description}</Typography.Text>
              </Space>
            ))}
          </Space>
        )
      }
      contentElement={
        <RealtimePriceIndicator
          comparativePrice={btcPrice}
          isComparativePriceVisible={isWaitingForPriceUpdate}
        />
      }
      footerElement={
        <Button onClick={handleRestartClick} size="small" type="text">
          Restart game
        </Button>
      }
      headingElement={
        isWaitingForPriceUpdate ? (
          <Space>
            <Typography.Title level={4}>
              YOU MADE A GUESS OF PRICE GOING{" "}
            </Typography.Title>
            {prediction === "down" ? (
              <Typography.Title level={4} type="danger">
                <ArrowDownOutlined /> DOWN
              </Typography.Title>
            ) : (
              <Typography.Title level={4} type="success">
                <ArrowUpOutlined /> UP
              </Typography.Title>
            )}
          </Space>
        ) : (
          <Typography.Title level={4}>PRICE MOVES FAST</Typography.Title>
        )
      }
      isCountdownVisible={isWaitingForPriceUpdate}
      score={score}
      subheading={
        isWaitingForPriceUpdate
          ? `FIND OUT THE TRUTH IN ${delayInSeconds} SECONDS`
          : "MAKE A GUESS WHEN YOU ARE READY"
      }
      username={username}
    />
  );
}
