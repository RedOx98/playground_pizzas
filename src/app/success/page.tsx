"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent")
  const router = useRouter();

  console.log(payment_intent);

  useEffect(()=> {
    const makeRequest = async () => {
      try {
      const order = await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
        method: "PUT",
      });
      console.log(order);
      setTimeout(() => {
        router.push("/orders");
      }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [payment_intent, router])


  return (
    <div>Payment successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  )
}

export default SuccessPage