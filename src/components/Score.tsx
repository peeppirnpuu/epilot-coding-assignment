import { Space, Typography } from "antd";

type ScoreProps = {
  username: string;
  value?: number;
};

export default function Score({ username, value }: ScoreProps) {
  return (
    <Space align="center" direction="vertical">
      <Typography.Text>{username}</Typography.Text>
      <Typography.Title level={5}>SCORE</Typography.Title>
      {value !== undefined && <Typography.Text strong>{value}</Typography.Text>}
    </Space>
  );
}
