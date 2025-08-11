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


   
{/* <div className="bg-white p-8 md:p-12 lg:p-16 rounded-xl">
  <div className="px-5">
    <p className="text-2xl font-bold text-gray-900 mb-6">Marcas parceiras</p>
    <div className="flex gap-5 md:gap-8 justify-center">
      
     
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-32 h-20">
        <Image src="/nike.svg" alt="marca nike" width={50} height={50} />
      </div>

   
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-32 h-20">
        <Image src="/adidas.svg" alt="marca adidas" width={50} height={50} />
      </div>

     
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-32 h-20">
        <Image src="/puma.svg" alt="marca puma" width={50} height={50} />
      </div>

    
      <div className="border border-gray-300 p-4 rounded-xl flex items-center justify-center w-32 h-20">
        <Image src="/newbalance.svg" alt="marca new balance" width={50} height={50} />
      </div>
      
    </div>
  </div>
</div> */}

       
         <ProductList products={products} title="Mais vendidos"/>

          <div>
            <CategorySelector categories={categories}/>
          </div>

       <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw" 
            className="h-auto w-full" 
           />
       </div>
        
         <ProductList products={newlyCreatedProducts}title="Novos produtos" />
        <Footer/>
    </div>
  </>
 );
}

export default Home