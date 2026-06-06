import { useState } from "react";
import { Checkbox, Divider } from "@seed-design/react";
import { ActionButton } from "../../seed-design/ui/action-button";
import { Callout } from "../../seed-design/ui/callout";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "../../seed-design/ui/bottom-sheet";
import { Snackbar, useSnackbarAdapter } from "../../seed-design/ui/snackbar";
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
    removeItem,
    restoreItem,
    orderAmount,
    shippingFee,
    totalAmount,
    remaining,
  } = useCart(mockCartItems);

  const snackbar = useSnackbarAdapter();
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);

  const handleRemove = (id: number) => {
    const snapshot = removeItem(id);
    if (!snapshot) return;
    snackbar.create({
      render: () => (
        <Snackbar
          message="상품을 삭제했어요"
          actionLabel="실행취소"
          onAction={() => restoreItem(snapshot)}
        />
      ),
    });
  };

  const handleCheckout = () => {
    setOrderSheetOpen(false);
    snackbar.create({
      render: () => <Snackbar variant="positive" message="주문이 완료되었어요" />,
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <span>🛒</span>
          <p>장바구니가 비어있어요</p>
        </div>
      ) : (
        <>
          <div className={styles.selectAll}>
            <Checkbox.Root checked={allChecked} indeterminate={someChecked} onCheckedChange={toggleAll}>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>전체선택 ({selected.size}/{items.length})</Checkbox.Label>
            </Checkbox.Root>
          </div>

          <Divider />

          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id}>
                <CartItem
                  item={item}
                  checked={selected.has(item.id)}
                  onCheckedChange={() => toggleItem(item.id)}
                  onQuantityChange={(delta) => changeQuantity(item.id, delta)}
                  onRemove={() => handleRemove(item.id)}
                />
                <Divider />
              </li>
            ))}
          </ul>

          {orderAmount > 0 && (
            <div className={styles.notice}>
              {remaining > 0 ? (
                <Callout
                  tone="informative"
                  description={`${remaining.toLocaleString()}원 더 담으면 무료배송이에요`}
                />
              ) : (
                <Callout tone="positive" description="무료배송 대상이에요" />
              )}
            </div>
          )}

          <OrderSummary
            orderAmount={orderAmount}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
          />
        </>
      )}

      <BottomSheetRoot open={orderSheetOpen} onOpenChange={(open) => setOrderSheetOpen(open)}>
        <BottomSheetTrigger asChild>
          <button className={styles.orderButton} disabled={selected.size === 0}>
            주문하기 ({selected.size}개)
          </button>
        </BottomSheetTrigger>
        <BottomSheetContent title="주문 확인">
          <BottomSheetBody>
            <OrderSummary
              orderAmount={orderAmount}
              shippingFee={shippingFee}
              totalAmount={totalAmount}
            />
          </BottomSheetBody>
          <BottomSheetFooter>
            <ActionButton variant="brandSolid" onClick={handleCheckout}>
              {totalAmount.toLocaleString()}원 결제하기
            </ActionButton>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheetRoot>
    </div>
  );
}
