import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { IncomingHttpHeaders } from 'http';
import { prisma } from '@/utils/connect';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);




export const POST = async ({ params}: { params: { orderId: string }}) => {

  // const req = IncomingHtt

  const {orderId} = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  })

  if (orderId){
  try {
    const {orderId} = params; // Assuming the priceId is sent in the request body

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: orderId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      // success_url: `${req.headers.origin}/?success=true`, // Construct the URL using req.headers.origin
      // cancel_url: `${req.headers.origin}/?canceled=true`, // Construct the URL using req.headers.origin
    });

    // Return a JSON response with the session information
    // res.status(303).json({ message: 'Success', session });
    throw new NextResponse(JSON.stringify({ message: 'Success', session }), {status: 200})

  } catch (err) {
    console.error(err); // Log the actual error for debugging
    // res.status(500).json({ message: 'An unexpected error occurred.' });
    throw new NextResponse(JSON.stringify({ message: 'An unexpected error occurred.' }), {status: 500})
  }
} 
else {
  throw new NextResponse(JSON.stringify({message: "Order does not exist"}), {status: 404})
}
}