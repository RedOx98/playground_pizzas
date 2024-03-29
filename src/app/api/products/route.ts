import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"

// FETCH ALL PRODUCTS

export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat")
    try {
        const product = await prisma.product.findMany({
            where: {
                ...(cat ? { catSlug: cat } : { isFeatured: true })
            }
        })
        return new NextResponse(JSON.stringify(product),
            { status: 200 }
        )
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
};

// CREATE NEW PRODUCT

export const POST = async (req: NextRequest) => {

    const body = await req.json();
    try {
        const product = await prisma.product.create({
            data: body
        })
        return new NextResponse(JSON.stringify(product),
            { status: 201 }
        )
    }
    catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
}