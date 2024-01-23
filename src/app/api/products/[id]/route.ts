import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH SINGLE PRODUCT

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {

        const product = await prisma.product.findFirst({
            where: {
                id: id
            }
        });
        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
};

// DELETE SINGLE PRODUCT

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const session = await getAuthSession();

    if(session?.user.isAdmin) {

    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        });
        return new NextResponse(JSON.stringify("Product has been deleted successfully!"), { status: 200 });
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
    }
}
return new NextResponse(JSON.stringify({ message: "You are not Allowed!" }), { status: 403 });
};