"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";

import { Button } from "@/components/ui/button";

interface CartSummaryItemActionsProps {
  cartItemId: string;
  productVariantId: string;
  quantity: number;
}

const CartSummaryItemActions = ({
  cartItemId,
  productVariantId,
  quantity,
}: CartSummaryItemActionsProps) => {
  const router = useRouter();
  const decreaseMutation = useDecreaseCartProduct(cartItemId);
  const increaseMutation = useIncreaseCartProduct(productVariantId);
  const isPending = decreaseMutation.isPending || increaseMutation.isPending;

  const handleDecrease = () => {
    decreaseMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.");
        router.refresh();
      },
      onError: () => {
        toast.error("Erro ao atualizar a quantidade do produto.");
      },
    });
  };

  const handleIncrease = () => {
    increaseMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto atualizada.");
        router.refresh();
      },
      onError: () => {
        toast.error("Erro ao atualizar a quantidade do produto.");
      },
    });
  };

  return (
    <div className="mt-2 flex w-fit items-center gap-2 rounded-lg border px-2 py-1">
      <span className="text-muted-foreground text-xs">Quantidade</span>
      <Button
        aria-label="Diminuir quantidade"
        className="h-8 w-8"
        disabled={isPending}
        onClick={handleDecrease}
        size="icon"
        variant="ghost"
      >
        <MinusIcon />
      </Button>
      <span aria-live="polite" className="min-w-5 text-center text-sm font-medium">
        {quantity}
      </span>
      <Button
        aria-label="Aumentar quantidade"
        className="h-8 w-8"
        disabled={isPending}
        onClick={handleIncrease}
        size="icon"
        variant="ghost"
      >
        <PlusIcon />
      </Button>
    </div>
  );
};

export default CartSummaryItemActions;
