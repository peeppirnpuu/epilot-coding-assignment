import { Space, Typography } from "antd";

type ScoreProps = {
  username: string;
  value?: number;
};

export default function Score({ username, value }: ScoreProps) {
  return (
    <Space align="center" direction="vertical">
      <Typography.Title level={5}>{username}</Typography.Title>
      <Typography.Title level={5}>SCORE: {value}</Typography.Title>
    </Space>
  );
}
