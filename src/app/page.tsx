"use client";

import { ConfigProvider, Input, Typography, theme } from "antd";
import { useEffect, useState, useTransition, ReactElement } from "react";

import Button from "@/components/Button";
import Main from "@/components/Main";
import View from "@/components/View";
import {
  colorDown,
  colorPriceIndicator,
  colorTextDisabled,
  colorUp,
} from "@/constants";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/helpers/localStorage";
import { useDatabase } from "@/hooks/useDatabase";

export default function App(): ReactElement {
  const { getScoreFromDatabase } = useDatabase();
  const [savedScore, setSavedScore] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const { token } = theme.useToken();

  useEffect(() => {
    const { score, username } = getFromLocalStorage();

    setSavedScore(score);
    setUsername(username);
  }, []);

  const handleGoClick = () => {
    startTransition(async () => {
      const score = await getScoreFromDatabase(username);

      saveToLocalStorage(JSON.stringify({ score, username }));
      setSavedScore(score);
    });
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
          disabled={isPending || !username}
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
          disabled={isPending}
          placeholder="Your name"
          size="large"
          onChange={(event) => setUsername(event.currentTarget.value)}
          onPressEnter={handleGoClick}
        />
      }
      headingElement={
        <Typography.Title level={4} style={{ textAlign: "center" }}>
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
            colorTextDisabled,
            fontSizeLG: 40,
            controlHeight: 80,
            controlHeightLG: 100,
            controlHeightSM: 50,
          },
          Input: {
            colorText: token.colorTextBase,
            colorTextDisabled,
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
