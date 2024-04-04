import shortDest from "@/utils/shortDest";
import { NextRequest } from "next/server";


export async function GET() {
    const first = await fetch(`${process.env.SERVER_URL}/user`);
    const second = await first.json();
    const res = shortDest(second);
    return Response.json(res)
}


export async function PUT(req: NextRequest) {
    const trans = await req.json()
    const body = JSON.stringify(trans)
    const api = `${process.env.SERVER_URL}/user/${trans._id}`
    const first = await fetch(api, { method: "PUT", headers: { "Content-Type": "application/json" }, body })
    const second = await first.json()
    return Response.json(shortDest(second))
}