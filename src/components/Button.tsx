import { Button as AntdButton, ConfigProvider } from "antd";
import type { ButtonProps as AntdButtonProps } from "antd";

type ButtonProps = {
  color: string;
} & AntdButtonProps;

export default function Button({ color, ...restProps }: ButtonProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
        },
      }}
    >
      <AntdButton {...restProps} />
    </ConfigProvider>
  );
}
