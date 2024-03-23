import { request } from "http"
import { NextRequest } from "next/server"
export async function GET(req: NextRequest) {
    // @ts-ignore
    const url = new URL(req.url)
    let id = null
    url.searchParams.forEach(elem => { id = elem })
    // console.log(id)
    const first = await fetch(`${process.env.SERVER_URL}/styles/${id}`)
    const second = await first.json()

    return Response.json({ data: second })
}