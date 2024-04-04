import shortDest from "@/utils/shortDest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // @ts-ignore
    const { password } = await req.json()
    const api = process.env.SERVER_URL
    const first = await fetch(`${api}/user/login`, {
        method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({ password })
    })
    const second = await first.json()
    const { data, err } = shortDest(second)
    return Response.json({ data, err })
}