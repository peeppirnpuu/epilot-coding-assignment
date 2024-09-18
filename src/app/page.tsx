"use client";

import { ConfigProvider, Input, Typography, theme } from "antd";
import { useEffect, useState, ReactElement } from "react";

import Button from "@/components/Button";
import Main from "@/components/Main";
import View from "@/components/View";
import { colorDown, colorPriceIndicator, colorUp } from "@/constants";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/helpers/localStorage";
import { useDatabase } from "@/hooks/useDatabase";

export default function Entry(): ReactElement {
  const { getScoreFromDatabase } = useDatabase();
  const [savedScore, setSavedScore] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string>("");

  const { token } = theme.useToken();

  useEffect(() => {
    const { score, username } = getFromLocalStorage();

    setSavedScore(score);
    setUsername(username);
  }, []);

  const handleGoClick = async () => {
    const score = await getScoreFromDatabase(username);

    saveToLocalStorage(JSON.stringify({ score, username }));
    setSavedScore(score);
  };

  const handleRestart = () => {
    setSavedScore(undefined);
    setUsername("");

    removeFromLocalStorage();
  };

  const isMainViewReady = savedScore !== undefined;

  const appElement: ReactElement = isMainViewReady ? (
    <Main
      savedScore={savedScore}
      showEntryPage={handleRestart}
      username={username}
    />
  ) : (
    <View
      actionElement={
        <Button
          color={colorUp}
          disabled={!username}
          onClick={handleGoClick}
          shape="circle"
          size="large"
          type="primary"
        >
          Go
        </Button>
      }
      contentElement={
        <Input
          placeholder="Your name"
          size="large"
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      }
      headingElement={
        <Typography.Title level={4}>
          Ready to bet on bitcoin price going up or down?
        </Typography.Title>
      }
      subheading="Start by entering your name"
    />
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorTextDisabled: "rgba(255,255,255,0.8)",
            fontSizeLG: 40,
            controlHeight: 80,
            controlHeightLG: 100,
            controlHeightSM: 50,
          },
          Input: {
            colorText: token.colorTextBase,
          },
          Spin: {
            colorPrimary: colorPriceIndicator,
          },
        },
        token: {
          colorError: colorDown,
          colorSuccess: colorUp,
          colorText: token.colorWhite,
          colorWarning: "yellow",
          fontFamily: "Space Grotesk",
          fontSize: 16,
        },
      }}
    >
      {appElement}
    </ConfigProvider>
  );
}
