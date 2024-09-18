import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Space, Spin, Statistic, theme } from "antd";

import { colorPriceIndicator } from "@/constants";
import { useCryptoWebSocket } from "@/hooks/useCryptoWebSocket";

type RealtimePriceIndicatorProps = {
  comparativePrice?: number;
  isComparativePriceVisible: boolean;
};

export default function RealtimePriceIndicator({
  comparativePrice,
  isComparativePriceVisible,
}: RealtimePriceIndicatorProps) {
  const btcRealtimePrice: number = useCryptoWebSocket();

  const { token } = theme.useToken();

  const isPriceGoingDown =
    comparativePrice !== undefined && btcRealtimePrice < comparativePrice;

  const loadingElement = (
    <Spin indicator={<LoadingOutlined spin />} size="large" />
  );

  return btcRealtimePrice !== 0 ? (
    <Space align="center" direction="vertical">
      <Statistic
        precision={2}
        prefix="BTC:"
        suffix="USD"
        value={isComparativePriceVisible ? comparativePrice : btcRealtimePrice}
        valueStyle={{ color: colorPriceIndicator }}
      />

      {isComparativePriceVisible && (
        <Statistic
          precision={2}
          prefix={
            isPriceGoingDown ? <ArrowDownOutlined /> : <ArrowUpOutlined />
          }
          value={btcRealtimePrice}
          valueStyle={{
            color: isPriceGoingDown ? token.colorError : token.colorSuccess,
          }}
        />
      )}
    </Space>
  ) : (
    loadingElement
  );
}
