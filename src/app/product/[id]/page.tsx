import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { singleProduct } from "@/data";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getProduct = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed!')
  }

  console.log(res);
  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {

  const { id } = params;
  const singleProduct: ProductType = await getProduct(id);
  return (
    <div className="relative p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl font-bold uppercase xl:text-5xl">{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} /> 
      </div>

      <DeleteButton id={singleProduct.id}/>
    </div>
  );
};

export default SingleProductPage;
