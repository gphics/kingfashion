import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
    const api = process.env.SERVER_URL
    const { searchParams } = new URL(req.url)
    const { value: id } = searchParams.values().next()
    const first = await fetch(`${api}/styles/${id}`, { cache: "no-cache" })
    const second = await first.json()
    return Response.json({ data: second })
}