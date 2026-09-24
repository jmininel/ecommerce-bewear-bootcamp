import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="space-y-10 pb-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-8">
        <div className="flex h-[min(78vw,420px)] w-full items-center justify-center overflow-hidden rounded-3xl bg-muted/30 lg:h-[560px]">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="(max-width: 1024px) 100vw, 560px"
            height={800}
            width={800}
            className="h-full w-full rounded-3xl object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 lg:pt-4">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />

          <div>
            <h2 className="text-2xl font-semibold">
              {productVariant.product.name}
            </h2>
            <h3 className="text-muted-foreground text-sm">
              {productVariant.name}
            </h3>
            <h3 className="mt-2 text-xl font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </h3>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <p className="text-muted-foreground text-sm leading-6">
            {productVariant.product.description}
          </p>
        </div>

        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;