import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const hostName = req.headers.host || 'Unknown Host';
        
        const model = req.query.model || 'Default model';

        throw new NextResponse(JSON.stringify({hostName, model}), {status: 200});
    } catch (err) {
        console.log(err);
        throw new NextResponse(JSON.stringify({message: "An unexpected error occurred."}), {status: 500});
    }
}