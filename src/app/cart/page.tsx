import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { formatCentsToBRL } from "@/helpers/money";
import { auth } from "@/lib/auth";

import CartSummaryItemActions from "./components/cart-summary-item-actions";

const CartPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/authentication");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/");
  }

  const totalProducts = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const cartTotalInCents = cart.items.reduce(
    (total, item) =>
      total + item.productVariant.priceInCents * item.quantity,
    0,
  );

  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-3xl space-y-6 px-5 pb-10 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Carrinho</h1>
            <p className="text-muted-foreground text-sm">
              {totalProducts} {totalProducts === 1 ? "produto" : "produtos"}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Continuar comprando</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm">Subtotal</p>
              <p className="text-muted-foreground text-sm font-medium">
                {formatCentsToBRL(cartTotalInCents)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Frete</p>
              <p className="text-muted-foreground text-sm font-medium">
                GRÁTIS
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Total</p>
              <p className="text-muted-foreground text-sm font-medium">
                {formatCentsToBRL(cartTotalInCents)}
              </p>
            </div>

            <div className="py-3">
              <Separator />
            </div>

            {cart.items.map((item) => (
              <div
                className="flex items-center justify-between"
                key={item.productVariant.id}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.productVariant.imageUrl}
                    alt={item.productVariant.product.name}
                    width={78}
                    height={78}
                    className="rounded-3xl"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold">
                      {item.productVariant.product.name}
                    </p>
                    <p className="text-muted-foreground text-xs font-medium">
                      {item.productVariant.name}
                    </p>
                    <CartSummaryItemActions
                      cartItemId={item.id}
                      productVariantId={item.productVariant.id}
                      quantity={item.quantity}
                    />
                  </div>
                </div>
                <p className="text-sm font-bold">
                  {formatCentsToBRL(item.productVariant.priceInCents)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full max-w-sm" asChild>
            <Link href="/cart/identification">Finalizar compra</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
