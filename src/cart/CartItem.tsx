import { Checkbox, ImageFrame } from "@seed-design/react";
import type { CartProduct } from "./mockData";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartProduct;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onQuantityChange: (delta: number) => void;
}

export function CartItem({ item, checked, onCheckedChange, onQuantityChange }: CartItemProps) {
  return (
    <div className={styles.container}>
      <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange}>
        <Checkbox.Control />
      </Checkbox.Root>
      <div className={styles.imageWrapper}>
        <ImageFrame
          src={item.imageUrl}
          alt={item.name}
          ratio={1}
          borderRadius="r2"
          stroke
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{item.price.toLocaleString()}원</p>
        <div className={styles.quantity}>
          <button onClick={() => onQuantityChange(-1)} disabled={item.quantity <= 1}>
            −
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(1)}>+</button>
        </div>
      </div>
    </div>
  );
}
