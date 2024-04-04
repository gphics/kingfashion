import shortDest from "@/utils/shortDest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const trans = JSON.stringify(body)
    const api = `${process.env.SERVER_URL}/styles/create`
    const first = await fetch(api, { method: "POST", body: trans, headers: { "Content-Type": "application/json" } })
    const second = await first.json()
    const data = shortDest(second)
    return Response.json(data)
}