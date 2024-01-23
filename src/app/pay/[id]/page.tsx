"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

const stripePublishableKey: any = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {

  //  Handle the case when the variable is not defined
     console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
  // You might want to throw an error, log a message, or provide a default value

}

//   loadStripe(
//   stripePublishableKey
// );

// // console.log(stripePromise);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PaymentPage = ({ params }: { params: {id: string} }) => {

  

  const [clientSecret, setClientSecret] = useState("")

  const {id} = params;

  useEffect(()=>{
    const makeRequest = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  },[id])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    }
  }




  return (
    
    <div className="">
      {clientSecret &&
      (<Elements options={options} stripe={stripePromise}>
        <CheckoutForm/>
        </Elements>)
        }
    </div>
      
    
  )

  
}

export default PaymentPage







// const {id} = params

  // // const handleSubmit = async (id: string) => {
  // //   try {
  // //     const res = fetch(`http://localhost:3000/api/checkout_sessions/${id}`, {
  // //       method: 'POST',
  // //     })
  // //     const data = (await res).json();
  // //     console.log(data);

  // //     // const data = await res.json()
  // //   } catch (err) {
  // //     console.log(err)
  // //   }

  // // }

  //   // Check to see if this is a redirect back from Checkout
  //   useEffect(() => {
  //     // Check to see if this is a redirect back from Checkout
  //     const makeRequest = async ()=> {
  //       try {
  //         // http://localhost:3000/api/hostname
  //         const res = fetch(`http://localhost:3000/api/create_intent/${id}`, {
  //           method: 'POST',
  //         })
  //         const data = (await res).json();
  //         console.log(data);
    
  //         // const data = await res.json()
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     const query = new URLSearchParams(window.location.search);
  //     if (query.get('success')) {
  //       console.log('Order placed! You will receive an email confirmation.');
  //     }
  
  //     if (query.get('canceled')) {
  //       console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  //     }
  //     makeRequest();
  //   }, [id]);

  // return (
  //   <form>
  //     <section>
  //       <button type="submit" role="link">
  //         Checkout
  //       </button>
  //     </section>
  //     <style jsx>
  //       {`
  //         section {
  //           background: #ffffff;
  //           display: flex;
  //           flex-direction: column;
  //           width: 400px;
  //           height: 112px;
  //           border-radius: 6px;
  //           justify-content: space-between;
  //         }
  //         button {
  //           height: 36px;
  //           background: #556cd6;
  //           border-radius: 4px;
  //           color: white;
  //           border: 0;
  //           font-weight: 600;
  //           cursor: pointer;
  //           transition: all 0.2s ease;
  //           box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  //         }
  //         button:hover {
  //           opacity: 0.8;
  //         }
  //       `}
  //     </style>
  //   </form>
  // );





   