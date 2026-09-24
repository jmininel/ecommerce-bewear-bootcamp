import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "./components/cart-summary";

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

        <CartSummary
          subtotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />

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
