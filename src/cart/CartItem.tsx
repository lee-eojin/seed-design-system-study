import { Checkbox, Icon, ImageFrame } from "@seed-design/react";
import { ActionButton } from "../../seed-design/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../seed-design/ui/alert-dialog";
import type { CartProduct } from "./mockData";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartProduct;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onQuantityChange: (delta: number) => void;
  onRemove: () => void;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export function CartItem({ item, checked, onCheckedChange, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className={styles.container}>
      <Checkbox.Root checked={checked} onCheckedChange={onCheckedChange}>
        <Checkbox.HiddenInput />
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
      <AlertDialogRoot>
        <AlertDialogTrigger asChild>
          <ActionButton
            layout="iconOnly"
            variant="ghost"
            size="small"
            aria-label="삭제"
            className={styles.deleteButton}
          >
            <Icon svg={<CloseIcon />} />
          </ActionButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>상품을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>{item.name}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction variant="neutralWeak">취소</AlertDialogAction>
            <AlertDialogAction variant="criticalSolid" onClick={onRemove}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
