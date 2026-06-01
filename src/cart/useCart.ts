import { useState } from "react";
import type { CartProduct } from "./mockData";

const SHIPPING_FEE = 3000;
const FREE_SHIPPING_THRESHOLD = 100_000;

export function useCart(initialItems: CartProduct[]) {
  const [items, setItems] = useState(initialItems);
  const [selected, setSelected] = useState<Set<number>>(
    new Set(initialItems.map((item) => item.id))
  );

  const allChecked = selected.size === items.length;
  const someChecked = selected.size > 0 && !allChecked;

  function toggleItem(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allChecked ? new Set() : new Set(items.map((item) => item.id)));
  }

  function changeQuantity(id: number, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  const orderAmount = items
    .filter((item) => selected.has(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingFee = orderAmount === 0 || orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const totalAmount = orderAmount + shippingFee;

  return {
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
  };
}
