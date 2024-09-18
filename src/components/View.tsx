import { Layout, Space, Typography } from "antd";
import { Space_Grotesk } from "next/font/google";
import styled from "styled-components";
import type { CSSProperties, ReactElement } from "react";

import Countdown from "@/components/Countdown";
import Score from "@/components/Score";

const font = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

const StyledLayout = styled(Layout)<{ style?: CSSProperties }>({
  background: "radial-gradient(#2707A0, #000000)",
  height: "100vh",
  padding: "0 30px",
  width: "100vw",
});

const StyledSpace = styled(Space)<{ style?: CSSProperties }>({
  justifyContent: "space-around",
  height: "100%",
  width: "100%",
});

type ViewProps = {
  actionElement: ReactElement;
  contentElement: ReactElement;
  footerElement?: ReactElement;
  headingElement: ReactElement;
  isCountdownVisible?: boolean;
  score?: number;
  subheading?: string;
  username?: string;
};

export default function View({
  actionElement,
  contentElement,
  footerElement,
  headingElement,
  isCountdownVisible = false,
  score = 0,
  subheading,
  username,
}: ViewProps): ReactElement {
  return (
    <main className={font.className}>
      <StyledLayout>
        <StyledSpace align="center" direction="vertical">
          {username && <Score username={username} value={score} />}

          <Space align="center" direction="vertical">
            {headingElement}

            {subheading && <Typography.Text>{subheading}</Typography.Text>}
          </Space>

          {contentElement}

          {isCountdownVisible && <Countdown />}

          {actionElement}

          {footerElement}
        </StyledSpace>
      </StyledLayout>
    </main>
  );
}
