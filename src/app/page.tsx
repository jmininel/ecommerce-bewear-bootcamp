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
      <div className="space-y-6">
        <div className="px-5">
          <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw" 
              className="h-auto w-full" 
          />
        </div>


   
 <div className="bg-white  md:p-12 lg:p-16 rounded-xl">
  <div >
    <h3 className="px-5 font-semibold text-gray-900 mb-5 ">Marcas parceiras</h3>
    <div className="flex gap-5 md:gap-8 justify-center">
      
     
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-full h-30">
        <Image src="/nike.svg" alt="marca nike" width={50} height={50} />
      </div>

   
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-full  h-30">
        <Image src="/adidas.svg" alt="marca adidas" width={50} height={50} />
      </div>

     
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-full h-30">
        <Image src="/puma.svg" alt="marca puma" width={50} height={50} />
      </div>

    
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-full h-30">
        <Image src="/newbalance.svg" alt="marca new balance" width={50} height={50} />
      </div>
      
    </div>
  </div>
</div> 

         <ProductList products={products} title="Mais vendidos"/>

           <div className="lg:hidden">
            <CategorySelector categories={categories}/>
          </div>


         {/* Banner Único para Mobile */}
       <div className="px-5 lg:hidden">
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
       <div className="hidden px-5 lg:block">
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
        <Footer/>
    </div>
  </>
 );
}

export default Home