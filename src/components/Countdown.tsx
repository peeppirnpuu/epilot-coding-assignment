import { Statistic } from "antd";
import styled, { keyframes } from "styled-components";
import type { ReactElement } from "react";

import { colorCountdown, delayInMilliseconds } from "@/constants";

const countdownAnimation = keyframes`
  0% {
    height: 100px;
    width: 100px;
  }
  100% {
    height: 50px;
    width: 50px;
  }
`;

// Use template literals in styled-components for compatibility with keyframes
const StyledCountdownAnimatedElement = styled.div`
  animation: ${countdownAnimation} ${delayInMilliseconds}ms;
  align-items: center;
  background-color: ${colorCountdown};
  border-radius: 50%;
  display: flex;
  height: 50px;
  justify-content: center;
  width: 50px;
`;

const StyledCountdownWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  height: 100,
  justifyContent: "center",
  width: 100,
});

export default function Countdown(): ReactElement {
  return (
    <StyledCountdownWrapper>
      <StyledCountdownAnimatedElement>
        <Statistic.Countdown
          format="ss"
          value={Date.now() + delayInMilliseconds}
        />
      </StyledCountdownAnimatedElement>
    </StyledCountdownWrapper>
  );
}
