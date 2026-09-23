import Image from "next/image";
import { desc } from "drizzle-orm";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";

import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
   const products = await db.query.productTable.findMany({
      with: {
         variants: true,
      }
   })

   const newlyCreatedProducts = await db.query.productTable.findMany({
      orderBy: [desc(productTable.createdAt)],
      with: {
         variants: true,
      }
   })
  
  const categories = await db.query.categoryTable.findMany({})
   
  return (
  <>
     <Header/>
      <div className="space-y-10 pb-10">
        <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
          <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw" 
              className="h-auto w-full" 
          />
        </div>


   
 <div className="mx-auto w-full max-w-7xl rounded-xl bg-white px-5 md:p-12 lg:px-8 lg:py-10">
  <div>
    <h3 className="mb-5 font-semibold text-gray-900">Marcas parceiras</h3>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
      
     
      <div className="flex h-30 w-full items-center justify-center rounded-xl border border-gray-300 p-4">
        <Image src="/nike.svg" alt="marca nike" width={50} height={50} />
      </div>

   
      <div className="flex h-30 w-full items-center justify-center rounded-xl border border-gray-300 p-4">
        <Image src="/adidas.svg" alt="marca adidas" width={50} height={50} />
      </div>

     
      <div className="flex h-30 w-full items-center justify-center rounded-xl border border-gray-300 p-4">
        <Image src="/puma.svg" alt="marca puma" width={50} height={50} />
      </div>

    
      <div className="flex h-30 w-full items-center justify-center rounded-xl border border-gray-300 p-4">
        <Image src="/newbalance.svg" alt="marca new balance" width={50} height={50} />
      </div>
      
    </div>
  </div>
</div> 

         <ProductList products={products} title="Mais vendidos"/>

           <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <CategorySelector categories={categories}/>
          </div>


         {/* Banner Único para Mobile */}
      <div className="mx-auto w-full max-w-7xl px-5 lg:hidden">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw" 
            className="h-auto w-full" 
           />
       </div>

       {/* Banners em Grid para Desktop */}
      <div className="mx-auto hidden w-full max-w-7xl px-5 lg:block lg:px-8">
           <div className="grid grid-cols-2 gap-4">
               {/* Lado Esquerdo - Duas imagens */}
               <div className="space-y-4">
                   <Image
                       src="/tenis-preto.svg" // Substitua pelo nome do seu arquivo
                       alt="Banner superior esquerdo"
                       width={0}
                       height={0}
                       sizes="50vw"
                       className="w-full h-auto"
                   />
                   <Image
                       src="/tenis-roxo.svg" // Substitua pelo nome do seu arquivo
                       alt="Banner inferior esquerdo"
                       width={0}
                       height={0}
                       sizes="50vw"
                       className="w-full h-auto"
                   />
               </div>

               {/* Lado Direito - Uma imagem grande */}
               <div>
                   <Image
                       src="/logomen.svg" // Substitua pelo nome do seu arquivo
                       alt="Banner direito"
                       width={0}
                       height={0}
                       sizes="50vw"
                       className="w-full h-full object-cover"
                   />
               </div>
           </div>
       </div>
        <div className="lg:hidden">
            <ProductList products={newlyCreatedProducts} title="Novos produtos" />
         </div>
        <div className="hidden lg:block">
          <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        </div>
        <Footer/>
    </div>
  </>
 );
}

export default Home