import { Checkbox } from "@seed-design/react";
import { mockCartItems } from "./mockData";
import { useCart } from "./useCart";
import { CartItem } from "./CartItem";
import { OrderSummary } from "./OrderSummary";
import styles from "./CartPage.module.css";

export function CartPage() {
  const {
    items,
    selected,
    allChecked,
    someChecked,
    toggleItem,
    toggleAll,
    changeQuantity,
    orderAmount,
    shippingFee,
    totalAmount,
  } = useCart(mockCartItems);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>

      <div className={styles.selectAll}>
        <Checkbox.Root checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleAll}>
          <Checkbox.Control />
          <Checkbox.Label>전체선택 ({selected.size}/{items.length})</Checkbox.Label>
        </Checkbox.Root>
      </div>

      <div className={styles.divider} />

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <CartItem
              item={item}
              checked={selected.has(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
              onQuantityChange={(delta) => changeQuantity(item.id, delta)}
            />
            <div className={styles.divider} />
          </li>
        ))}
      </ul>

      <OrderSummary
        orderAmount={orderAmount}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
      />

      <button className={styles.orderButton} disabled={selected.size === 0}>
        주문하기 ({selected.size}개)
      </button>
    </div>
  );
}
