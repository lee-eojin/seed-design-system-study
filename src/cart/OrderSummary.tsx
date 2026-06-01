import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  orderAmount: number;
  shippingFee: number;
  totalAmount: number;
}

export function OrderSummary({ orderAmount, shippingFee, totalAmount }: OrderSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span>주문 금액</span>
        <span>{orderAmount.toLocaleString()}원</span>
      </div>
      <div className={styles.row}>
        <span>배송비</span>
        <span>{shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.totalRow}>
        <span>총 결제 금액</span>
        <span className={styles.totalAmount}>{totalAmount.toLocaleString()}원</span>
      </div>
    </div>
  );
}
